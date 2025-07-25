<script lang="ts">
	// Global styles
	import '../app.css';

	// Props
	let { children } = $props();

	// Core components
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import Settings from '$lib/components/settings.svelte';
	import PanicMode from '$lib/components/panic-mode.svelte';
	import Cloak from '$lib/components/cloak.svelte';
	import Providers from '$lib/components/providers.svelte';
	import TrackerDialog from '$lib/components/tracker-dialog.svelte';
	import Identify from './identify.svelte';

	// Utilities
	import clsx from 'clsx';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Analytics and stores
	import { initializeAnalytics, checkTrackerBlocked, trackerDialogClosed } from '$lib/analytics';
	import { preferencesStore } from '$lib/stores';

	// State
	let trackerBlockerDialog = $state(false);

	onMount(async () => {
		// Handle experimental features URL parameter
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('experimental') === 'true') {
			$preferencesStore.experimentalFeatures = true;
			goto('/');
		}

		// Initialize analytics
		initializeAnalytics();

		// Check for tracker blocking
		const isBlocked = await checkTrackerBlocked();
		if (isBlocked && !$trackerDialogClosed) {
			trackerBlockerDialog = true;
		}
	});
</script>

<svelte:head>
	<title>EduTools</title>
</svelte:head>

<Providers>
	<TrackerDialog bind:open={trackerBlockerDialog} />

	<!-- Theme class helper for CSS -->
	<div class={clsx('hidden', $preferencesStore.theme)} id="theme"></div>

	<!-- Global components -->
	<PanicMode />
	<Cloak />
	<Toaster />
	<Settings />
	<Identify />

	<!-- Main layout -->
	<Sidebar.Provider class="flex flex-col md:flex-row">
		<AppSidebar />
		<Sidebar.Trigger class="m-1 p-1 md:hidden" />
		<Sidebar.Inset>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
</Providers>
