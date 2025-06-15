<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { settingsOpen } from '$lib/state.svelte';
	import { preferencesStore } from '$lib/stores';
	import { themes } from '$lib/theme';

	const triggerContent = $derived(
		themes.find((theme) => theme.value === $preferencesStore.theme)?.label ?? 'No theme :D'
	);
</script>

<Dialog.Root bind:open={settingsOpen.current}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
		Privacy
		<div class="flex items-center gap-3">
			<Checkbox id="analytics" bind:checked={$preferencesStore.analytics} />
			<Label for="analytics">Enable Analytics</Label>
		</div>
		<div class="flex items-center gap-3">
			<Checkbox id="history" bind:checked={$preferencesStore.history} />
			<Label for="history">Enable History</Label>
		</div>
	</Dialog.Content>
</Dialog.Root>
