<script lang="ts">
	// Global styles
	import '../app.css';

	// Props
	let { children } = $props();

	// UI Components
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import Settings from '$lib/components/settings.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import PanicMode from '$lib/components/panic-mode.svelte';
	import Cloak from '$lib/components/cloak.svelte';

	// Third-party utilities
	import { ModeWatcher } from 'mode-watcher';
	import clsx from 'clsx';
	import { ClerkProvider } from 'svelte-clerk/client';

	import { persisted } from 'svelte-persisted-store';

	import { preferencesStore } from '$lib/stores';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';

	let trackerBlockerDialog = $state(false);

	const trackerDialogClosed = persisted('trackerDialogClosed', false);

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('experimental') === 'true') {
			$preferencesStore.experimentalFeatures = true;
			goto('/');
		}
		if (browser) {
			posthog.init('phc_jg4gOdigfHQD4MSgrSaO883dp2LjNJbJO7azv61UtI0', {
				api_host: 'https://us.i.posthog.com',
				person_profiles: 'always',
				capture_exceptions: true
			});

			fetch('https://us-assets.i.posthog.com/static/exception-autocapture.js').catch(() => {
				console.log(navigator.onLine);
				console.log($trackerDialogClosed);

				if (navigator.onLine && !$trackerDialogClosed) trackerBlockerDialog = true;
			});
		}
	});
</script>

<svelte:head>
	<title>EduTools</title>
</svelte:head>

<ClerkProvider publishableKey="pk_live_Y2xlcmsuZWR1dG9vbHMuaW5nby5hdSQ">
	<Dialog.Root open={trackerBlockerDialog}>
		<Dialog.Content>
			<Dialog.Title>Notice</Dialog.Title>
			<Dialog.Description
				>We use Posthog to track errors and usage to improve EduTools. Please disable your
				tracker/ad blocker to allow this. Don't worry, we won't add any ads.</Dialog.Description
			>
			<Dialog.Footer>
				<Dialog.Close onclick={() => ($trackerDialogClosed = true)}>
					<Button variant="ghost">Don't show again</Button>
				</Dialog.Close>
				<Dialog.Close>
					<Button>Close</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>

	<!-- https://github.com/sveltejs/svelte/issues/3105#issuecomment-1868393333 -->
	<div class={clsx('hidden', $preferencesStore.theme)} id="theme"></div>

	<PanicMode />
	<Cloak />
	<Toaster />
	<ModeWatcher disableTransitions={false} defaultMode={'dark'} />
	<Settings />
	<Sidebar.Provider class="flex flex-col md:flex-row">
		<AppSidebar />
		<Sidebar.Trigger class="m-1 p-1 md:hidden" />
		<Sidebar.Inset>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
</ClerkProvider>
