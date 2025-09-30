<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select/index.js';

	let inputText = $state('');
	let output = $state('');
	let font = $state('block');

	// Simple ASCII art fonts
	const fonts = {
		block: {
			A: ['█████', '█   █', '█████', '█   █', '█   █'],
			B: ['████ ', '█   █', '████ ', '█   █', '████ '],
			C: ['█████', '█    ', '█    ', '█    ', '█████'],
			D: ['████ ', '█   █', '█   █', '█   █', '████ '],
			E: ['█████', '█    ', '███  ', '█    ', '█████'],
			F: ['█████', '█    ', '███  ', '█    ', '█    '],
			G: ['█████', '█    ', '█ ███', '█   █', '█████'],
			H: ['█   █', '█   █', '█████', '█   █', '█   █'],
			I: ['█████', '  █  ', '  █  ', '  █  ', '█████'],
			J: ['█████', '    █', '    █', '█   █', '█████'],
			K: ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
			L: ['█    ', '█    ', '█    ', '█    ', '█████'],
			M: ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
			N: ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
			O: ['█████', '█   █', '█   █', '█   █', '█████'],
			P: ['████ ', '█   █', '████ ', '█    ', '█    '],
			Q: ['█████', '█   █', '█ █ █', '█  ██', '██ ██'],
			R: ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
			S: ['█████', '█    ', '█████', '    █', '█████'],
			T: ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
			U: ['█   █', '█   █', '█   █', '█   █', '█████'],
			V: ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
			W: ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
			X: ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
			Y: ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
			Z: ['█████', '   █ ', '  █  ', ' █   ', '█████'],
			' ': ['     ', '     ', '     ', '     ', '     '],
			'!': ['  █  ', '  █  ', '  █  ', '     ', '  █  '],
			'?': ['█████', '    █', '  ██ ', '     ', '  █  ']
		},

		small: {
			A: ['█▀█', '█▀█', '█▄█'],
			B: ['█▀▄', '█▀▄', '█▄▀'],
			C: ['▄▀█', '█▄▄', '▀▀▀'],
			D: ['█▀▄', '█▄█', '█▄▀'],
			E: ['█▀▀', '█▀▀', '█▄▄'],
			F: ['█▀▀', '█▀▀', '█▄▄'],
			G: ['▄▀█', '█▄█', '▀▀█'],
			H: ['█▄█', '█▀█', '█▄█'],
			I: ['█', '█', '█'],
			J: ['▄▄█', '▄▄█', '▀▀▀'],
			K: ['█▄▀', '██▄', '█▄█'],
			L: ['█▄▄', '█▄▄', '▀▀▀'],
			M: ['█▄█', '█▀█', '█▄█'],
			N: ['█▄█', '█▀█', '█▄█'],
			O: ['▄▀█', '█▄█', '▀▀▀'],
			P: ['█▀▄', '█▀▄', '█▄▄'],
			Q: ['▄▀█', '█▄█', '▀▀█'],
			R: ['█▀▄', '█▀▄', '█▄█'],
			S: ['▄▀▀', '▀▀▄', '▄▄▀'],
			T: ['▀█▀', '▄█▄', '▀▀▀'],
			U: ['█▄█', '█▄█', '▀▀▀'],
			V: ['█▄█', '▀█▀', '▄▀▄'],
			W: ['█▄█', '█▀█', '▀▄▀'],
			X: ['█▄█', '▀█▀', '█▄█'],
			Y: ['█▄█', '▀█▀', '▄▀▄'],
			Z: ['▀▀▀', '▄▀▄', '▀▀▀'],
			' ': ['   ', '   ', '   '],
			'!': ['█', '█', '█'],
			'?': ['▀▀', '▄▀', '▀▀']
		}
	};

	function generateAsciiArt() {
		if (!inputText.trim()) {
			output = '';
			return;
		}

		const selectedFont = fonts[font as keyof typeof fonts];
		const text = inputText.toUpperCase();
		const lines: string[] = [];

		// Get the height of the font (number of rows)
		const fontHeight = Object.values(selectedFont)[0].length;

		// Initialize lines array
		for (let i = 0; i < fontHeight; i++) {
			lines.push('');
		}

		// Process each character
		for (let charIndex = 0; charIndex < text.length; charIndex++) {
			const char = text[charIndex];
			const charPattern = selectedFont[char] || selectedFont[' '];

			// Add each line of the character to the corresponding line
			for (let lineIndex = 0; lineIndex < fontHeight; lineIndex++) {
				lines[lineIndex] += charPattern[lineIndex];
				// Add space between characters (except for the last character)
				if (charIndex < text.length - 1) {
					lines[lineIndex] += ' ';
				}
			}
		}

		output = lines.join('\n');
	}

	function copyToClipboard() {
		if (output) {
			navigator.clipboard.writeText(output);
		}
	}

	function clearAll() {
		inputText = '';
		output = '';
	}

	// Generate ASCII art when input or font changes
	$effect(() => {
		generateAsciiArt();
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-4xl">
		<CardHeader>
			<CardTitle>ASCII Art Generator</CardTitle>
			<CardDescription>Convert text into ASCII art using different fonts</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label for="text" class="mb-2 block text-sm font-medium">Text to Convert:</label>
					<Input
						id="text"
						bind:value={inputText}
						placeholder="Enter text (letters, spaces, !, ? supported)"
						maxlength="20"
						class="w-full"
					/>
				</div>

				<div>
					<label for="font" class="mb-2 block text-sm font-medium">Font Style:</label>
					<Select bind:value={font}>
						<SelectTrigger>
							{font === 'block' ? 'Block' : 'Small'}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="block">Block</SelectItem>
							<SelectItem value="small">Small</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div class="flex gap-2">
				<Button onclick={generateAsciiArt} disabled={!inputText.trim()}>Generate ASCII Art</Button>
				<Button variant="outline" onclick={clearAll}>Clear</Button>
				{#if output}
					<Button variant="secondary" onclick={copyToClipboard}>Copy ASCII Art</Button>
				{/if}
			</div>

			{#if output}
				<div>
					<h3 class="mb-2 text-lg font-semibold">ASCII Art:</h3>
					<div class="overflow-auto rounded border bg-black p-4 text-green-400">
						<pre class="font-mono text-sm whitespace-pre">{output}</pre>
					</div>
				</div>
			{/if}

			<div class="text-muted-foreground space-y-1 text-sm">
				<p><strong>Supported characters:</strong> A-Z, space, !, ?</p>
				<p><strong>Tip:</strong> Keep text short (max 20 characters) for best results</p>
				<p><strong>Note:</strong> ASCII art works best with monospace fonts</p>
			</div>
		</CardContent>
	</Card>
</div>
