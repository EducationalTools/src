<script lang="ts">
	// UI Components
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	const sidebar = useSidebar();
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	// Lucide icons
	import Login from 'lucide-svelte/icons/log-in';
	import Plus from 'lucide-svelte/icons/plus';
	import Logout from 'lucide-svelte/icons/log-out';

	// App state and data
	import { mode } from 'mode-watcher';

	// Auth
	import {
		SignedIn,
		SignedOut,
		useClerkContext,
		SignIn,
		SignUp,
		UserProfile
	} from 'svelte-clerk/client';
	import { dark } from '@clerk/themes';
	const ctx = useClerkContext();
</script>

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
		<Dialog.Root>
			<Dialog.Trigger class="w-full">
				<Sidebar.MenuButton>
					<Login />
					Sign In
				</Sidebar.MenuButton>
			</Dialog.Trigger>
			<Dialog.Content class="w-fit p-0">
				<SignIn appearance={mode.current == 'dark' ? { baseTheme: dark } : {}} />
			</Dialog.Content>
		</Dialog.Root>
	</Sidebar.MenuItem>
	<Sidebar.MenuItem>
		<Dialog.Root>
			<Dialog.Trigger class="w-full">
				<Sidebar.MenuButton>
					<Plus />
					Create Account
				</Sidebar.MenuButton>
			</Dialog.Trigger>
			<Dialog.Content class="w-fit p-0">
				<SignUp appearance={mode.current == 'dark' ? { baseTheme: dark } : {}} />
			</Dialog.Content>
		</Dialog.Root>
	</Sidebar.MenuItem>
</SignedOut>
