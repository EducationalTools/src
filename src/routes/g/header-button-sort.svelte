<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props extends ComponentProps<typeof Button> {
		content?: string;
		sort?: boolean;
	}

	let { content = '', variant = 'ghost', sort = false, ...restProps }: Props = $props();
</script>

<Button {variant} class="w-full" {...restProps}>
	{content}
	{#if sort}
		<ArrowUpDownIcon class="ml-2" />
	{/if}
</Button>
