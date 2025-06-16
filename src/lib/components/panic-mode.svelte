<script lang="ts">
	import { preferencesStore } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($preferencesStore.panic.enabled && $preferencesStore.experimentalFeatures) {
			document.addEventListener('keydown', (event) => {
				if (event.key === $preferencesStore.panic.key) {
					event.preventDefault();
					event.stopPropagation();
					if ($preferencesStore.panic.disableExperimentalMode) {
						$preferencesStore.experimentalFeatures = false;
					}
					window.open($preferencesStore.panic.url, '_self');
				}
			});
		}
	});
</script>
