<script lang="ts">
	import { api } from '$convex/_generated/api';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import { useConvexClient, useQuery } from 'convex-svelte';
	import { untrack } from 'svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { currentProfileId } from '$lib/state.svelte';

	function explicitEffect(fn: () => void, depsFn: () => any[]) {
		$effect(() => {
			depsFn();
			untrack(fn);
		});
	}

	const client = useConvexClient();
	const profile = useQuery(api.profiles.getCurrent, {});
	const user = useQuery(api.auth.getCurrentUser, {});

	let name = $state('');
	let pronouns = $state('');
	let bio = $state('');

	let loading = $state(false);

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
	let { open = $bindable(false) } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		{#if profile.data}
			<form
				action=""
				onsubmit={async (e) => {
					if (loading) return;

					e.preventDefault();

					toast.promise(
						new Promise((resolve, reject) => {
							loading = true;
							client
								.mutation(api.profiles.updateCurrent, {
									bio: bio,
									name: name,
									pronouns: pronouns
								})
								.then((...args) => {
									resolve(...args);
									open = false;
									currentProfileId.current = user.data?._id || '';
								})
								.catch(reject)
								.finally(() => (loading = false));
						}),
						{
							loading: 'Updating...',
							success: 'Updated!',
							error: 'Failed to update'
						}
					);
				}}
				class="flex flex-col gap-4"
			>
				<div class=" grid grid-cols-2 gap-4">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="name-{id}">Display Name</Label>
						<Input
							disabled={loading}
							required
							type="text"
							id="name-{id}"
							placeholder="This is how you will appear"
							bind:value={name}
						/>
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<Label for="pronouns-{id}">Pronouns</Label>
						<Input disabled={loading} type="text" id="pronouns-{id}" bind:value={pronouns} />
					</div>
				</div>
				<div class="grid w-full gap-1.5">
					<Label for="bio-{id}">Bio</Label>
					<Textarea
						disabled={loading}
						placeholder="Write something about you I guess"
						id="bio-{id}"
						bind:value={bio}
					/>
				</div>
				<Button disabled={loading} type="submit">Save</Button>
			</form>
		{:else}
			<LoaderCircle class="m-15 mx-auto animate-spin" />
		{/if}
	</Dialog.Content>
</Dialog.Root>
