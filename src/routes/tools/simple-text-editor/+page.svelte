<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';

	let content = '<p>Start typing...</p>';

	// Execute formatting commands (bold, italic, underline)
	function execCommand(command: string) {
		document.execCommand(command, false, null);
	}
</script>

<div class="flex h-full flex-col gap-3 p-3">
	<Alert.Root>
		<Alert.Title>This is a text editor which includes rich text options</Alert.Title>
		<Alert.Description>If you know what you are doing and want to improve it, open a PR :)</Alert.Description>
	</Alert.Root>

	<!-- Formatting Toolbar -->
	<div class="toolbar">
		<button on:click={() => execCommand('bold')}><b>B</b></button>
		<button on:click={() => execCommand('italic')}><i>I</i></button>
		<button on:click={() => execCommand('underline')}><u>U</u></button>
	</div>

	<!-- Rich Text Editor -->
	<div class="editor" contenteditable="true">{@html content}</div>
</div>

<style>
	.toolbar {
		display: flex;
		gap: 8px;
		background: #f4f4f4;
		padding: 5px;
		border-radius: 5px;
	}
	button {
		background: white;
		border: 1px solid #ddd;
		padding: 5px 10px;
		cursor: pointer;
		font-size: 14px;
		border-radius: 4px;
	}
	button:hover {
		background: #eaeaea;
	}
	.editor {
		border: 1px solid #ccc;
		padding: 10px;
		min-height: 200px;
		border-radius: 5px;
		background: #fff;
		outline: none;
	}
</style>
