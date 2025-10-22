<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { currentProfileId } from '$lib/state.svelte';
	import ProfileWithFetch from './profile-with-fetch.svelte';

	let open = $derived(currentProfileId.current == '' ? false : true);
</script>

<Dialog.Root
	{open}
	onOpenChange={(open) => {
		if (!open) {
			currentProfileId.current = '';
		}
	}}
>
	<Dialog.Content>
		{#key currentProfileId.current}
			<ProfileWithFetch id={currentProfileId.current} />
		{/key}
	</Dialog.Content>
</Dialog.Root>
