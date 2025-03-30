<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

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
		Appearence
		<Select.Root type="single" bind:value={$preferencesStore.theme}>
			<Select.Trigger>
				{triggerContent}
			</Select.Trigger>
			<Select.Content>
				{#each themes as theme}
					<Select.Item value={theme.value}>{theme.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</Dialog.Content>
</Dialog.Root>
