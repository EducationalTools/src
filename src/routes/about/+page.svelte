<script lang="ts">
	import Play from '$lib/components/play.svelte';
	import { page } from '$app/state';
	import { preferencesStore } from '$lib/stores.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

{#if $preferencesStore.experimentalFeatures}
	<div class="container mx-auto flex flex-col p-3">
		<h1 class="text-3xl">About</h1>
		Coming soon
	</div>
{:else}
	<div class="flex h-full flex-col items-center justify-center gap-3">
		<span class="text-6xl">404</span>
		<span class="text-3xl">Not Found</span>
		<Button variant="outline" href="/">Go home</Button>
	</div>
{/if}
