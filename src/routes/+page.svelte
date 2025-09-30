<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { preferencesStore, historyStore, favoritesStore } from '$lib/stores';
	import clsx from 'clsx';
	import { getGameById } from '$lib/gmaes';
	import History from '@lucide/svelte/icons/history';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import X from '@lucide/svelte/icons/x';
	import Particles, { particlesInit } from '@tsparticles/svelte';

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

<div class={clsx('relative p-2', $preferencesStore.experimentalFeatures && 'md:pl-0')}>
	<div
		class="bg-card relative flex w-full items-center justify-center overflow-hidden rounded-lg border py-52"
	>
		{#if $preferencesStore.experimentalFeatures}
			<Particles
				id="hero-background"
				class="absolute top-0 right-0 bottom-0 left-0"
				options={{
					clear: true,
					fullScreen: false,
					interactivity: {
						detectsOn: 'window',
						events: {
							onHover: {
								enable: true,
								parallax: {
									enable: true,
									force: 100,
									smooth: 30
								}
							}
						}
					},
					particles: {
						color: {
							value: '#aaaaaa'
						},
						move: {
							enable: true,
							outModes: {
								default: 'out',
								bottom: 'out',
								left: 'out',
								right: 'out',
								top: 'out'
							},
							speed: 2
						},
						number: {
							density: {
								enable: true,
								width: 1920,
								height: 1080
							},
							limit: {
								mode: 'delete',
								value: 0
							},
							value: 100
						},
						opacity: {
							value: {
								min: 0.5,
								max: 1
							}
						},
						shape: {
							close: true,
							fill: true,
							options: {},
							type: 'circle'
						},
						size: {
							value: {
								min: 1,
								max: 5
							}
						},
						links: {
							color: {
								value: '#aaaaaa'
							},
							distance: 150,
							enable: true,
							frequency: 1,
							opacity: 0.4,
							width: 1,
							warp: false
						}
					}
				}}
			/>
		{/if}
		<h1 class="text-foreground z-10 text-4xl">
			EduTools {#if $preferencesStore.experimentalFeatures}Experimental{/if}
		</h1>
	</div>
	<div
		class="to-background absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent"
	></div>
</div>

<div
	class={clsx(
		'z-30 flex w-full flex-col gap-3 p-2 lg:flex-row',
		$preferencesStore.experimentalFeatures && 'md:pl-0'
	)}
>
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
