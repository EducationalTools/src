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

	let markdownText = $state(`# Markdown Preview

Welcome to the **Markdown Preview** tool!

## Features

- Live preview of your markdown
- Support for common markdown syntax
- Easy copy functionality

### Text Formatting

You can make text *italic*, **bold**, or ***both***.

### Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Code

Inline code: \`console.log('Hello World')\`

Code block:
\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### Links and Images

[Visit Google](https://google.com)

### Blockquotes

> This is a blockquote
> It can span multiple lines

### Tables

| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |

---

### Horizontal Rule

That's a horizontal rule above this text.
`);

	let htmlOutput = $state('');

	// Simple markdown to HTML converter
	function convertMarkdownToHtml(markdown: string): string {
		let html = markdown;

		// Headers
		html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
		html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
		html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

		// Bold and Italic
		html = html.replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>');
		html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
		html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

		// Code blocks
		html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>');

		// Inline code
		html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

		// Links
		html = html.replace(
			/\[([^\]]+)\]\(([^)]+)\)/gim,
			'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
		);

		// Horizontal rules
		html = html.replace(/^---$/gim, '<hr>');

		// Tables (simplified)
		const tableRegex = /^\|(.+)\|\n\|(.+)\|\n((?:\|.+\|\n?)*)/gm;
		html = html.replace(tableRegex, (match, header, separator, rows) => {
			const headerCells = header
				.split('|')
				.map((cell: string) => `<th>${cell.trim()}</th>`)
				.join('');
			const rowLines = rows.trim().split('\n');
			const rowCells = rowLines
				.map((row: string) => {
					const cells = row
						.split('|')
						.map((cell: string) => `<td>${cell.trim()}</td>`)
						.join('');
					return `<tr>${cells}</tr>`;
				})
				.join('');
			return `<table class="border-collapse border border-gray-300"><thead><tr>${headerCells}</tr></thead><tbody>${rowCells}</tbody></table>`;
		});

		// Blockquotes
		html = html.replace(/^> (.+$)/gim, '<blockquote>$1</blockquote>');

		// Lists
		html = html.replace(/^\* (.+$)/gim, '<li>$1</li>');
		html = html.replace(/^\d+\. (.+$)/gim, '<li>$1</li>');

		// Wrap consecutive <li> items in <ul> or <ol>
		html = html.replace(/(<li>.*<\/li>)\n(?=<li>)/gim, '$1');
		html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

		// Line breaks
		html = html.replace(/\n/gim, '<br>');

		// Clean up multiple <br> tags
		html = html.replace(/(<br>){3,}/gim, '<br><br>');

		return html;
	}

	function updatePreview() {
		htmlOutput = convertMarkdownToHtml(markdownText);
	}

	function copyMarkdown() {
		navigator.clipboard.writeText(markdownText);
	}

	function copyHtml() {
		navigator.clipboard.writeText(htmlOutput);
	}

	function clearAll() {
		markdownText = '';
		htmlOutput = '';
	}

	// Update preview when markdown changes
	$effect(() => {
		updatePreview();
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="h-[80vh] w-full max-w-6xl">
		<CardHeader>
			<CardTitle>Markdown Preview</CardTitle>
			<CardDescription>Write markdown and see the live preview</CardDescription>
		</CardHeader>
		<CardContent class="h-full space-y-4">
			<Tabs value="split" class="flex h-full flex-col">
				<div class="flex items-center justify-between">
					<TabsList>
						<TabsTrigger value="split">Split View</TabsTrigger>
						<TabsTrigger value="markdown">Markdown Only</TabsTrigger>
						<TabsTrigger value="preview">Preview Only</TabsTrigger>
					</TabsList>

					<div class="flex gap-2">
						<Button size="sm" variant="outline" onclick={copyMarkdown}>Copy Markdown</Button>
						<Button size="sm" variant="outline" onclick={copyHtml}>Copy HTML</Button>
						<Button size="sm" variant="outline" onclick={clearAll}>Clear</Button>
					</div>
				</div>

				<TabsContent value="split" class="grid h-full flex-1 grid-cols-2 gap-4">
					<div class="flex h-full flex-col">
						<h3 class="mb-2 text-sm font-medium">Markdown Input:</h3>
						<Textarea
							bind:value={markdownText}
							placeholder="Enter your markdown here..."
							class="flex-1 font-mono text-sm"
						/>
					</div>
					<div class="flex h-full flex-col">
						<h3 class="mb-2 text-sm font-medium">Live Preview:</h3>
						<div
							class="bg-background prose prose-sm max-w-none flex-1 overflow-auto rounded-md border p-4"
						>
							{@html htmlOutput}
						</div>
					</div>
				</TabsContent>

				<TabsContent value="markdown" class="h-full flex-1">
					<Textarea
						bind:value={markdownText}
						placeholder="Enter your markdown here..."
						class="h-full font-mono text-sm"
					/>
				</TabsContent>

				<TabsContent value="preview" class="h-full flex-1">
					<div
						class="bg-background prose prose-sm h-full max-w-none overflow-auto rounded-md border p-4"
					>
						{@html htmlOutput}
					</div>
				</TabsContent>
			</Tabs>
		</CardContent>
	</Card>
</div>

<style>
	:global(.prose h1) { 
		font-size: 1.5rem; 
		font-weight: bold; 
		margin-bottom: 1rem; 
	}
	:global(.prose h2) { 
		font-size: 1.25rem; 
		font-weight: bold; 
		margin-bottom: 0.75rem; 
	}
	:global(.prose h3) { 
		font-size: 1.125rem; 
		font-weight: bold; 
		margin-bottom: 0.5rem; 
	}
	:global(.prose p) { 
		margin-bottom: 1rem; 
	}
	:global(.prose ul) { 
		margin-bottom: 1rem; 
		padding-left: 1.25rem; 
		list-style-type: disc; 
	}
	:global(.prose ol) { 
		margin-bottom: 1rem; 
		padding-left: 1.25rem; 
		list-style-type: decimal; 
	}
	:global(.prose li) { 
		margin-bottom: 0.25rem; 
	}
	:global(.prose blockquote) { 
		margin-bottom: 1rem; 
		border-left: 4px solid #d1d5db; 
		padding-left: 1rem; 
		font-style: italic; 
	}
	:global(.prose code) { 
		border-radius: 0.25rem; 
		background-color: #f3f4f6; 
		padding: 0.125rem 0.25rem; 
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', monospace; 
		font-size: 0.875rem; 
	}
	:global(.prose pre) { 
		margin-bottom: 1rem; 
		overflow: auto; 
		border-radius: 0.25rem; 
		background-color: #f3f4f6; 
		padding: 1rem; 
	}
	:global(.prose pre code) { 
		background-color: transparent; 
		padding: 0; 
	}
	:global(.prose a) { 
		color: #2563eb; 
		text-decoration: none; 
	}
	:global(.prose a:hover) { 
		text-decoration: underline; 
	}
	:global(.prose hr) { 
		margin: 1.5rem 0; 
		border-top: 1px solid #d1d5db; 
		border-bottom: none; 
		border-left: none; 
		border-right: none; 
	}
	:global(.prose table) { 
		margin-bottom: 1rem; 
		width: 100%; 
		border-collapse: collapse; 
		border: 1px solid #d1d5db; 
	}
	:global(.prose th) { 
		border: 1px solid #d1d5db; 
		padding: 0.5rem 1rem; 
		background-color: #f3f4f6; 
		font-weight: bold; 
	}
	:global(.prose td) { 
		border: 1px solid #d1d5db; 
		padding: 0.5rem 1rem; 
	}
</style>
