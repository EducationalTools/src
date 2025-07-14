<script lang="ts">
	import { onMount } from 'svelte';
	import {
		SignedIn,
		SignedOut,
		SignInButton,
		UserButton,
		useClerkContext,
		SignIn,
		SignUp,
		UserProfile
	} from 'svelte-clerk/client';
	const ctx = useClerkContext();

	let sessionToken = $state('');

	import dayjs from 'dayjs';

	$effect(() => {
		ctx.session?.getToken().then((token) => {
			if (token) {
				sessionToken = token;
			}
		});
	});

	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '$lib/../convex/_generated/api.js';
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { toast } from 'svelte-sonner';

	let query = $state(useQuery(api.backups.get, { jwt: '' }));
	const client = useConvexClient();
	let enteredBackupName = $state('');

	$effect(() => {
		query = useQuery(api.backups.get, { jwt: sessionToken });
	});
</script>

<SignedIn>
	<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 p-3 md:grid-cols-2">
		<Card.Root>
			<Card.Header><Card.Title>Create a Backup</Card.Title></Card.Header>
			<Card.Footer class="flex flex-row gap-3">
				<Input placeholder="Backup Name" bind:value={enteredBackupName} />
				<Button
					disabled={!sessionToken}
					onclick={() => {
						if (enteredBackupName.length > 0) {
							client
								.mutation(api.backups.create, { name: enteredBackupName, jwt: sessionToken })
								.then(() => {
									enteredBackupName = '';
									toast.success('Backup created successfully');
								});
						}
					}}>Create</Button
				>
			</Card.Footer>
		</Card.Root>
		{#if !query.data}
			<div class="flex items-center justify-center">
				<LoaderCircle class="animate-spin" />
			</div>
		{/if}
		{#each query.data || [] as backup}
			<Card.Root>
				<Card.Header>
					<Card.Title>{backup.name}</Card.Title>
					<Card.Description>
						{dayjs(backup.creationTime).format('HH:MMa  DD/MM/YY')}
					</Card.Description>
				</Card.Header>
				<Card.Footer class="flex flex-row gap-3">
					<AlertDialog.Root>
						<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
							Restore
						</AlertDialog.Trigger>
						<AlertDialog.Content
							><AlertDialog.Header>
								<AlertDialog.Title>Restore Backup?</AlertDialog.Title>
								<AlertDialog.Description>
									This will replace all your current data
								</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<AlertDialog.Action>Continue</AlertDialog.Action>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
					<AlertDialog.Root>
						<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}>
							Delete
						</AlertDialog.Trigger>
						<AlertDialog.Content
							><AlertDialog.Header>
								<AlertDialog.Title>Delete Backup?</AlertDialog.Title>
								<AlertDialog.Description>
									This will delete the backup permanently
								</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<AlertDialog.Action
									class={buttonVariants({ variant: 'destructive' })}
									onclick={() => {
										client.mutation(api.backups.remove, { id: backup.id, jwt: sessionToken });
									}}>Continue</AlertDialog.Action
								>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</SignedIn>
<SignedOut>You need account</SignedOut>
