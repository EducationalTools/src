<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.ItemProps = $props();
</script>

<CommandPrimitive.Item
	class={cn(
		'relative flex scale-95 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none duration-200 aria-selected:scale-100 aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	bind:ref
	{...restProps}
/>
