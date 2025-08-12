<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { preferencesStore, historyStore, favoritesStore } from '$lib/stores';
	import clsx from 'clsx';
	import { getGameById } from '$lib/gmaes';
	import History from '@lucide/svelte/icons/history';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import X from '@lucide/svelte/icons/x';
	import Calculator from '@lucide/svelte/icons/calculator';
	import ArrowLeftRight from '@lucide/svelte/icons/arrow-left-right';
	import FileText from '@lucide/svelte/icons/file-text';
	import AlignLeft from '@lucide/svelte/icons/align-left';
	import Key from '@lucide/svelte/icons/key';
	import Dices from '@lucide/svelte/icons/dices';
	import Timer from '@lucide/svelte/icons/timer';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Particles, { particlesInit } from '@tsparticles/svelte';

	const tools = [
		{
			name: 'Calculator',
			url: '/tools/calculator',
			icon: Calculator,
			description: 'Perform mathematical calculations with an intuitive interface'
		},
		{
			name: 'Converter',
			url: '/tools/converter',
			icon: ArrowLeftRight,
			description: 'Convert between different units and measurements'
		},
		{
			name: 'Rich Text Editor',
			url: '/tools/rich-text-editor',
			icon: FileText,
			description: 'Create and edit formatted text documents'
		},
		{
			name: 'Word Counter',
			url: '/tools/word-counter',
			icon: AlignLeft,
			description: 'Count words, characters, and analyze text content'
		},
		{
			name: 'Password Generator',
			url: '/tools/password-generator',
			icon: Key,
			description: 'Generate secure passwords with customizable options'
		},
		{
			name: 'Random Number Generator',
			url: '/tools/random-number-generator',
			icon: Dices,
			description: 'Generate random numbers for various purposes'
		},
		{
			name: 'Stopwatch & Timer',
			url: '/tools/stopwatch-timer',
			icon: Timer,
			description: 'Track time with precision stopwatch and timer functionality'
		}
	];
</script>

<!-- Hero Section -->
<div class="relative p-2 md:pl-0">
	<div
		class="from-primary/10 via-background to-accent/10 relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br py-24 md:py-32"
	>
		<Particles
			id="hero-background"
			class="absolute inset-0"
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
								force: 60,
								smooth: 40
							}
						}
					}
				},
				particles: {
					color: {
						value: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
					},
					move: {
						enable: true,
						outModes: {
							default: 'bounce'
						},
						speed: 1.5
					},
					number: {
						density: {
							enable: true,
							width: 1920,
							height: 1080
						},
						value: 60
					},
					opacity: {
						value: {
							min: 0.3,
							max: 0.8
						}
					},
					shape: {
						type: ['circle', 'triangle']
					},
					size: {
						value: {
							min: 2,
							max: 8
						}
					},
					links: {
						color: {
							value: '#6366f1'
						},
						distance: 120,
						enable: true,
						opacity: 0.2,
						width: 1
					}
				}
			}}
		/>
		<div class="z-10 flex flex-col items-center gap-6 text-center">
			<div class="flex items-center gap-3">
				<Sparkles class="text-primary h-8 w-8 animate-pulse" />
				<h1
					class="from-primary to-accent bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
				>
					EduTools
				</h1>
				<Sparkles class="text-accent h-8 w-8 animate-pulse" />
			</div>
			{#if $preferencesStore.experimentalFeatures}
				<div
					class="animate-bounce rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white"
				>
					Experimental Mode
				</div>
			{/if}
			<p class="text-muted-foreground max-w-2xl text-xl font-light md:text-2xl">
				Powerful educational tools designed to enhance your learning experience
			</p>
		</div>
	</div>
	<div
		class="to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent"
	></div>
</div>

<!-- Tools Section -->
<div class="z-30 flex w-full flex-col gap-6 p-2 md:flex-row md:pl-0">
	<div
		class={clsx(
			'grid h-fit w-full gap-6',
			$preferencesStore.experimentalFeatures
				? 'grid-cols-1'
				: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
		)}
	>
		{#each tools as tool}
			<Card.Root
				class="group hover:shadow-primary/20 from-card to-card/80 hover:border-primary/50 cursor-pointer border-2 bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
			>
				<a href={tool.url} class="block p-0">
					<Card.Content class="p-6">
						<div class="flex items-start gap-4">
							<div
								class="bg-primary/10 group-hover:bg-primary/20 rounded-xl p-3 transition-colors duration-300"
							>
								<svelte:component this={tool.icon} class="text-primary h-8 w-8" />
							</div>
							<div class="flex-1 space-y-2">
								<Card.Title
									class="group-hover:text-primary text-xl font-semibold transition-colors duration-300"
								>
									{tool.name}
								</Card.Title>
								<Card.Description class="text-muted-foreground line-clamp-2 text-sm">
									{tool.description}
								</Card.Description>
							</div>
						</div>
						<div class="mt-4 flex items-center justify-between">
							<Button
								variant="ghost"
								size="sm"
								class="group-hover:bg-primary/10 transition-colors duration-300"
							>
								Open Tool
								<ArrowRight class="ml-2 h-4 w-4" />
							</Button>
						</div>
					</Card.Content>
				</a>
			</Card.Root>
		{/each}
	</div>
	{#if $preferencesStore.experimentalFeatures}
		<!-- History Section -->
		<div class="grid h-fit w-full grid-cols-1 gap-4">
			<Card.Root
				class="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:border-blue-800 dark:from-blue-950/50 dark:to-blue-900/30"
			>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-blue-700 dark:text-blue-300">
						<History class="h-5 w-5" />
						Recent History
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					{#each $historyStore.slice(0, 5) as item}
						<Card.Root class="transition-shadow duration-200 hover:shadow-md">
							<Card.Content class="p-4">
								<Button
									variant="ghost"
									class="h-auto w-full justify-start p-0 text-left"
									href={'/g/' + item}
								>
									<div class="flex w-full items-center gap-3">
										<div class="bg-primary/10 rounded-lg p-2">
											<Dices class="text-primary h-4 w-4" />
										</div>
										<span class="font-medium">{getGameById(item)?.name}</span>
									</div>
								</Button>
							</Card.Content>
						</Card.Root>
					{/each}
					{#if $historyStore.length === 0}
						<div class="flex flex-col items-center justify-center gap-3 p-8 text-center">
							<div class="bg-muted/50 rounded-full p-4">
								<History class="text-muted-foreground h-8 w-8" />
							</div>
							<p class="text-muted-foreground">No history saved yet</p>
						</div>
					{:else}
						<div class="flex flex-row gap-3 pt-2">
							<Button variant="default" size="sm" class="flex-1" href="/history">View All</Button>
							<Button
								variant="outline"
								size="sm"
								class="flex-1"
								onclick={() => {
									$historyStore = [];
								}}>Clear History</Button
							>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Favorites Section -->
		<div class="grid h-fit w-full grid-cols-1 gap-4">
			<Card.Root
				class="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:border-amber-800 dark:from-amber-950/50 dark:to-amber-900/30"
			>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-amber-700 dark:text-amber-300">
						<Bookmark class="h-5 w-5" />
						Saved Favorites
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					{#each $favoritesStore as item}
						<Card.Root class="transition-shadow duration-200 hover:shadow-md">
							<Card.Content class="p-4">
								<div class="flex items-center gap-3">
									<Button
										variant="ghost"
										class="h-auto flex-1 justify-start p-0 text-left"
										href={'/g/' + item}
									>
										<div class="flex w-full items-center gap-3">
											<div class="bg-primary/10 rounded-lg p-2">
												<Bookmark class="text-primary h-4 w-4" />
											</div>
											<span class="font-medium">{getGameById(item)?.name}</span>
										</div>
									</Button>
									<Button
										variant="ghost"
										size="sm"
										class="text-muted-foreground hover:text-destructive"
										onclick={() => {
											$favoritesStore = $favoritesStore.filter((id) => id !== item);
										}}
									>
										<X class="h-4 w-4" />
									</Button>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
					{#if $favoritesStore.length === 0}
						<div class="flex flex-col items-center justify-center gap-3 p-8 text-center">
							<div class="bg-muted/50 rounded-full p-4">
								<Bookmark class="text-muted-foreground h-8 w-8" />
							</div>
							<p class="text-muted-foreground">Nothing saved yet</p>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>
