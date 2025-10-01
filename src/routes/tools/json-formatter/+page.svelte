<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	let inputJson = $state('');
	let outputJson = $state('');
	let isValid = $state(true);
	let error = $state('');
	let indentSize = $state(2);

	function formatJson() {
		try {
			const parsed = JSON.parse(inputJson);
			outputJson = JSON.stringify(parsed, null, indentSize);
			isValid = true;
			error = '';
		} catch (e) {
			isValid = false;
			error = e instanceof Error ? e.message : 'Invalid JSON';
			outputJson = '';
		}
	}

	function minifyJson() {
		try {
			const parsed = JSON.parse(inputJson);
			outputJson = JSON.stringify(parsed);
			isValid = true;
			error = '';
		} catch (e) {
			isValid = false;
			error = e instanceof Error ? e.message : 'Invalid JSON';
			outputJson = '';
		}
	}

	function validateJson() {
		try {
			JSON.parse(inputJson);
			isValid = true;
			error = '';
		} catch (e) {
			isValid = false;
			error = e instanceof Error ? e.message : 'Invalid JSON';
		}
	}

	function clearAll() {
		inputJson = '';
		outputJson = '';
		error = '';
		isValid = true;
	}

	function copyToClipboard() {
		if (outputJson) {
			navigator.clipboard.writeText(outputJson);
		}
	}

	// Auto-validate on input change
	$effect(() => {
		if (inputJson.trim()) {
			validateJson();
		} else {
			isValid = true;
			error = '';
		}
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-6xl">
		<CardHeader>
			<CardTitle>JSON Formatter & Validator</CardTitle>
			<CardDescription>Format, validate, and minify JSON data</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">Input JSON</h3>
						<div class="flex items-center gap-2">
							{#if inputJson.trim()}
								<Badge variant={isValid ? 'success' : 'destructive'}>
									{isValid ? 'Valid' : 'Invalid'}
								</Badge>
							{/if}
						</div>
					</div>
					<Textarea
						bind:value={inputJson}
						placeholder="Enter JSON to format or validate..."
						class="min-h-[400px] font-mono text-sm"
					/>
				</div>

				<div class="space-y-4">
					<h3 class="text-lg font-semibold">Formatted Output</h3>
					<Textarea
						value={outputJson}
						readonly
						placeholder="Formatted JSON will appear here..."
						class="bg-muted min-h-[400px] font-mono text-sm"
					/>
				</div>
			</div>

			{#if error}
				<div class="text-destructive bg-destructive/10 rounded border p-3">
					<strong>Error:</strong>
					{error}
				</div>
			{/if}

			<div class="flex flex-wrap gap-2">
				<Button onclick={formatJson} disabled={!inputJson.trim() || !isValid}>Format JSON</Button>
				<Button variant="outline" onclick={minifyJson} disabled={!inputJson.trim() || !isValid}>
					Minify JSON
				</Button>
				<Button variant="outline" onclick={clearAll}>Clear All</Button>
				{#if outputJson}
					<Button variant="secondary" onclick={copyToClipboard}>Copy Result</Button>
				{/if}
			</div>

			<div class="text-muted-foreground flex items-center gap-2 text-sm">
				<label for="indent">Indent Size:</label>
				<select id="indent" bind:value={indentSize} class="rounded border px-2 py-1">
					<option value={2}>2 spaces</option>
					<option value={4}>4 spaces</option>
					<option value={1}>1 space</option>
				</select>
			</div>
		</CardContent>
	</Card>
</div>
