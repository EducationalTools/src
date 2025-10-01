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
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';

	let inputText = $state('');
	let outputText = $state('');
	let error = $state('');

	function encode() {
		try {
			error = '';
			outputText = btoa(inputText);
		} catch (e) {
			error = 'Failed to encode. Please check your input.';
			outputText = '';
		}
	}

	function decode() {
		try {
			error = '';
			outputText = atob(inputText);
		} catch (e) {
			error = 'Invalid Base64 input. Please check your input.';
			outputText = '';
		}
	}

	function clearAll() {
		inputText = '';
		outputText = '';
		error = '';
	}

	function copyToClipboard() {
		if (outputText) {
			navigator.clipboard.writeText(outputText);
		}
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-4xl">
		<CardHeader>
			<CardTitle>Base64 Encoder/Decoder</CardTitle>
			<CardDescription>Encode text to Base64 or decode Base64 back to text</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<Tabs value="encode" class="w-full">
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger value="encode">Encode</TabsTrigger>
					<TabsTrigger value="decode">Decode</TabsTrigger>
				</TabsList>

				<TabsContent value="encode" class="space-y-4">
					<div>
						<Textarea
							bind:value={inputText}
							placeholder="Enter text to encode to Base64..."
							class="min-h-[150px]"
						/>
					</div>
					<Button onclick={encode} disabled={!inputText.trim()}>Encode to Base64</Button>
				</TabsContent>

				<TabsContent value="decode" class="space-y-4">
					<div>
						<Textarea
							bind:value={inputText}
							placeholder="Enter Base64 text to decode..."
							class="min-h-[150px]"
						/>
					</div>
					<Button onclick={decode} disabled={!inputText.trim()}>Decode from Base64</Button>
				</TabsContent>
			</Tabs>

			<div class="flex gap-2">
				<Button variant="outline" onclick={clearAll}>Clear All</Button>
				{#if outputText}
					<Button variant="secondary" onclick={copyToClipboard}>Copy Result</Button>
				{/if}
			</div>

			{#if error}
				<div class="text-destructive bg-destructive/10 rounded border p-3">
					{error}
				</div>
			{/if}

			{#if outputText}
				<div>
					<h3 class="mb-2 text-lg font-semibold">Result:</h3>
					<Textarea value={outputText} readonly class="bg-muted min-h-[150px]" />
				</div>
			{/if}
		</CardContent>
	</Card>
</div>
