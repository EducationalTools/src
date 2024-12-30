<script lang="ts">
	import { page } from '$app/state';
	import { getGameById } from '$lib/gmaes';
	import { Button } from '$lib/components/ui/button/index.js';

	import Fullscreen from 'lucide-svelte/icons/maximize';
	import OpenInNewTab from 'lucide-svelte/icons/external-link';
	import Share from 'lucide-svelte/icons/share';

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
			<Button variant="outline" size="icon" class="flex-1"
				><span class="sr-only">Open in new tab</span>
				<OpenInNewTab class="h-6 w-6" />
			</Button>
			<Button variant="outline" size="icon" class="flex-1"
				><span class="sr-only">Share</span>
				<Share class="h-6 w-6" />
			</Button>
		</div>
	</div>
</div>
