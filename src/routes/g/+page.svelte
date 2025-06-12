<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns } from './columns.js';
	import { gmaes } from '$lib/gmaes';
</script>

<DataTable data={gmaes} {columns} />
