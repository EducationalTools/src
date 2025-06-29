<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { preferencesStore, historyStore, favoritesStore } from '$lib/stores';
	import clsx from 'clsx';
	import { getGameById } from '$lib/gmaes';
	import History from '@lucide/svelte/icons/history';
	import Bookmark from 'lucide-svelte/icons/bookmark';

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
	class="from-primary/20 flex w-full items-center justify-center bg-gradient-to-b to-transparent py-52"
>
	<h1 class="text-4xl">
		EduTools {#if $preferencesStore.experimentalFeatures}Experimental{/if}
	</h1>
</div>

<div class="flex w-full flex-col gap-3 p-3 md:flex-row">
	<div
		class={clsx(
			'grid h-fit w-full gap-3',
			$preferencesStore.experimentalFeatures ? 'grid-cols-1' : 'grid-cols-3'
		)}
	>
		{#each tools as tool}
			<Button variant="outline" class="py-10 text-xl" href={tool.url}>{tool.name}</Button>
		{/each}
	</div>
	{#if $preferencesStore.experimentalFeatures}
		<div class="grid h-fit w-full grid-cols-1 gap-3">
			<div class="flex flex-row items-center gap-1">
				<History />
				History
			</div>
			{#each $historyStore as item}
				<Button variant="outline" class="py-10 text-xl" href={'/g/' + item}
					>{getGameById(item)?.name}</Button
				>
			{/each}
		</div>
		<div class="grid h-fit w-full grid-cols-1 gap-3">
			<div class="flex flex-row items-center gap-1">
				<Bookmark />
				Saved
			</div>
			{#each $favoritesStore as item}
				<Button variant="outline" class="py-10 text-xl" href={'/g/' + item}
					>{getGameById(item)?.name}</Button
				>
			{/each}
		</div>
	{/if}
</div>
