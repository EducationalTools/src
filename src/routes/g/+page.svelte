<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns } from './columns.js';
	import { gmaes } from '$lib/gmaes';
	import { preferencesStore } from '$lib/stores.js';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

{#if $preferencesStore.experimentalFeatures}
	<DataTable data={gmaes} {columns} />
{:else}
	<div class="flex h-full flex-col items-center justify-center gap-3">
		<span class="text-6xl">404</span>
		<span class="text-3xl">Not Found</span>
		<Button variant="outline" href="/">Go home</Button>
	</div>
{/if}
