<script lang="ts">
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import Share from 'svelte-material-icons/Share.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>EduTools</title>
	<meta name="description" content="Put your description here." />
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full p-2 md:pl-0">
		<nav class="flex h-10 items-center space-x-1 rounded-md border bg-background p-1">
			<Sidebar.Trigger />
			<div class="flex-grow"></div>
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="flex-grow"></div>
			<Button type="button" data-sidebar="trigger" variant="ghost" size="icon" class="h-7 w-7"
				><Share /><span class="sr-only">Share</span></Button
			>
		</nav>
		{@render children?.()}
	</main>
</Sidebar.Provider>
