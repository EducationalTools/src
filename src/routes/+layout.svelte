<script lang="ts">
	// Global styles
	import '../app.css';

	// Props
	let { children } = $props();

	// UI Components
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

	// Third-party utilities
	import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
	<title>EduTools</title>
</svelte:head>

<Toaster />
<ModeWatcher defaultMode={'dark'} />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		{@render children()}
		<Sidebar.Trigger class="fixed bottom-2 translate-x-2" />
	</Sidebar.Inset>
</Sidebar.Provider>
