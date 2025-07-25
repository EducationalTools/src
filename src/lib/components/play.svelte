<script lang="ts">
	let { id } = $props();

	// Components
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Drawer } from 'vaul-svelte';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { badgeVariants } from '$lib/components/ui/badge/index.js';

	// Icons
	import Refresh from '@lucide/svelte/icons/refresh-cw';
	import Fullscreen from '@lucide/svelte/icons/maximize';
	import OpenInNewTab from '@lucide/svelte/icons/external-link';
	import Share from '@lucide/svelte/icons/share';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import Comment from '@lucide/svelte/icons/message-square';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	// App imports
	import { getGameById } from '$lib/gmaes';
	import { preferencesStore, favoritesStore, historyStore } from '$lib/stores';
	import clsx from 'clsx';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';

	function openNewTab(url: string) {
		url = location.origin + url;
		var openedTab;
		if ($preferencesStore.open === 'tab') {
			openedTab = window.open('', '_blank');
		} else if ($preferencesStore.open === 'window') {
			openedTab = window.open('', '_blank', 'width=800,height=600');
		} else {
			$preferencesStore.open = 'tab';
			openNewTab(url);
			return;
		}
		if (!openedTab) return;
		const newDocument = openedTab.document;
		const style = newDocument.createElement('style');
		style.textContent = 'body, html { margin: 0; padding: 0; height: 100%; }';
		newDocument.head.appendChild(style);
		const iframe = newDocument.createElement('iframe');
		iframe.src = url;
		iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
		newDocument.body.appendChild(iframe);
	}

	const gmaedata = $derived(getGameById(id));

	if ($preferencesStore.history) {
		let history = $historyStore;
		if (history.includes(id)) {
			history = history.filter((historyId) => historyId !== id);
		}

		history.push(id);

		historyStore.set(history);
	}

	onMount(() => {
		posthog.capture('gmae_open', { gmae_id: gmaedata?.id });
	});
</script>

<div class="flex h-full w-full flex-col gap-3 p-3">
	<iframe src={gmaedata?.url} frameborder="0" class="grow rounded" title={gmaedata?.name}></iframe>

	<div class="flex w-full flex-col gap-2 md:flex-row">
		<div class="flex flex-col gap-2">
			<a href="/" class={clsx(badgeVariants({ variant: 'secondary' }), 'w-fit')}
				>{gmaedata?.category}<ArrowRight class="ml-1 size-3" /></a
			>
			<h1 class="text-4xl font-bold">{gmaedata?.name}</h1>
			<div class="flex w-full flex-row flex-wrap gap-2">
				{#each gmaedata?.tags || [] as tag}
					<Badge variant="default">#{tag}</Badge>
				{/each}
				{#each gmaedata?.links || [] as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class={badgeVariants({ variant: 'outline' })}
					>
						<OpenInNewTab class="mr-1 size-3" />{link.name}
					</a>
				{/each}
			</div>
			<p class="text-xl">{gmaedata?.description}</p>
		</div>
		<div class="grow"></div>
		<div class="grid min-w-72 grid-cols-2 gap-3">
			<Drawer.Root direction="right">
				<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>
					<Comment class="h-6 w-6" />
					Comments
				</Drawer.Trigger>
				<Drawer.Content
					class="bg-background fixed top-0 right-0 bottom-0 z-20 flex w-[500px] max-w-full flex-col rounded-l-xl p-3 outline-none"
					style="--initial-transform: calc(100% + 8px)"
				>
					<h2 class="text-3xl">Comments</h2>
					<div class="giscus" style="flex-grow: 1; overflow: auto;"></div>
					<script
						src="https://giscus.app/client.js"
						data-repo="EducationalTools/src"
						data-repo-id="R_kgDONeKybw"
						data-category="Comments"
						data-category-id="DIC_kwDONeKyb84CpZld"
						data-mapping="specific"
						data-term={'Gmae - ' + gmaedata?.name}
						data-strict="1"
						data-reactions-enabled="1"
						data-emit-metadata="0"
						data-input-position="top"
						data-theme="preferred_color_scheme"
						data-lang="en"
						crossorigin="anonymous"
						async
					></script>
				</Drawer.Content>
				<Drawer.Overlay class="fixed inset-0 top-0 left-0 z-10 bg-black/50" />
			</Drawer.Root>
			<Button
				variant="outline"
				onclick={() => {
					posthog.capture('gmae_reload', { gmae_id: gmaedata?.id });
					const iframe = document.querySelector('iframe');
					if (iframe && gmaedata?.url) {
						iframe.src = gmaedata.url;
					}
				}}
			>
				<Refresh class="h-6 w-6" />
				Reload
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					posthog.capture('gmae_fullscreen', { gmae_id: gmaedata?.id });
					document.querySelector('iframe')?.requestFullscreen();
				}}
			>
				<Fullscreen class="h-6 w-6" />
				Fullscreen
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					posthog.capture('gmae_new_tab', { gmae_id: gmaedata?.id });
					if (gmaedata?.url) openNewTab(gmaedata.url);
				}}
			>
				<OpenInNewTab class="h-6 w-6" />
				New {$preferencesStore.open}
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					posthog.capture('gmae_share', { gmae_id: gmaedata?.id });
					if (navigator.share) {
						navigator
							.share({
								text: window.location.href
							})
							.catch(() => {
								navigator.clipboard.writeText(window.location.href);
								toast.error('Failed to share link, copied to clipboard instead.');
							});
					} else {
						navigator.clipboard.writeText(window.location.href);
						toast.error('Failed to share link, copied to clipboard instead.');
					}
				}}
			>
				<Share class="h-6 w-6" />
				Share
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					posthog.capture('gmae_favorite', { gmae_id: gmaedata?.id });
					if (gmaedata?.id) {
						if ($favoritesStore.includes(gmaedata.id)) {
							$favoritesStore = $favoritesStore.filter((id) => id !== gmaedata.id);
						} else {
							$favoritesStore = [...$favoritesStore, gmaedata.id];
						}
					}
				}}
			>
				{#if gmaedata?.id && $favoritesStore.includes(gmaedata.id)}
					<Bookmark class="h-6 w-6 text-red-400" />
					Saved
				{:else}
					<Bookmark class="h-6 w-6" />
					Save
				{/if}
			</Button>
		</div>
	</div>
</div>
