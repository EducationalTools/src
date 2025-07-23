<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import createBackup from '$lib/createBackup';
	import Trophy from '@lucide/svelte/icons/trophy';

	let mirrors = [
		{ url: 'https://edutools.ingo.au', notes: '', quality: 'highlyrecommended' },
		{ url: 'https://edutools.ingowolf.au', notes: '', quality: 'recommended' }
	];
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
	<div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
		{#each mirrors as mirror}
			<Card.Root>
				<Card.Header>
					<Card.Title>{new URL(mirror.url).hostname}</Card.Title>
					{#if mirror.quality == 'highlyrecommended'}
						<Badge class="bg-gradient-to-r from-yellow-300 to-yellow-500"
							><Trophy />Highly Recommended</Badge
						>
					{:else if mirror.quality == 'recommended'}
						<Badge class="bg-yellow-500 dark:bg-yellow-300"><Trophy />Recommended</Badge>
					{/if}
				</Card.Header>
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
			</Card.Root>
		{/each}
	</div>
</div>
