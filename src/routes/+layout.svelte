<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		{@render children()}
		<Sidebar.Trigger class="fixed bottom-2 translate-x-2" />
	</Sidebar.Inset>
</Sidebar.Provider>
