<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { api } from '$convex/_generated/api';
	import { useQuery } from 'convex-svelte';
	import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { LogOut, User } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import AuthButton from './auth-button.svelte';

	const id = $props.id();

	let authDialogOpen = $state(false);

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
	</Sidebar.MenuItem>
{:else if isAuthenticated}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton>
			{user?.name}
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
		<Sidebar.MenuButton
			onclick={() => {
				authDialogOpen = true;
			}}
		>
			<User />
			Account
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/if}

<Dialog.Root bind:open={authDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Sign in to EduTools</Dialog.Title>
		</Dialog.Header>
		<div class="flex flex-col gap-2">
			<AuthButton provider="github">Github</AuthButton>
			<AuthButton provider="google">Google</AuthButton>
		</div>
	</Dialog.Content>
</Dialog.Root>
