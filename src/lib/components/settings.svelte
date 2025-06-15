<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { buttonVariants } from './ui/button';

	import { settingsOpen } from '$lib/state.svelte';
	import { preferencesStore } from '$lib/stores';
	import { themes } from '$lib/theme';
	import clsx from 'clsx';

	const themeTriggerContent = $derived(
		themes.find((theme) => theme.value === $preferencesStore.theme)?.label ?? 'No theme :D'
	);
</script>

<Dialog.Root bind:open={settingsOpen.current}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
		Themes
		<Dialog.Root>
			<Dialog.Trigger class={clsx(buttonVariants({ variant: 'outline' }), 'w-fit justify-start')}>
				{themeTriggerContent}
				<ChevronDownIcon class="opacity-50" />
			</Dialog.Trigger>
			<Dialog.Content class="p-0">
				<div class="max-h-[80vh] overflow-auto p-6">
					<RadioGroup.Root bind:value={$preferencesStore.theme}>
						{#each themes as theme}
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value={theme.value} id={theme.value} />
								<Label for={theme.value}>{theme.label}</Label>
							</div>
						{/each}
					</RadioGroup.Root>
				</div>
			</Dialog.Content>
		</Dialog.Root>
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
