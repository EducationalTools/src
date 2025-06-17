<script lang="ts">
	import RightArrowIcon from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	let { id }: { id: string } = $props();
</script>

<Button variant="ghost" size="icon" class="relative size-8 p-0" href={'/g/' + id}>
	<RightArrowIcon />
</Button>
