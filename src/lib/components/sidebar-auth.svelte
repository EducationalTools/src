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
	import Button from './ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let authDialogOpen = $state(true);
	let authMode = $state('login') as 'login' | 'createaccount';

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
		<Sidebar.MenuButton
			onclick={() => {
				authMode = 'login';
				authDialogOpen = true;
			}}
		>
			<LogIn />
			Log in
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			onclick={() => {
				authMode = 'createaccount';
				authDialogOpen = true;
			}}
		>
			<Plus />
			Create account
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/if}

<Dialog.Root bind:open={authDialogOpen}>
	<Dialog.Content>
		<Tabs.Root bind:value={authMode}>
			<Dialog.Header>
				<Tabs.List>
					<Tabs.Trigger value="login">Log in</Tabs.Trigger>
					<Tabs.Trigger value="createaccount">Create account</Tabs.Trigger>
				</Tabs.List>
			</Dialog.Header>
			<Tabs.Content value="login">
				<div class="grid gap-4 py-4"></div>
				<Dialog.Footer>
					<Button>Sign in</Button>
				</Dialog.Footer>
			</Tabs.Content>
			<Tabs.Content value="createaccount">
				<div class="grid gap-4 py-4"></div>
				<Dialog.Footer>
					<Button>Create account</Button>
				</Dialog.Footer>
			</Tabs.Content>
		</Tabs.Root>
	</Dialog.Content>
</Dialog.Root>
