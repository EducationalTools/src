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

	// Lucide icons
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Search from '@lucide/svelte/icons/search';
	import Check from '@lucide/svelte/icons/check';
	import Code from '@lucide/svelte/icons/code';
	import Settings from '@lucide/svelte/icons/settings';
	import PanelLeft from '@lucide/svelte/icons/panel-left';

	// App state and data
	import { preferencesStore } from '$lib/stores';
	import { createMainNavigation } from '$lib/navigation';
	import { handleGlobalKeydown, createSidebarShortcuts } from '$lib/keyboard-shortcuts';

	// Games data
	import { gmaes } from '$lib/gmaes';
	import { settingsOpen } from '$lib/state.svelte';

	// Auth
	import posthog from 'posthog-js';
	import { GitBranch } from '@lucide/svelte';
	import Badge from './ui/badge/badge.svelte';

	import dayjs from 'dayjs';

	// Props
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const sidebar = useSidebar();

	let commandOpen = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		const shortcuts = createSidebarShortcuts({
			set: (value: boolean) => {
				commandOpen = value;
			}
		});
		if (handleGlobalKeydown(e, shortcuts)) {
			return;
		}

		if (e.key === ',' && (e.metaKey || e.ctrlKey) && $preferencesStore.experimentalFeatures) {
			e.preventDefault();
			settingsOpen.current = !settingsOpen.current;
		}
	}

	// Filter navigation based on experimental features
	const filteredMainNavigation = $derived(
		createMainNavigation(gmaes).filter(
			(item) => !item.experimental || $preferencesStore.experimentalFeatures
		)
	);
</script>

<svelte:document onkeydown={handleKeydown} />

<Sidebar.Root collapsible="icon" variant="floating" bind:ref {...restProps}>
	<Sidebar.Header class="rounded-lg bg-gradient-to-b from-white/10 to-transparent">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a
							href="/"
							onclick={() => {
								sidebar.setOpenMobile(false);
							}}
							{...props}
						>
							<div
								class={clsx(
									'text-sidebar-primary-foreground foreground bg-sidebar flex aspect-square size-8 items-center justify-center rounded-md p-1'
								)}
							>
								<img src="/edutools-black.svg" alt="" class="dark:invert" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold"
									>EduTools {#if $preferencesStore.experimentalFeatures}
										Experimental{/if}</span
								>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					size="lg"
					onclick={function () {
						posthog.capture('search');
						commandOpen = true;
						sidebar.setOpenMobile(false);
					}}
				>
					<div class="flex aspect-square size-8 items-center justify-center rounded-lg">
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
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each filteredMainNavigation as groupItem (groupItem.title)}
					{@const Icon = groupItem.icon}

					{#if groupItem.items?.length}
						<Collapsible.Root class="group/collapsible">
							<Sidebar.MenuItem
								onclick={() => {
									sidebar.setOpen(true);
								}}
							>
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton
											class="cursor-pointer"
											isActive={groupItem.url === page.url.pathname}
											{...props}
										>
											{#snippet child({ props })}
												<a
													class="font-medium"
													onclick={() => {
														sidebar.setOpenMobile(false);
													}}
													{...props}
												>
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
													{#if groupItem.items}
														{#each groupItem.items as item (item.title)}
															{@const SubIcon = item.icon}
															<Sidebar.MenuSubItem>
																<Sidebar.MenuSubButton isActive={item.url === page.url.pathname}>
																	{#snippet child({ props })}
																		<a
																			href={item.url}
																			onclick={() => {
																				sidebar.setOpenMobile(false);
																			}}
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
																			{#if SubIcon}
																				<SubIcon />
																			{/if}
																			{item.title}
																			<div
																				class="to-sidebar absolute right-0 h-full w-[25%] bg-gradient-to-r from-transparent group-hover/link:opacity-0"
																			></div>
																		</a>
																	{/snippet}
																</Sidebar.MenuSubButton>
															</Sidebar.MenuSubItem>
														{/each}
													{/if}
												</Sidebar.MenuSub>
											</div>
										{/if}
									{/snippet}
								</Collapsible.Content>
							</Sidebar.MenuItem></Collapsible.Root
						>
					{:else}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={groupItem.url === page.url.pathname}>
								{#snippet child({ props })}
									<a
										href={groupItem.url}
										class="font-medium"
										{...props}
										target={groupItem.url.startsWith('http') ? '_blank' : undefined}
										rel={groupItem.url.startsWith('http') ? 'noopener noreferrer' : undefined}
										onclick={() => {
											sidebar.setOpenMobile(false);
										}}
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
						<a
							onclick={() => {
								sidebar.setOpenMobile(false);
							}}
							target="_blank"
							href="https://github.com/EducationalTools/src"
							{...props}
						>
							<Code />
							<div class="truncate">EducationalTools/src</div>
							<div class="grow"></div>
							<div
								class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 truncate rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
							>
								<GitBranch class="size-2" />
								{process.env.BRANCH_NAME}
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={() => {
						settingsOpen.current = true;
						sidebar.setOpenMobile(false);
					}}
				>
					<Settings />
					Settings

					<div class="grow"></div>
					<kbd
						class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
					>
						<span class="text-xs">⌘</span>,
					</kbd>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/if}
		{#if !sidebar.isMobile}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={() => {
						posthog.capture('sidebar_toggle', { state: sidebar.open });
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
		{/if}
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>

<Command.Dialog bind:open={commandOpen}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		{#each filteredMainNavigation as groupItem (groupItem.title)}
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
