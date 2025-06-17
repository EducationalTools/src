<script lang="ts">
	import { preferencesStore } from '$lib/stores';
	import { onMount } from 'svelte';

	let focused = $state(false);

	let title = $derived(
		$preferencesStore.experimentalFeatures &&
			($preferencesStore.cloak.mode == 'on' || ($preferencesStore.cloak.mode == 'blur' && !focused))
			? $preferencesStore.cloak.name
			: 'EduTools'
	);
	let icon = $derived(
		$preferencesStore.experimentalFeatures &&
			($preferencesStore.cloak.mode == 'on' || ($preferencesStore.cloak.mode == 'blur' && !focused))
			? $preferencesStore.cloak.icon
			: '/favicon.ico'
	);

	onMount(() => {
		document.addEventListener('blur', () => {
			focused = false;
		});

		document.addEventListener('focus', () => {
			focused = true;
		});
	});
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="icon" href={icon} type="image/x-icon" />
</svelte:head>
