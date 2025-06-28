<script lang="ts">
	import { preferencesStore } from '$lib/stores';

	const tools = [
		{ name: 'Calculator', url: '/tools/calculator' },
		{ name: 'Converter', url: '/tools/converter' },
		{ name: 'Rich Text Editor', url: '/tools/rich-text-editor' },
		{ name: 'Word Counter', url: '/tools/word-counter' },
		{ name: 'Password Generator', url: '/tools/password-generator' },
		{ name: 'Random Number Generator', url: '/tools/random-number-generator' }
	];
</script>

<div
	class="from-accent/50 flex w-full items-center justify-center bg-gradient-to-b to-transparent py-52"
>
	<h1 class="text-4xl">
		EduTools {#if $preferencesStore.experimentalFeatures}Experimental{/if}
	</h1>
</div>

<div class="flex w-full flex-row gap-3 p-3">
	<div class="grid grow grid-cols-3 gap-3">
		{#each tools as tool}
			<a href={tool.url} class="bg-accent flex justify-center rounded p-3 py-10">{tool.name}</a>
		{/each}
	</div>
</div>
