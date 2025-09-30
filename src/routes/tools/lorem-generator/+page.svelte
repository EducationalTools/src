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
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	let count = $state(5);
	let output = $state('');
	let startWithLorem = $state(true);

	const loremWords = [
		'lorem',
		'ipsum',
		'dolor',
		'sit',
		'amet',
		'consectetur',
		'adipiscing',
		'elit',
		'sed',
		'do',
		'eiusmod',
		'tempor',
		'incididunt',
		'ut',
		'labore',
		'et',
		'dolore',
		'magna',
		'aliqua',
		'enim',
		'ad',
		'minim',
		'veniam',
		'quis',
		'nostrud',
		'exercitation',
		'ullamco',
		'laboris',
		'nisi',
		'aliquip',
		'ex',
		'ea',
		'commodo',
		'consequat',
		'duis',
		'aute',
		'irure',
		'in',
		'reprehenderit',
		'voluptate',
		'velit',
		'esse',
		'cillum',
		'fugiat',
		'nulla',
		'pariatur',
		'excepteur',
		'sint',
		'occaecat',
		'cupidatat',
		'non',
		'proident',
		'sunt',
		'culpa',
		'qui',
		'officia',
		'deserunt',
		'mollit',
		'anim',
		'id',
		'est',
		'laborum',
		'at',
		'vero',
		'eos',
		'accusamus',
		'accusantium',
		'doloremque',
		'laudantium',
		'totam',
		'rem',
		'aperiam',
		'eaque',
		'ipsa',
		'quae',
		'ab',
		'illo',
		'inventore',
		'veritatis',
		'et',
		'quasi',
		'architecto',
		'beatae',
		'vitae',
		'dicta',
		'sunt',
		'explicabo',
		'nemo',
		'ipsam',
		'voluptatem',
		'quia',
		'voluptas',
		'aspernatur',
		'aut',
		'odit',
		'fugit',
		'consequuntur',
		'magni',
		'dolores',
		'ratione',
		'sequi',
		'nesciunt',
		'neque',
		'porro',
		'quisquam',
		'dolorem',
		'adipisci',
		'numquam',
		'eius',
		'modi',
		'tempora',
		'incidunt',
		'magnam',
		'quaerat',
		'voluptatem'
	];

	function getRandomWord(): string {
		return loremWords[Math.floor(Math.random() * loremWords.length)];
	}

	function getRandomWords(count: number, startWithLorem: boolean = false): string[] {
		const words: string[] = [];

		if (startWithLorem && count > 0) {
			words.push('Lorem');
			count--;
		}

		for (let i = 0; i < count; i++) {
			words.push(getRandomWord());
		}

		return words;
	}

	function generateSentence(wordCount: number = 0): string {
		const minWords = 5;
		const maxWords = 15;
		const actualWordCount =
			wordCount || Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

		const words = getRandomWords(actualWordCount);
		words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

		return words.join(' ') + '.';
	}

	function generateParagraph(sentenceCount: number = 0): string {
		const minSentences = 3;
		const maxSentences = 7;
		const actualSentenceCount =
			sentenceCount || Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;

		const sentences: string[] = [];
		for (let i = 0; i < actualSentenceCount; i++) {
			sentences.push(generateSentence());
		}

		return sentences.join(' ');
	}

	function generate() {
		const results: string[] = [];

		// Always generate paragraphs
		for (let i = 0; i < count; i++) {
			let paragraph = generateParagraph();
			if (i === 0 && startWithLorem) {
				paragraph = paragraph.replace(/^[A-Za-z]+/, 'Lorem ipsum');
			}
			results.push(paragraph);
		}

		output = results.join('\n\n');
	}

	function copyToClipboard() {
		if (output) {
			navigator.clipboard.writeText(output);
		}
	}

	function clearAll() {
		output = '';
	}

	// Auto-generate on mount
	$effect(() => {
		if (count > 0) {
			generate();
		}
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-4xl">
		<CardHeader>
			<CardTitle>Lorem Ipsum Generator</CardTitle>
			<CardDescription>Generate placeholder text for your designs and layouts</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label for="count" class="mb-2 block text-sm font-medium">Paragraphs:</label>
					<Input id="count" type="number" bind:value={count} min="1" max="100" class="w-full" />
				</div>

				<div class="flex items-end">
					<label class="flex items-center space-x-2">
						<input type="checkbox" bind:checked={startWithLorem} class="rounded" />
						<span class="text-sm">Start with "Lorem ipsum"</span>
					</label>
				</div>
			</div>

			<div class="flex gap-2">
				<Button onclick={generate}>Generate Lorem Ipsum</Button>
				<Button variant="outline" onclick={clearAll}>Clear</Button>
				{#if output}
					<Button variant="secondary" onclick={copyToClipboard}>Copy to Clipboard</Button>
				{/if}
			</div>

			{#if output}
				<div>
					<h3 class="mb-2 text-lg font-semibold">Generated Text:</h3>
					<Textarea value={output} readonly class="bg-muted min-h-[300px]" />
				</div>
			{/if}

			<div class="text-muted-foreground text-sm">
				<p>
					<strong>Tip:</strong> Lorem ipsum is placeholder text commonly used in the printing and typesetting
					industry since the 1500s.
				</p>
				{#if output}
					<p>
						<strong>Generated:</strong>
						{count} paragraph{count !== 1 ? 's' : ''}, {output.split(' ').length} words, {output
							.split(/[.!?]+/)
							.filter((s) => s.trim()).length} sentences
					</p>
				{/if}
			</div>
		</CardContent>
	</Card>
</div>
