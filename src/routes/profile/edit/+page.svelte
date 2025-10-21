<script lang="ts">
	import { api } from '$convex/_generated/api';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import { useQuery } from 'convex-svelte';
	import { untrack } from 'svelte';

	function explicitEffect(fn: () => void, depsFn: () => any[]) {
		$effect(() => {
			depsFn();
			untrack(fn);
		});
	}

	const profile = useQuery(api.profiles.getCurrent, {});

	let name = $state('');
	let pronouns = $state('');
	let bio = $state('');

	explicitEffect(
		() => {
			if (profile) {
				if (profile?.data?.pronouns) {
					pronouns = profile.data.pronouns;
				}
				if (profile?.data?.name) {
					name = profile.data.name;
				}
				if (profile?.data?.bio) {
					bio = profile.data.bio;
				}
			}
		},
		() => [profile.data]
	);

	const id = $props.id();
</script>

<div class="mx-auto w-full max-w-2xl p-4">
	<div class="bg-card flex w-full flex-col gap-4 rounded-xl border p-4">
		{#if profile.data}
			<form action="" class="flex flex-col gap-4">
				<div class=" grid grid-cols-2 gap-4">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="name-{id}">Display Name</Label>
						<Input
							required
							type="text"
							id="name-{id}"
							placeholder="This is how you will appear"
							bind:value={name}
						/>
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<Label for="pronouns-{id}">Pronouns</Label>
						<Input type="text" id="pronouns-{id}" bind:value={pronouns} />
					</div>
				</div>
				<div class="grid w-full gap-1.5">
					<Label for="bio-{id}">Bio</Label>
					<Textarea
						placeholder="Write something about you I guess"
						id="bio-{id}"
						bind:value={bio}
					/>
				</div>
				<Button>Save</Button>
			</form>
		{:else}
			<LoaderCircle class="m-15 mx-auto animate-spin" />
		{/if}
	</div>
</div>
