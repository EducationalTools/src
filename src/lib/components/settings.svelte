<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ClipboardIcon from '@lucide/svelte/icons/clipboard';
	import Input from './ui/input/input.svelte';
	import { buttonVariants } from './ui/button';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import posthog from 'posthog-js';

	import { settingsOpen } from '$lib/state.svelte';
	import { preferencesStore, historyStore } from '$lib/stores';
	import { themes } from '$lib/theme';
	import clsx from 'clsx';
	import Button from './ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { save } from '$lib/sync';
	import { useClerkContext } from 'svelte-clerk';
	const ctx = useClerkContext();

	let distinct_id = $state('Not available') as string;

	let sessionToken = $state('');

	onMount(() => {
		setTimeout(() => {
			distinct_id = posthog.get_distinct_id();
		}, 1000);
	});

	$effect(() => {
		posthog.capture('settingschange', $preferencesStore);
		if (sessionToken && sessionToken !== '') {
			save(sessionToken, { settings: true });
		}
	});

	$effect(() => {
		if (ctx.session) {
			getToken().then((token) => {
				sessionToken = token;
			});
		}
	});

	async function getToken() {
		const token = await ctx.session?.getToken();
		if (!token) {
			if (ctx.session) {
				toast.error('Something went wrong');
			}
			return '';
		}
		return token;
	}

	const themeTriggerContent = $derived(
		themes.find((theme) => theme.value === $preferencesStore.theme)?.label ?? 'No theme :D'
	);
</script>

<Dialog.Root bind:open={settingsOpen.current}>
	<Dialog.Content class="p-0">
		<div class="flex max-h-[80vh] flex-col gap-4 overflow-auto p-6">
			<Dialog.Header>
				<Dialog.Title>Settings</Dialog.Title>
			</Dialog.Header>
			Open in
			<RadioGroup.Root bind:value={$preferencesStore.open}>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="tab" id="tab" />
					<Label for="tab">Tab</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="window" id="window" />
					<Label for="window">Window</Label>
				</div>
			</RadioGroup.Root>
			Themes
			<div class="flex flex-row gap-2">
				<Dialog.Root>
					<Dialog.Trigger
						class={clsx(buttonVariants({ variant: 'outline' }), 'w-fit justify-start')}
					>
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
				<Button onclick={toggleMode} variant="outline" size="icon" class="relative">
					<SunIcon
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
					/>
					<MoonIcon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
			Panic key (requires refresh to apply)
			<div class="flex items-center gap-3">
				<Checkbox id="panic" bind:checked={$preferencesStore.panic.enabled} />
				<Label for="panic">Enable Panic Key</Label>
			</div>
			<div class="flex items-center gap-3">
				<Checkbox
					id="panic-disable-experimental"
					bind:checked={$preferencesStore.panic.disableExperimentalMode}
				/>
				<Label for="panic-disable-experimental">Disable Experimental Mode when triggered</Label>
			</div>
			<div class="flex flex-row gap-3">
				<Input bind:value={$preferencesStore.panic.key} placeholder="Key" maxlength={1} />
				<Input bind:value={$preferencesStore.panic.url} placeholder="URL" type="url" />
			</div>
			Cloak
			<Tabs.Root bind:value={$preferencesStore.cloak.mode}>
				<Tabs.List class="w-full">
					<Tabs.Trigger value="off">Off</Tabs.Trigger>
					<Tabs.Trigger value="blur">When not focused</Tabs.Trigger>
					<Tabs.Trigger value="on">On</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
			<div class="flex flex-row gap-3">
				<Input bind:value={$preferencesStore.cloak.name} placeholder="Page Name" />
				<Input bind:value={$preferencesStore.cloak.icon} placeholder="Icon URL" />
			</div>
			Privacy
			<div class="flex items-center gap-3">
				<Checkbox id="history" bind:checked={$preferencesStore.history} />
				<Label for="history">Enable History</Label>
			</div>
			<div class="flex min-h-12 flex-row gap-3 overflow-x-auto">
				<Button
					variant="outline"
					onclick={() => {
						$historyStore = [];
						toast.success('Cleared');
					}}
				>
					Clear history
				</Button>
				<Button
					variant="outline"
					onclick={() => {
						preferencesStore.reset();
						toast.success('Reset');
					}}
				>
					Reset settings
				</Button>
				<Button
					variant="destructive"
					onclick={() => {
						localStorage.clear();
						sessionStorage.clear();
						document.cookie.split(';').forEach((cookie) => {
							const eqPos = cookie.indexOf('=');
							const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
							document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
						});
						window.location.reload();
					}}
				>
					Clear everything
				</Button>
			</div>
			Unique ID (for troubleshooting)
			<div class="flex flex-row gap-3">
				<Input bind:value={distinct_id} disabled />
				<Button
					size="icon"
					onclick={() => {
						navigator.clipboard.writeText(distinct_id).then(() => {
							toast.success('Copied');
						});
					}}
				>
					<ClipboardIcon />
				</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
