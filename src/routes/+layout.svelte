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

	// Third-party utilities
	import { ModeWatcher } from 'mode-watcher';
	import clsx from 'clsx';

	import { preferencesStore } from '$lib/stores';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('experimental') === 'true') {
			$preferencesStore.experimentalFeatures = true;
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>EduTools</title>
</svelte:head>

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
