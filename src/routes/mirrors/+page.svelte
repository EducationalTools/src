<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import createBackup from '$lib/createBackup';
	import Trophy from '@lucide/svelte/icons/trophy';
	import Star from '@lucide/svelte/icons/star';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';

	import { page } from '$app/state';
	import clsx from 'clsx';

	interface Mirror {
		url: string;
		notes?: string;
		quality?: string;
	}

	let mirrors: Mirror[] = [
		{ url: 'https://edutools.ingo.au', quality: 'highlyrecommended' },
		{ url: 'https://edutools.ingowolf.au', quality: 'recommended' },
		{ url: 'https://educationaltools.github.io', quality: 'recommended' },
		{ url: 'https://educationaltools.vercel.app', notes: '' },
		{ url: 'https://edutools-d915e.web.app', notes: '' },
		{ url: 'https://edutools-d915e.firebaseapp.com', notes: '' },
		{ url: 'https://edutools.infinityfreeapp.com', quality: 'notrecommended' },
		{ url: 'https://localhost', quality: 'notrecommended' }
	];
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
	<h1 class="text-3xl">Mirrors</h1>
	<div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
		{#each mirrors as mirror}
			{@const selected = page.url.hostname == new URL(mirror.url).hostname}
			<Card.Root class={clsx(selected && 'bg-neutral-200 dark:bg-neutral-700')}>
				<Card.Header>
					<Card.Title>{new URL(mirror.url).hostname}</Card.Title>

					{#if selected}
						<Badge variant="outline">Current</Badge>
					{/if}
					{#if mirror.quality == 'highlyrecommended'}
						<Badge class="bg-gradient-to-r from-yellow-300 to-yellow-500"
							><Trophy />Highly Recommended</Badge
						>
					{:else if mirror.quality == 'recommended'}
						<Badge class="bg-yellow-600 dark:bg-yellow-200"><Star />Recommended</Badge>
					{:else if mirror.quality == 'notrecommended'}
						<Badge class="bg-red-600 dark:bg-red-200"><TriangleAlert />Not Recommended</Badge>
					{/if}

					{#if mirror.notes}
						<Card.Description>{mirror.notes}</Card.Description>
					{/if}
				</Card.Header>
				{#if !selected}
					<Card.Footer class="flex flex-row gap-3">
						<Button variant="outline" href={mirror.url}>Go</Button>
						<Button
							onclick={() => {
								location.href = mirror.url + '/handoff?data=' + createBackup();
							}}
						>
							Migrate
						</Button>
					</Card.Footer>
				{/if}
			</Card.Root>
		{/each}
	</div>
</div>
