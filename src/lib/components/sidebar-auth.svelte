<script lang="ts">
	// UI Components
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	const sidebar = useSidebar();
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	// Lucide icons
	import Login from '@lucide/svelte/icons/log-in';
	import Plus from '@lucide/svelte/icons/plus';
	import Logout from '@lucide/svelte/icons/log-out';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	// App state and data
	import { mode } from 'mode-watcher';

	// Auth
	import {
		SignedIn,
		SignedOut,
		useClerkContext,
		SignIn,
		SignUp,
		UserProfile,
		ClerkLoading,
		SignInButton,
		SignUpButton
	} from 'svelte-clerk/client';
	import { dark } from '@clerk/themes';
	import Button from './ui/button/button.svelte';
	const ctx = useClerkContext();

	import posthog from 'posthog-js';
</script>

{#if location.hostname == 'edutools.ingo.au' || location.hostname == 'localhost'}
	<ClerkLoading>
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="flex items-center justify-center">
				<LoaderCircle class="h-6 w-6 animate-spin" />
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</ClerkLoading>
	<SignedIn>
		<Sidebar.MenuItem>
			<Dialog.Root>
				<Dialog.Trigger class="w-full">
					<Sidebar.MenuButton>
						<Avatar.Root class="size-4">
							<Avatar.Image src={ctx.user?.imageUrl} alt={ctx.user?.username} />
							<Avatar.Fallback>
								{ctx.user?.username?.charAt(0).toUpperCase()}
							</Avatar.Fallback>
						</Avatar.Root>

						{ctx.user?.username}
					</Sidebar.MenuButton>
				</Dialog.Trigger>
				<Dialog.Content class="w-fit !max-w-none p-0">
					<UserProfile appearance={mode.current == 'dark' ? { baseTheme: dark } : {}} />
				</Dialog.Content>
			</Dialog.Root>
		</Sidebar.MenuItem>
		<Sidebar.MenuItem
			onclick={() => {
				ctx.session?.end();
				posthog.reset();
				sidebar.setOpenMobile(false);
			}}
		>
			<Sidebar.MenuButton>
				<Logout />
				Logout
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</SignedIn>
	<SignedOut>
		<Sidebar.MenuItem>
			<SignInButton class="w-full">
				<Sidebar.MenuButton>
					<Login />
					Sign In
				</Sidebar.MenuButton>
			</SignInButton>
		</Sidebar.MenuItem>
		<Sidebar.MenuItem>
			<SignUpButton class="w-full">
				<Sidebar.MenuButton>
					<Plus />
					Create Account
				</Sidebar.MenuButton>
			</SignUpButton>
		</Sidebar.MenuItem>
	</SignedOut>
{:else}
	<Dialog.Root>
		<Dialog.Trigger class="flex flex-col gap-2">
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					<Login />
					Sign In
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					<Plus />
					Create Account
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Title>Notice</Dialog.Title>
			<Dialog.Description>
				Due to technical limitations, to use accounts you must be using edutools.ingo.au
			</Dialog.Description>
			<Dialog.Footer>
				<Button href="https://edutools.ingo.au">Continue</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}
