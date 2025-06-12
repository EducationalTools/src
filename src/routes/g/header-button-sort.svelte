<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props extends ComponentProps<typeof Button> {
		content?: string;
	}

	let { content = '', variant = 'ghost', ...restProps }: Props = $props();
</script>

<Button {variant} class="w-full" {...restProps}>
	{content}
	<ArrowUpDownIcon class="ml-2" />
</Button>
