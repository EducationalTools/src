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

<div class="h-full w-full p-3">
	<Tipex {body} controls class="prose prose-invert h-full w-full max-w-full" />
</div>
