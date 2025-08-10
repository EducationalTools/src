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

<div class="p-2 pl-0">
	<div
		class="from-card relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b to-transparent py-52"
	>
		<!-- <div
			class="hero-background absolute top-0 left-0 h-full w-full bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] [mask-image:linear-gradient(0deg,_transparent,_var(--background))] bg-[size:24px_24px]"
		></div> -->
		<Particles
			id="hero-background"
			class="absolute top-0 right-0 bottom-0 left-0"
			options={{
				autoPlay: true,
				clear: true,
				fullScreen: {
					enable: false,
					zIndex: 0
				},
				detectRetina: true,
				fpsLimit: 120,
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
					},
					modes: {
						trail: {
							delay: 1,
							pauseOnStop: false,
							quantity: 1
						},
						attract: {
							distance: 200,
							duration: 0.4,
							easing: 'ease-out-quad',
							factor: 1,
							maxSpeed: 50,
							speed: 1
						},
						bounce: {
							distance: 200
						},
						bubble: {
							distance: 400,
							duration: 2,
							mix: false,
							opacity: 0.8,
							size: 40,
							divs: {
								distance: 200,
								duration: 0.4,
								mix: false,
								selectors: {}
							}
						},
						connect: {
							distance: 80,
							links: {
								opacity: 0.5
							},
							radius: 60
						},
						grab: {
							distance: 400,
							links: {
								blink: false,
								consent: false,
								opacity: 1
							}
						},
						push: {
							default: true,
							groups: [],
							quantity: 4
						},
						remove: {
							quantity: 2
						},
						repulse: {
							distance: 200,
							duration: 0.4,
							factor: 100,
							speed: 1,
							maxSpeed: 50,
							easing: 'ease-out-quad',
							divs: {
								distance: 200,
								duration: 0.4,
								factor: 100,
								speed: 1,
								maxSpeed: 50,
								easing: 'ease-out-quad',
								selectors: {}
							}
						},
						slow: {
							factor: 3,
							radius: 200
						},
						particle: {
							replaceCursor: false,
							pauseOnStop: false,
							stopDelay: 0
						},
						light: {
							area: {
								gradient: {
									start: {
										value: '#ffffff'
									},
									stop: {
										value: '#000000'
									}
								},
								radius: 1000
							},
							shadow: {
								color: {
									value: '#000000'
								},
								length: 2000
							}
						}
					}
				},
				manualParticles: [],
				particles: {
					color: {
						value: '#ffffff'
					},
					move: {
						angle: {
							offset: 0,
							value: 90
						},
						center: {
							x: 50,
							y: 50,
							mode: 'percent',
							radius: 0
						},
						decay: 0,
						distance: {},
						direction: 'none',
						drift: 0,
						enable: true,
						outModes: {
							default: 'out',
							bottom: 'out',
							left: 'out',
							right: 'out',
							top: 'out'
						},
						random: false,
						size: false,
						speed: 2,
						straight: false,
						vibrate: false,
						warp: false
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
							min: 0.1,
							max: 0.5
						},
						animation: {
							count: 0,
							enable: true,
							speed: 3,
							decay: 0,
							delay: 0,
							sync: false,
							mode: 'auto',
							startValue: 'random',
							destroy: 'none'
						}
					},
					reduceDuplicates: false,
					shape: {
						close: true,
						fill: true,
						options: {},
						type: 'circle'
					},
					size: {
						value: {
							min: 1,
							max: 10
						},
						animation: {
							count: 0,
							enable: true,
							speed: 20,
							decay: 0,
							delay: 0,
							sync: false,
							mode: 'auto',
							startValue: 'random',
							destroy: 'none'
						}
					},
					stroke: {
						width: 0
					},
					zIndex: {
						value: 0,
						opacityRate: 1,
						sizeRate: 1,
						velocityRate: 1
					},
					destroy: {
						bounds: {},
						mode: 'none',
						split: {
							count: 1,
							factor: {
								value: 3
							},
							rate: {
								value: {
									min: 4,
									max: 9
								}
							},
							sizeOffset: true,
							particles: {}
						}
					},
					links: {
						color: {
							value: '#ffffff'
						},
						distance: 150,
						enable: true,
						frequency: 1,
						opacity: 0.4,
						width: 1,
						warp: false
					},
					repulse: {
						value: 0,
						enabled: false,
						distance: 1,
						duration: 1,
						factor: 1,
						speed: 1
					}
				}
			}}
		/>
		<h1 class="z-10 text-4xl">
			EduTools {#if $preferencesStore.experimentalFeatures}Experimental{/if}
		</h1>
	</div>
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

<style>
	.hero-background {
		animation-name: background;
		animation-duration: 0.5s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	@keyframes background {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 24px 24px;
		}
	}
</style>
