<script lang="ts">
	import { dark } from '@clerk/themes';
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

	import { page } from '$app/state';
</script>

<div class="h-screen w-full py-2">
	<UserProfile
		routing="path"
		path={'/account'}
		appearance={{
			elements: {
				cardBox: '!w-full !h-full !bg-transparent',
				rootBox: '!w-full !h-full',
				navbar: '!bg-transparent !bg-none',
				scrollBox: '!bg-transparent',
				pageScrollBox: '!bg-transparent',
				page: '!bg-transparent'
			}
		}}
	/>
</div>
