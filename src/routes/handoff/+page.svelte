<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import restoreBackup from '$lib/restoreBackup';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	let loading = $state(false);
</script>

<AlertDialog.Root open={loading}
	><AlertDialog.Content class="flex flex-row gap-3">
		<LoaderCircle class="animate-spin" />
		Loading
	</AlertDialog.Content>
</AlertDialog.Root>
<div class="flex h-full w-full items-center justify-center p-3">
	<Card.Root class="max-w-full min-w-96">
		<Card.Header>
			<Card.Title>Importing data</Card.Title>
			<Card.Description>
				This will clear all of your existing data on <span class="font-mono"
					>{page.url.hostname}</span
				>
			</Card.Description>
		</Card.Header>
		<Card.Footer class="flex flex-row justify-end gap-3">
			<Button
				variant="outline"
				onclick={() => {
					history.back();
				}}>Cancel</Button
			>
			<Button
				variant="destructive"
				onclick={() => {
					loading = true;
					let data = page.url.searchParams.get('data');
					if (data) {
						restoreBackup(data);
					}
				}}>Continue</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
