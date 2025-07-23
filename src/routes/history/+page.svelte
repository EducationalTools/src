<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns } from './columns.js';
	import { getGameById } from '$lib/gmaes';
	import type { ParsedGmae } from '$lib/gmaes';
	import { historyStore } from '$lib/stores';

	let history = $derived(
		$historyStore
			.map((gmae) => getGameById(gmae))
			.filter((gmaeObject): gmaeObject is ParsedGmae => gmaeObject !== undefined)
	);
</script>

<DataTable data={history} {columns} />
