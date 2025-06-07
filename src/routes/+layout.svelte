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

	// Third-party utilities
	import { ModeWatcher } from 'mode-watcher';
	import clsx from 'clsx';

	import { preferencesStore } from '$lib/stores';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import posthog from 'posthog-js';
	import { browser } from '$app/environment';

	let trackerBlocker = $state(false);

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
				trackerBlocker = true;
			});
		}
	});
</script>

<svelte:head>
	<title>EduTools</title>
</svelte:head>

<Dialog.Root open={trackerBlocker}>
	<Dialog.Content>
		<Dialog.Title>Notice</Dialog.Title>
		<Dialog.Description
			>We use Posthog to track errors and usage to improve EduTools. Please disable your tracker/ad
			blocker to allow this. Don't worry, we won't add any ads.</Dialog.Description
		>
	</Dialog.Content>
</Dialog.Root>

<!-- https://github.com/sveltejs/svelte/issues/3105#issuecomment-1868393333 -->
<div class={clsx('hidden', $preferencesStore.theme)} id="theme"></div>

<Toaster />
<ModeWatcher defaultMode={'dark'} />
<Settings />
<Sidebar.Provider class="flex flex-col md:flex-row">
	<AppSidebar />
	<Sidebar.Trigger class="m-1 p-1 md:hidden" />
	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
