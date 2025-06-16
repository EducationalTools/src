<script lang="ts">
	// Svelte and framework imports
	import type { ComponentProps } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/state';
	import clsx from 'clsx';

	// UI Components
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const sidebar = useSidebar();

	// Lucide icons
	import Wrench from 'lucide-svelte/icons/wrench';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Search from 'lucide-svelte/icons/search';
	import Home from 'lucide-svelte/icons/home';
	import Game from 'lucide-svelte/icons/gamepad-2';
	import Check from 'lucide-svelte/icons/check';
	import Code from 'lucide-svelte/icons/code';
	import Settings from 'lucide-svelte/icons/settings';
	import PanelLeft from 'lucide-svelte/icons/panel-left';

	// App state and data
	import { preferencesStore } from '$lib/stores';
	import { gmaes } from '$lib/gmaes.js';
	import { settingsOpen } from '$lib/state.svelte';

	// Props
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let commandOpen = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			commandOpen = !commandOpen;
		}
	}

	const mainNavigation: {
		title: string;
		url: string;
		icon?: any;
		experimental: boolean;
		items: {
			title: string;
			url: string;
		}[];
	}[] = $derived(
		[
			{
				title: 'Home',
				icon: Home,
				url: '/',
				experimental: false,
				items: []
			},
			{
				title: 'Tools',
				icon: Wrench,
				experimental: false,
				url: '',
				items: [
					{
						title: 'Calculator',
						url: '/tools/calculator'
					},
					{
						title: 'Converter',
						url: '/tools/converter'
					},
					{
						title: 'Rich Text Editor',
						url: '/tools/rich-text-editor'
					},
					{
						title: 'Word Counter',
						url: '/tools/word-counter'
					},
					{
						title: 'Password Generator',
						url: '/tools/password-generator'
					},
					{
						title: 'Random Number Gen',
						url: '/tools/random-number-generator'
					}
				]
			},
			{
				title: 'Gmaes',
				icon: Game,
				experimental: true,
				url: '',
				items: [
					{
						title: 'All Gmaes',
						url: '/g'
					},
					{
						title: 'Request a Gmae',
						url: 'https://github.com/EducationalTools/src/issues/new?assignees=&labels=gmae%2Cenhancement&projects=&template=gmae_request.yml&title=%5BGmae+Request%5D+'
					},
					...gmaes.map((gmae) => ({
						title: gmae.name,
						url: `/g/${gmae.id}`
					}))
				]
			}
		].filter((item) => !item.experimental || $preferencesStore.experimentalFeatures)
	);
</script>

<svelte:document onkeydown={handleKeydown} />

<Sidebar.Root collapsible="icon" bind:ref {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg" class="!transition-all hover:scale-105 active:scale-95">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class={clsx(
									'text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-700 p-1'
								)}
							>
								<img src="/edutools-white.svg" alt="" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">EduTools</span>
								{#if $preferencesStore.experimentalFeatures}<span>Experimental</span>{/if}
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg" class="!transition-all hover:scale-105 active:scale-95">
					{#snippet child({ props })}
						<button
							onclick={function () {
								commandOpen = true;
							}}
							{...props}
						>
							<div
								class="text-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<Search class="size-4" />
							</div>
							<div class="flex w-full flex-row items-center gap-2 leading-none">
								<span>Search</span>
								<div class="flex-grow"></div>
								<kbd
									class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
								>
									<span class="text-xs">⌘</span>K
								</kbd>
							</div>
						</button>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each mainNavigation as groupItem (groupItem.title)}
					{@const Icon = groupItem.icon}

					{#if groupItem.items?.length}
						<Collapsible.Root class="group/collapsible">
							<Sidebar.MenuItem>
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton
											class="cursor-pointer"
											isActive={groupItem.url === page.url.pathname ||
												(groupItem.url === '/' && page.url.pathname === '')}
											{...props}
										>
											{#snippet child({ props })}
												<a class=" font-medium" {...props}>
													{#if Icon}
														<Icon />
													{/if}
													{groupItem.title}
													<ChevronRight
														class="ml-auto duration-300 group-data-[state=open]/collapsible:rotate-90"
													/>
												</a>
											{/snippet}
										</Sidebar.MenuButton>
									{/snippet}
								</Collapsible.Trigger>
								<Collapsible.Content forceMount>
									{#snippet child({ props, open })}
										{#if open}
											<div {...props} transition:slide>
												<Sidebar.MenuSub>
													{#each groupItem.items as item (item.title)}
														<Sidebar.MenuSubItem>
															<Sidebar.MenuSubButton
																isActive={item.url === page.url.pathname ||
																	(item.url === '/' && page.url.pathname === '')}
															>
																{#snippet child({ props })}
																	<a
																		href={item.url}
																		{...props}
																		class={clsx(
																			'group/link z-50 text-nowrap hover:overflow-visible',
																			props.class || ''
																		)}
																		target={item.url.startsWith('http') ? '_blank' : undefined}
																		rel={item.url.startsWith('http')
																			? 'noopener noreferrer'
																			: undefined}
																	>
																		{item.title}
																		<div
																			class="to-sidebar absolute right-0 h-full w-[25%] bg-gradient-to-r from-transparent group-hover/link:opacity-0"
																		></div>
																	</a>
																{/snippet}
															</Sidebar.MenuSubButton>
														</Sidebar.MenuSubItem>
													{/each}
												</Sidebar.MenuSub>
											</div>
										{/if}
									{/snippet}
								</Collapsible.Content>
							</Sidebar.MenuItem></Collapsible.Root
						>
					{:else}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={groupItem.url === page.url.pathname ||
									(groupItem.url === '/' && page.url.pathname === '')}
							>
								{#snippet child({ props })}
									<a
										href={groupItem.url}
										class="font-medium"
										{...props}
										target={groupItem.url.startsWith('http') ? '_blank' : undefined}
										rel={groupItem.url.startsWith('http') ? 'noopener noreferrer' : undefined}
									>
										{#if Icon}
											<Icon />
										{/if}
										{groupItem.title}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/if}
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer class="[&>li]:list-none">
		{#if $preferencesStore.experimentalFeatures === true}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a target="_blank" href="https://github.com/EducationalTools/src" {...props}>
							<Code />
							EducationalTools/src
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={() => {
						settingsOpen.current = true;
					}}
				>
					<Settings />
					Settings
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/if}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton
				onclick={() => {
					sidebar.toggle();
				}}
			>
				<PanelLeft />
				Sidebar
				<div class="grow"></div>
				<kbd
					class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
				>
					<span class="text-xs">⌘</span>B
				</kbd>
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>

<Command.Dialog bind:open={commandOpen}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		{#each mainNavigation as groupItem (groupItem.title)}
			{#if groupItem.items?.length}
				<Command.Group heading={groupItem.title}>
					{#each groupItem.items as item (item.title)}
						<Command.LinkItem
							href={item.url}
							onSelect={() => (commandOpen = false)}
							target={item.url.startsWith('http') ? '_blank' : undefined}
							rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
						>
							<span>{item.title}</span>
						</Command.LinkItem>
					{/each}
				</Command.Group>
				<Command.Separator />
			{:else}
				<Command.Group>
					<Command.LinkItem
						href={groupItem.url}
						onSelect={() => (commandOpen = false)}
						target={groupItem.url.startsWith('http') ? '_blank' : undefined}
						rel={groupItem.url.startsWith('http') ? 'noopener noreferrer' : undefined}
					>
						<span>{groupItem.title}</span>
					</Command.LinkItem>
				</Command.Group>
				<Command.Separator />
			{/if}
		{/each}
		<Command.Group heading="More">
			{#if $preferencesStore.experimentalFeatures}
				<Command.Item
					onSelect={() => {
						settingsOpen.current = true;
						commandOpen = false;
					}}
				>
					<span>Settings</span>
				</Command.Item>
			{/if}
			<Command.Item
				onSelect={() =>
					($preferencesStore.experimentalFeatures = !$preferencesStore.experimentalFeatures)}
			>
				{#if $preferencesStore.experimentalFeatures}
					<Check />
				{/if}

				<span>Toggle experimental features</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
