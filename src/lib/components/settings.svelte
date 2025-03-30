<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import { settingsOpen } from '$lib/state.svelte';
</script>

<Dialog.Root bind:open={settingsOpen.current}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
