<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { preferencesStore, historyStore, favoritesStore } from '$lib/stores';
	import clsx from 'clsx';
	import { getGameById } from '$lib/gmaes';
	import History from '@lucide/svelte/icons/history';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import X from '@lucide/svelte/icons/x';

	const tools = [
		{ name: 'Calculator', url: '/tools/calculator' },
		{ name: 'Converter', url: '/tools/converter' },
		{ name: 'Rich Text Editor', url: '/tools/rich-text-editor' },
		{ name: 'Word Counter', url: '/tools/word-counter' },
		{ name: 'Password Generator', url: '/tools/password-generator' },
		{ name: 'Random Number Generator', url: '/tools/random-number-generator' },
		{ name: 'Stopwatch & Timer', url: '/tools/stopwatch-timer' }
	];
</script>

<div class="bg-background relative flex w-full items-center justify-center py-52">
	<div
		class="absolute top-0 left-0 h-full w-full bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] [mask-image:linear-gradient(0deg,_transparent,_var(--background))] bg-[size:24px_24px]"
	></div>
	<h1 class="z-10 text-4xl">
		EduTools {#if $preferencesStore.experimentalFeatures}Experimental{/if}
	</h1>
</div>

<div class="flex w-full flex-col gap-3 p-3 md:flex-row">
	<div
		class={clsx(
			'grid h-fit w-full gap-3',
			$preferencesStore.experimentalFeatures ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
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
			{#each $historyStore.slice(0, 5) as item}
				<Button variant="outline" class="py-10 text-xl" href={'/g/' + item}
					>{getGameById(item)?.name}</Button
				>
			{/each}
			{#if $historyStore.length === 0}
				<div
					class="flex flex-row items-center justify-center gap-1 rounded-md border border-dashed p-16"
				>
					No history saved
				</div>
			{:else}
				<div class="flex flex-row gap-3">
					<Button variant="default" class="grow" href="/history">All</Button>
					<Button
						class="grow"
						variant="ghost"
						onclick={() => {
							$historyStore = [];
						}}>Clear</Button
					>
				</div>
			{/if}
		</div>
		<div class="grid h-fit w-full grid-cols-1 gap-3">
			<div class="flex flex-row items-center gap-1">
				<Bookmark />
				Saved
			</div>
			{#each $favoritesStore as item}
				<div class="flex w-full flex-row gap-3">
					<Button variant="outline" class="grow py-10 text-xl" href={'/g/' + item}
						>{getGameById(item)?.name}</Button
					>
					<Button
						variant="ghost"
						class="aspect-square py-10 text-xl"
						onclick={() => {
							$favoritesStore = $favoritesStore.filter((id) => id !== item);
						}}
					>
						<X />
					</Button>
				</div>
			{/each}
			{#if $favoritesStore.length === 0}
				<div
					class="flex flex-row items-center justify-center gap-1 rounded-md border border-dashed p-16"
				>
					Nothing saved
				</div>
			{/if}
		</div>
	{/if}
</div>
