<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import restoreBackup from '$lib/restoreBackup';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';

	let loading = $state(false);

	function validateBackupData(dataParam: string): void {
		if (!dataParam || dataParam.trim() === '') {
			throw new Error('No data provided');
		}

		let decoded: string;
		try {
			decoded = atob(dataParam);
		} catch (error) {
			throw new Error('Invalid base64 data');
		}

		let parsed: any;
		try {
			parsed = JSON.parse(decoded);
		} catch (error) {
			throw new Error('Invalid JSON data');
		}

		// Validate schema - check that it is an object and has expected optional properties
		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
			throw new Error('Backup data must be an object');
		}

		// Validate optional properties if they exist
		if (parsed.cookies !== undefined && typeof parsed.cookies !== 'string') {
			throw new Error('Cookies data must be a string');
		}

		if (
			parsed.localstorage !== undefined &&
			(typeof parsed.localstorage !== 'object' || Array.isArray(parsed.localstorage))
		) {
			throw new Error('LocalStorage data must be an object');
		}

		if (
			parsed.sessionstorage !== undefined &&
			(typeof parsed.sessionstorage !== 'object' || Array.isArray(parsed.sessionstorage))
		) {
			throw new Error('SessionStorage data must be an object');
		}

		// Check for unexpected properties (optional validation)
		const allowedKeys = ['cookies', 'localstorage', 'sessionstorage'];
		const unexpectedKeys = Object.keys(parsed).filter((key) => !allowedKeys.includes(key));
		if (unexpectedKeys.length > 0) {
			throw new Error(`Unexpected properties in backup data: ${unexpectedKeys.join(', ')}`);
		}
	}
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
						try {
							validateBackupData(data);
						} catch (error) {
							loading = false;
							if (error instanceof Error) {
								toast.error('Backup data is invalid', { description: error.message });
							} else {
								toast.error('Backup data is invalid');
							}
						}
						try {
							restoreBackup(data);
						} catch {
							loading = false;
							toast.error('Failed to import data');
						}
					} else {
						loading = false;
						toast.error('No data provided');
					}
				}}>Continue</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
