<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { api } from '$convex/_generated/api';
	import { useQuery } from 'convex-svelte';
	import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Skeleton from './ui/skeleton/skeleton.svelte';
	import { LogIn, LogOut, Plus, UserPlus } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	// Auth state store
	const auth = useAuth();
	const isLoading = $derived(auth.isLoading);
	const isAuthenticated = $derived(auth.isAuthenticated);

	const currentUserResponse = useQuery(api.auth.getCurrentUser, {});
	let user = $derived(currentUserResponse.data);

	async function signOut() {
		const result = await authClient.signOut();
		if (result.error) {
			console.error('Sign out error:', result.error);
			toast.error('Something went wrong');
		}
	}
</script>

{#if isLoading}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton class="flex flex-row">
			<Skeleton class="aspect-square h-full" />
			<Skeleton class="h-full grow" />
		</Sidebar.MenuButton>
		<Sidebar.MenuButton class="flex flex-row">
			<Skeleton class="h-full grow" />
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else if isAuthenticated}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton>
			{user?.email}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>

	<Sidebar.MenuItem>
		<Sidebar.MenuButton onclick={signOut}>
			<LogOut />
			Log out
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else}
	<Sidebar.MenuItem>
		<Dialog.Root>
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<Dialog.Trigger {...props}>
						<LogIn />
						Log in
					</Dialog.Trigger>
				{/snippet}
			</Sidebar.MenuButton>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Log in</Dialog.Title>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</Sidebar.MenuItem>
	<Sidebar.MenuItem>
		<Dialog.Root>
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<Dialog.Trigger {...props}>
						<Plus />
						Sign up
					</Dialog.Trigger>
				{/snippet}
			</Sidebar.MenuButton>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Sign up</Dialog.Title>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</Sidebar.MenuItem>
{/if}
