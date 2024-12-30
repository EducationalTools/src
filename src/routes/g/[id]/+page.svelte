<script lang="ts">
	import { page } from '$app/state';
	import { getGameById } from '$lib/gmaes';

	const gmaedata = $derived(getGameById(page.params.id));
</script>

<div class="flex h-full w-full flex-row gap-3 p-3">
	<iframe src="https://example.com" frameborder="0" class="flex-grow rounded"></iframe>

	{JSON.stringify(gmaedata)}
</div>
