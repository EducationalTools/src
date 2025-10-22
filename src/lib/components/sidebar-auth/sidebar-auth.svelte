<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { api } from '$convex/_generated/api';
	import { useQuery } from 'convex-svelte';
	import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { LogIn, LogOut, User } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import AuthButton from './auth-button.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import EditProfileDialog from './edit-profile-dialog.svelte';
	import { currentProfileId } from '$lib/state.svelte';

	const id = $props.id();

	let authDialogOpen = $state(false);

	// Auth state store
	const auth = useAuth();
	const isLoading = $derived(auth.isLoading);
	const isAuthenticated = $derived(auth.isAuthenticated);

	const user = useQuery(api.auth.getCurrentUser, {});
	const profile = useQuery(api.profiles.getCurrent, {});

	async function signOut() {
		const result = await authClient.signOut();
		if (result.error) {
			console.error('Sign out error:', result.error);
			toast.error('Something went wrong');
		}
	}

	let editProfileDialogOpen = $state(false);
</script>

<EditProfileDialog bind:open={editProfileDialogOpen} />
{#if isLoading}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton class="flex flex-row">
			<Skeleton class="aspect-square h-full" />
			<Skeleton class="h-full grow" />
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else if isAuthenticated}
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<DropdownMenu.Trigger {...props}>
						<Avatar.Root class="size-4">
							<Avatar.Image src={profile.data?.picture} />
							<Avatar.Fallback>{profile.data?.name?.charAt(0)}</Avatar.Fallback>
						</Avatar.Root>
						{profile.data?.name}
					</DropdownMenu.Trigger>
				{/snippet}
			</Sidebar.MenuButton>
			<DropdownMenu.Content side="right">
				<DropdownMenu.Item
					onclick={() => {
						currentProfileId.current = user.data?._id || '';
					}}
				>
					<Avatar.Root>
						<Avatar.Image src={profile.data?.picture} />
						<Avatar.Fallback>{profile.data?.name?.charAt(0)}</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<div class="text-md">{profile.data?.name}</div>
						<div class="text-sm">{user.data?.email}</div>
					</div>
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => (editProfileDialogOpen = true)}
					>Edit profile</DropdownMenu.Item
				>
				<DropdownMenu.Item
					onclick={() =>
						toast.promise(signOut, {
							loading: 'Logging out...',
							success: 'Logged out successfully',
							error: 'Failed to log out'
						})}
				>
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
{:else}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			onclick={() => {
				authDialogOpen = true;
			}}
		>
			<LogIn />
			Log in
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
