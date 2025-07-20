<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { trackerDialogClosed } from '$lib/analytics';

	// Props
	let { open = $bindable() } = $props<{ open: boolean }>();
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Title>Notice</Dialog.Title>
		<Dialog.Description>
			We use Posthog to track errors and usage to improve EduTools. Please disable your tracker/ad
			blocker to allow this. Don't worry, we won't add any ads.
		</Dialog.Description>
		<Dialog.Footer>
			<Dialog.Close onclick={() => ($trackerDialogClosed = true)}>
				<Button variant="ghost">Don't show again</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button>Close</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
