<script lang="ts">
	import { preferencesStore } from '$lib/stores';

	let title = $derived(
		($preferencesStore.cloak.mode == 'on' && $preferencesStore.cloak.name) || 'EduTools'
	);
	let icon = $derived(
		$preferencesStore.cloak.mode == 'on' ? $preferencesStore.cloak.icon : '/favicon.ico'
	);
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="icon" href={icon} type="image/x-icon" />
</svelte:head>
