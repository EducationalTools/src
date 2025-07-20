<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { useClerkContext } from 'svelte-clerk';
	import { toast } from 'svelte-sonner';

	const id = $props.id();
	const ctx = useClerkContext();
	$effect(() => {
		if (ctx.session) {
			getToken().then((token) => {
				sessionToken = token;
			});
		}
	});

	let sessionToken = $state('');

	let distinctId = $state('Not available');
	let userAgent = $state('');

	let briefDescription = $state('');
	let description = $state('');
	let reproduction = $state('');
	let expected = $state('');
	let log = $state('');
	let additional = $state('');

	const client = useConvexClient();

	async function getToken() {
		const token = await ctx.session?.getToken();
		if (!token) {
			if (ctx.session) {
				toast.error('Something went wrong');
			}
			return '';
		}
		return token;
	}

	onMount(() => {
		userAgent = navigator.userAgent;
		setTimeout(() => {
			distinctId = posthog.get_distinct_id();
		}, 1000);
	});
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
	<h1 class="text-3xl">Bug Report</h1>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="brief-description-{id}">Brief Description</Label>
		<Input type="text" id="brief-description-{id}" bind:value={briefDescription} />
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="description-{id}">Describe the bug</Label>
		<p class="text-muted-foreground text-sm">A clear and concise description of what the bug is.</p>
		<Textarea id="description-{id}" bind:value={description}></Textarea>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="reproduction-{id}">How could you reproduce this issue?</Label>
		<p class="text-muted-foreground text-sm">
			Please provide a step-by-step guide on how to reproduce this issue.
		</p>
		<Textarea id="reproduction-{id}" bind:value={reproduction}></Textarea>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="expected-{id}">What did you expect to happen?</Label>
		<p class="text-muted-foreground text-sm">
			A clear and concise description of what you expected to happen.
		</p>
		<Textarea id="expected-{id}" bind:value={expected}></Textarea>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="log-{id}">Relevant log output</Label>
		<p class="text-muted-foreground text-sm">Please copy and paste any relevant log output.</p>
		<Textarea id="log-{id}" bind:value={log}></Textarea>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="additional-{id}">Additional information</Label>
		<Textarea id="additional-{id}" bind:value={additional}></Textarea>
	</div>
	<Accordion.Root type="single">
		<Accordion.Item value="other-data">
			<Accordion.Trigger>Other Data</Accordion.Trigger>
			<Accordion.Content>
				<Table.Root>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Distinct ID</Table.Cell>
							<Table.Cell>{distinctId}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>User agent</Table.Cell>
							<Table.Cell>{userAgent}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
	<Button
		variant="outline"
		onclick={() => {
			client.mutation(api.issues.bugReport, {
				additional,
				briefDescription,
				description,
				distinctId,
				expected,
				log,
				reproduction,
				userAgent,
				jwt: sessionToken
			});
		}}>Submit</Button
	>
</div>
