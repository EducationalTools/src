<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';

	import '@friendofsvelte/tipex/styles/Tipex.css';
	import '@friendofsvelte/tipex/styles/ProseMirror.css';
	import '@friendofsvelte/tipex/styles/Controls.css';
	import '@friendofsvelte/tipex/styles/EditLink.css';
	import '@friendofsvelte/tipex/styles/CodeBlock.css';

	import { Tipex } from '@friendofsvelte/tipex';
	let body = ``;
</script>

<div class="flex h-full flex-col gap-3 p-3">
	<Alert.Root>
		<Alert.Title
			>I couldn't be bothered to include a rich text so heres a massive textarea</Alert.Title
		>
		<Alert.Description>If you know what you are doing open a pr :)</Alert.Description>
	</Alert.Root>
	<!-- <Textarea class="flex-grow resize-none"></Textarea> -->
	<Tipex
		{body}
		controls
		floating
		focal
		style="margin-top: 1rem; margin-bottom: 0;"
		class="prose prose-invert h-full w-full border border-neutral-200"
	/>
</div>
