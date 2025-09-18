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
			We use PostHog to detect/fix errors, track usage and roll out features. Please disable your
			tracker/ad blocker for this site to allow this. Don't worry, we won't show you any ads.
			<br />
			<br />
			For more details about our data collection practices, see our
			<a href="/privacy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a>.
			<br />
			<br />
			<details>
				<summary>Techinal info</summary>
				<p>We detected that hog.edutools.ingo.au is blocked by your ad/tracker blocker</p>
			</details>
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
