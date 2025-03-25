<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let settingsOpen = $state(false);
</script>

<Dialog.Root bind:open={settingsOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
