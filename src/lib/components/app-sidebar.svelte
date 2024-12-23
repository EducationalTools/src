<script lang="ts" module>
	// sample data
	const data = {
		navMain: [
			{
				title: 'Home',
				url: '/'
			},
			{
				title: 'Gmaes',
				items: [
					{
						title: 'Test',
						url: '/g/test'
					},
					{
						title: 'Test 2',
						url: '/g/test-2'
					}
				]
			},
			{
				title: 'Building Your Application',
				items: [
					{
						title: 'Routing',
						url: '#'
					},
					{
						title: 'Data Fetching',
						url: '#',
						isActive: true
					},
					{
						title: 'Rendering',
						url: '#'
					},
					{
						title: 'Caching',
						url: '#'
					},
					{
						title: 'Styling',
						url: '#'
					},
					{
						title: 'Optimizing',
						url: '#'
					},
					{
						title: 'Configuring',
						url: '#'
					},
					{
						title: 'Testing',
						url: '#'
					},
					{
						title: 'Authentication',
						url: '#'
					},
					{
						title: 'Deploying',
						url: '#'
					},
					{
						title: 'Upgrading',
						url: '#'
					},
					{
						title: 'Examples',
						url: '#'
					}
				]
			},
			{
				title: 'API Reference',
				items: [
					{
						title: 'Components',
						url: '#'
					},
					{
						title: 'File Conventions',
						url: '#'
					},
					{
						title: 'Functions',
						url: '#'
					},
					{
						title: 'next.config.js Options',
						url: '#'
					},
					{
						title: 'CLI',
						url: '#'
					},
					{
						title: 'Edge Runtime',
						url: '#'
					}
				]
			},
			{
				title: 'Architecture',
				items: [
					{
						title: 'Accessibility',
						url: '#'
					},
					{
						title: 'Fast Refresh',
						url: '#'
					},
					{
						title: 'Svelte Compiler',
						url: '#'
					},
					{
						title: 'Supported Browsers',
						url: '#'
					},
					{
						title: 'Rollup',
						url: '#'
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Wrench from 'lucide-svelte/icons/wrench';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import Search from 'lucide-svelte/icons/search';
	import type { ComponentProps } from 'svelte';
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<Wrench class="size-4" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">EduTools</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<button
							onclick={function () {
								open = true;
							}}
							{...props}
						>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
							>
								<Search class="size-4" />
							</div>
							<div class="flex w-full flex-row items-center gap-2 leading-none">
								<span>Search</span>
								<div class="flex-grow"></div>
								<kbd
									class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
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
				{#each data.navMain as groupItem (groupItem.title)}
					{#if groupItem.items?.length}
						<Collapsible.Root>
							<Sidebar.MenuItem>
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton class="cursor-pointer" {...props}>
											{#snippet child({ props })}
												<a class=" font-medium" {...props}>
													{groupItem.title}
													<ChevronsUpDown class="ml-auto" />
												</a>
											{/snippet}
										</Sidebar.MenuButton>
									{/snippet}
								</Collapsible.Trigger>
								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each groupItem.items as item (item.title)}
											<Sidebar.MenuSubItem>
												<Sidebar.MenuSubButton isActive={item.isActive}>
													{#snippet child({ props })}
														<a href={item.url} {...props}>{item.title}</a>
													{/snippet}
												</Sidebar.MenuSubButton>
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub></Collapsible.Content
								>
							</Sidebar.MenuItem></Collapsible.Root
						>
					{:else}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={groupItem.url} class="font-medium" {...props}>
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
	<Sidebar.Rail />
</Sidebar.Root>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		{#each data.navMain as groupItem (groupItem.title)}
			{#if groupItem.items?.length}
				<Command.Group heading={groupItem.title}>
					{#each groupItem.items as item (item.title)}
						<Command.LinkItem href={item.url} onSelect={() => (open = false)}>
							<span>{item.title}</span>
						</Command.LinkItem>
					{/each}
				</Command.Group>
				<Command.Separator />
			{:else}
				<Command.Group>
					<Command.LinkItem href={groupItem.url} onSelect={() => (open = false)}>
						<span>{groupItem.title}</span>
					</Command.LinkItem>
				</Command.Group>
				<Command.Separator />
			{/if}
		{/each}
		<Command.Group>
			<Command.Item>
				<span>Settings</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
