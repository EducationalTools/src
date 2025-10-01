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
	import { Badge } from '$lib/components/ui/badge/index.js';

	let pattern = $state('\\b\\w+@\\w+\\.\\w+\\b');
	let flags = $state('gi');
	let testString = $state(`Here are some email addresses:
john.doe@example.com
jane_smith@company.org
admin@website.net
invalid-email@
another.email@domain.co.uk
test123@sample-site.com`);

	let matches = $state<RegExpMatchArray[]>([]);
	let error = $state('');
	let isValid = $state(true);

	// Common regex patterns
	const commonPatterns = [
		{
			name: 'Email',
			pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
			flags: 'gi'
		},
		{
			name: 'URL',
			pattern:
				'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
			flags: 'gi'
		},
		{
			name: 'Phone (US)',
			pattern: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
			flags: 'gi'
		},
		{
			name: 'IP Address',
			pattern:
				'\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
			flags: 'gi'
		},
		{
			name: 'Date (MM/DD/YYYY)',
			pattern: '\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d\\d\\b',
			flags: 'gi'
		},
		{
			name: 'Credit Card',
			pattern:
				'\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\\b',
			flags: 'gi'
		},
		{ name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'gi' },
		{ name: 'Word', pattern: '\\b\\w+\\b', flags: 'gi' },
		{ name: 'Number', pattern: '\\b\\d+(?:\\.\\d+)?\\b', flags: 'gi' }
	];

	function testRegex() {
		try {
			error = '';
			isValid = true;

			if (!pattern.trim()) {
				matches = [];
				return;
			}

			const regex = new RegExp(pattern, flags);
			const allMatches = Array.from(testString.matchAll(regex));
			matches = allMatches;
		} catch (e) {
			isValid = false;
			error = e instanceof Error ? e.message : 'Invalid regular expression';
			matches = [];
		}
	}

	function loadPattern(selectedPattern: (typeof commonPatterns)[0]) {
		pattern = selectedPattern.pattern;
		flags = selectedPattern.flags;
		testRegex();
	}

	function clearAll() {
		pattern = '';
		flags = 'gi';
		testString = '';
		matches = [];
		error = '';
		isValid = true;
	}

	function copyPattern() {
		const fullPattern = `/${pattern}/${flags}`;
		navigator.clipboard.writeText(fullPattern);
	}

	function copyMatches() {
		const matchText = matches.map((match) => match[0]).join('\n');
		navigator.clipboard.writeText(matchText);
	}

	// Test regex when pattern, flags, or test string changes
	$effect(() => {
		testRegex();
	});

	// Highlight matches in test string
	function getHighlightedText(): string {
		if (!isValid || matches.length === 0) {
			return testString;
		}

		let highlightedText = testString;
		const matchPositions: Array<{ start: number; end: number; text: string }> = [];

		// Collect all match positions
		matches.forEach((match) => {
			if (match.index !== undefined) {
				matchPositions.push({
					start: match.index,
					end: match.index + match[0].length,
					text: match[0]
				});
			}
		});

		// Sort by position (descending to replace from end to start)
		matchPositions.sort((a, b) => b.start - a.start);

		// Replace matches with highlighted versions
		matchPositions.forEach((match) => {
			const before = highlightedText.substring(0, match.start);
			const after = highlightedText.substring(match.end);
			highlightedText =
				before + `<mark class="bg-yellow-200 px-1 rounded">${match.text}</mark>` + after;
		});

		return highlightedText;
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-6xl">
		<CardHeader>
			<CardTitle>Regular Expression Tester</CardTitle>
			<CardDescription>Test and debug regular expressions with live matching</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<!-- Pattern Input -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div class="md:col-span-3">
					<label for="pattern" class="mb-2 block text-sm font-medium"
						>Regular Expression Pattern:</label
					>
					<Input
						id="pattern"
						bind:value={pattern}
						placeholder="Enter regex pattern..."
						class="font-mono"
					/>
				</div>
				<div>
					<label for="flags" class="mb-2 block text-sm font-medium">Flags:</label>
					<Input id="flags" bind:value={flags} placeholder="gi" class="font-mono" />
				</div>
			</div>

			<!-- Validation -->
			<div class="flex items-center gap-2">
				<Badge variant={isValid ? 'success' : 'destructive'}>
					{isValid ? 'Valid' : 'Invalid'}
				</Badge>
				{#if pattern && flags}
					<code class="bg-muted rounded px-2 py-1 text-sm">/{pattern}/{flags}</code>
				{/if}
				{#if matches.length > 0}
					<Badge variant="outline">{matches.length} match{matches.length !== 1 ? 'es' : ''}</Badge>
				{/if}
			</div>

			{#if error}
				<div class="text-destructive bg-destructive/10 rounded border p-3">
					<strong>Error:</strong>
					{error}
				</div>
			{/if}

			<!-- Common Patterns -->
			<div>
				<h3 class="mb-2 text-sm font-medium">Common Patterns:</h3>
				<div class="flex flex-wrap gap-2">
					{#each commonPatterns as commonPattern}
						<Button size="sm" variant="outline" onclick={() => loadPattern(commonPattern)}>
							{commonPattern.name}
						</Button>
					{/each}
				</div>
			</div>

			<!-- Test String -->
			<div>
				<label for="testString" class="mb-2 block text-sm font-medium">Test String:</label>
				<Textarea
					id="testString"
					bind:value={testString}
					placeholder="Enter text to test against your regex..."
					class="min-h-[150px] font-mono text-sm"
				/>
			</div>

			<!-- Highlighted Output -->
			{#if testString}
				<div>
					<h3 class="mb-2 text-sm font-medium">Text with Matches Highlighted:</h3>
					<div
						class="bg-muted max-h-[200px] overflow-auto rounded border p-3 font-mono text-sm whitespace-pre-wrap"
					>
						{@html getHighlightedText()}
					</div>
				</div>
			{/if}

			<!-- Matches List -->
			{#if matches.length > 0}
				<div>
					<h3 class="mb-2 text-sm font-medium">Matches ({matches.length}):</h3>
					<div class="max-h-[200px] space-y-2 overflow-auto">
						{#each matches as match, index}
							<div class="bg-muted rounded border p-2 text-sm">
								<div class="flex items-start justify-between">
									<span class="font-mono">{match[0]}</span>
									<Badge variant="outline" class="text-xs">
										Position: {match.index}
									</Badge>
								</div>
								{#if match.length > 1}
									<div class="text-muted-foreground mt-1 text-xs">
										Groups: {match
											.slice(1)
											.map((group, i) => `$${i + 1}: "${group}"`)
											.join(', ')}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Actions -->
			<div class="flex gap-2">
				<Button onclick={testRegex} disabled={!pattern.trim()}>Test Regex</Button>
				<Button variant="outline" onclick={clearAll}>Clear All</Button>
				{#if pattern}
					<Button variant="secondary" onclick={copyPattern}>Copy Pattern</Button>
				{/if}
				{#if matches.length > 0}
					<Button variant="secondary" onclick={copyMatches}>Copy Matches</Button>
				{/if}
			</div>

			<!-- Help -->
			<div class="text-muted-foreground space-y-1 text-xs">
				<p>
					<strong>Common flags:</strong> g (global), i (case-insensitive), m (multiline), s (dotall)
				</p>
				<p><strong>Tip:</strong> Use capture groups () to extract parts of matches</p>
			</div>
		</CardContent>
	</Card>
</div>
