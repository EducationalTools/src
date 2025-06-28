<script lang="ts">
	import { preferencesStore } from '$lib/stores';
</script>

<div
	class="from-accent/50 flex w-full items-center justify-center bg-gradient-to-b to-transparent py-52"
>
	<h1 class="text-4xl">
		EduTools {#if $preferencesStore.experimentalFeatures}Experimental{/if}
	</h1>
</div>
