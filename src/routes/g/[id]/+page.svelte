<script lang="ts">
	import Play from '$lib/components/play.svelte';
	import { page } from '$app/state';
</script>

{#key page.params.id}
	<Play id={page.params.id} />
{/key}
