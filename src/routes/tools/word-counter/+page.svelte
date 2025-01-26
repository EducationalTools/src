<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	let text = $state('');
	const words = $derived(text.trim().split(/\s+/).filter(Boolean).length);
	const characters = $derived(text.length);
	const nonSpaceCharacters = $derived(text.replace(/\s/g, '').length);
</script>

<div class="flex h-full flex-col gap-3 p-3">
	{words} words, {nonSpaceCharacters} characters ({characters} including spaces)
	<Textarea bind:value={text} class="grow resize-none"></Textarea>
</div>
