<script lang="ts">
	// Framework imports
	import { page } from '$app/state';

	// Components
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';

	// Icons
	import Fullscreen from 'lucide-svelte/icons/maximize';
	import OpenInNewTab from 'lucide-svelte/icons/external-link';
	import Share from 'lucide-svelte/icons/share';

	// App imports
	import { getGameById } from '$lib/gmaes';
	import { preferencesStore } from '$lib/state.js';

	function openNewTab(url: string) {
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
</script>

<div class="flex h-full w-full flex-row gap-3 p-3">
	<iframe src={gmaedata?.url} frameborder="0" class="flex-grow rounded" title={gmaedata?.name}
	></iframe>

	<div class="flex h-full w-72 flex-col">
		<h1 class="text-4xl font-bold">{gmaedata?.name}</h1>
		<p class="text-xl">{gmaedata?.description}</p>
		<div class="flex-grow"></div>
		<div class="flex flex-row gap-3">
			<Button
				variant="outline"
				size="icon"
				class="flex-1"
				onclick={() => {
					document.querySelector('iframe')?.requestFullscreen();
				}}
				><span class="sr-only">Fullscreen</span>
				<Fullscreen class="h-6 w-6" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				class="flex-1"
				onclick={() => {
					if (gmaedata?.url) openNewTab(gmaedata.url);
				}}
				><span class="sr-only">Open in new tab</span>
				<OpenInNewTab class="h-6 w-6" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				class="flex-1"
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
				><span class="sr-only">Share</span>
				<Share class="h-6 w-6" />
			</Button>
		</div>
	</div>
</div>
