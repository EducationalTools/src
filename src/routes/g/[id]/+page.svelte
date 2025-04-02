<script lang="ts">
	// Framework imports
	import { page } from '$app/state';

	// Components
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';

	// Icons
	import Refresh from 'lucide-svelte/icons/refresh-cw';
	import Fullscreen from 'lucide-svelte/icons/maximize';
	import OpenInNewTab from 'lucide-svelte/icons/external-link';
	import Share from 'lucide-svelte/icons/share';
	import Bookmark from 'lucide-svelte/icons/bookmark';

	// App imports
	import { getGameById } from '$lib/gmaes';
	import { preferencesStore, favoritesStore, historyStore } from '$lib/stores';
	import { onMount } from 'svelte';

	function openNewTab(url: string) {
		url = location.origin + url;
		var openedTab;
		if ($preferencesStore.open === 'tab') {
			openedTab = window.open('', '_blank');
		} else if ($preferencesStore.open === 'window') {
			openedTab = window.open('', '_blank');
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

	const gmaedata = $derived(getGameById(page.params.id));

	onMount(() => {
		let history = $historyStore;
		if (history.includes(page.params.id)) {
			history = history.filter((id) => id !== page.params.id);
		}

		history.push(page.params.id);

		historyStore.set(history);
	});
</script>

<div class="flex h-full w-full flex-row gap-3 p-3">
	<iframe src={gmaedata?.url} frameborder="0" class="flex-grow rounded" title={gmaedata?.name}
	></iframe>

	<div class="flex h-full w-72 flex-col">
		<h1 class="text-4xl font-bold">{gmaedata?.name}</h1>
		<p class="text-xl">{gmaedata?.description}</p>
		<div class="flex-grow"></div>
		<div class="flex flex-col gap-3">
			<Button
				variant="outline"
				onclick={() => {
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
					document.querySelector('iframe')?.requestFullscreen();
				}}
			>
				<Fullscreen class="h-6 w-6" />
				Fullscreen
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					if (gmaedata?.url) openNewTab(gmaedata.url);
				}}
			>
				<OpenInNewTab class="h-6 w-6" />
				New tab
			</Button>
			<Button
				variant="outline"
				onclick={() => {
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
