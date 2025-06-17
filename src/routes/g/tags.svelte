<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { badgeVariants } from '$lib/components/ui/badge/index.js';

	let { tags } = $props();
</script>

<div class="flex w-full flex-row flex-wrap gap-2">
	{#each tags || [] as tag}
		<Badge variant="default">#{tag}</Badge>
	{/each}
</div>
