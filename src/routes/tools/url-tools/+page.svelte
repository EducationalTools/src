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
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	let inputUrl = $state('');
	let outputUrl = $state('');
	let error = $state('');
	let loading = $state(false);

	function isValidUrl(string: string): boolean {
		try {
			new URL(string);
			return true;
		} catch (_) {
			return false;
		}
	}

	async function shortenUrl() {
		if (!inputUrl.trim()) return;

		if (!isValidUrl(inputUrl)) {
			error = 'Please enter a valid URL (including http:// or https://)';
			return;
		}

		loading = true;
		error = '';

		try {
			// Using TinyURL API for simplicity
			const response = await fetch(
				`https://tinyurl.com/api-create.php?url=${encodeURIComponent(inputUrl)}`
			);
			const shortUrl = await response.text();

			if (shortUrl.startsWith('https://tinyurl.com/')) {
				outputUrl = shortUrl;
			} else {
				error = 'Failed to shorten URL. Please try again.';
			}
		} catch (e) {
			error = 'Network error. Please check your connection and try again.';
		} finally {
			loading = false;
		}
	}

	async function expandUrl() {
		if (!inputUrl.trim()) return;

		if (!isValidUrl(inputUrl)) {
			error = 'Please enter a valid URL';
			return;
		}

		loading = true;
		error = '';

		try {
			// For URL expansion, we'll use a simple fetch to follow redirects
			const response = await fetch(
				`https://httpbin.org/redirect-to?url=${encodeURIComponent(inputUrl)}`,
				{
					method: 'HEAD',
					redirect: 'follow'
				}
			);

			outputUrl = response.url;
		} catch (e) {
			// Fallback: just show the input URL as many short URLs don't allow CORS
			outputUrl = inputUrl;
			error =
				'Could not expand URL due to CORS restrictions. The URL might be valid but cannot be expanded in the browser.';
		} finally {
			loading = false;
		}
	}

	function clearAll() {
		inputUrl = '';
		outputUrl = '';
		error = '';
	}

	function copyToClipboard() {
		if (outputUrl) {
			navigator.clipboard.writeText(outputUrl);
		}
	}

	function analyzeUrl() {
		if (!inputUrl.trim() || !isValidUrl(inputUrl)) return null;

		try {
			const url = new URL(inputUrl);
			return {
				protocol: url.protocol,
				hostname: url.hostname,
				pathname: url.pathname,
				search: url.search,
				hash: url.hash,
				port: url.port
			};
		} catch {
			return null;
		}
	}

	const urlAnalysis = $derived(() => analyzeUrl());
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-4xl">
		<CardHeader>
			<CardTitle>URL Tools</CardTitle>
			<CardDescription>Shorten URLs, expand short URLs, and analyze URL components</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<Tabs value="shorten" class="w-full">
				<TabsList class="grid w-full grid-cols-3">
					<TabsTrigger value="shorten">Shorten</TabsTrigger>
					<TabsTrigger value="expand">Expand</TabsTrigger>
					<TabsTrigger value="analyze">Analyze</TabsTrigger>
				</TabsList>

				<TabsContent value="shorten" class="space-y-4">
					<div>
						<Input
							bind:value={inputUrl}
							placeholder="Enter URL to shorten (e.g., https://example.com/very/long/url)"
							class="w-full"
						/>
					</div>
					<Button onclick={shortenUrl} disabled={!inputUrl.trim() || loading}>
						{loading ? 'Shortening...' : 'Shorten URL'}
					</Button>
				</TabsContent>

				<TabsContent value="expand" class="space-y-4">
					<div>
						<Input
							bind:value={inputUrl}
							placeholder="Enter short URL to expand (e.g., https://tinyurl.com/example)"
							class="w-full"
						/>
					</div>
					<Button onclick={expandUrl} disabled={!inputUrl.trim() || loading}>
						{loading ? 'Expanding...' : 'Expand URL'}
					</Button>
				</TabsContent>

				<TabsContent value="analyze" class="space-y-4">
					<div>
						<Input
							bind:value={inputUrl}
							placeholder="Enter URL to analyze (e.g., https://example.com:8080/path?query=value#section)"
							class="w-full"
						/>
					</div>

					{#if urlAnalysis()}
						<div class="space-y-2">
							<h3 class="text-lg font-semibold">URL Components:</h3>
							<div class="grid gap-2 text-sm">
								<div class="bg-muted flex items-center justify-between rounded p-2">
									<span class="font-medium">Protocol:</span>
									<Badge variant="outline">{urlAnalysis()?.protocol}</Badge>
								</div>
								<div class="bg-muted flex items-center justify-between rounded p-2">
									<span class="font-medium">Hostname:</span>
									<Badge variant="outline">{urlAnalysis()?.hostname}</Badge>
								</div>
								{#if urlAnalysis()?.port}
									<div class="bg-muted flex items-center justify-between rounded p-2">
										<span class="font-medium">Port:</span>
										<Badge variant="outline">{urlAnalysis()?.port}</Badge>
									</div>
								{/if}
								{#if urlAnalysis()?.pathname && urlAnalysis()?.pathname !== '/'}
									<div class="bg-muted flex items-center justify-between rounded p-2">
										<span class="font-medium">Path:</span>
										<Badge variant="outline" class="max-w-xs truncate"
											>{urlAnalysis()?.pathname}</Badge
										>
									</div>
								{/if}
								{#if urlAnalysis()?.search}
									<div class="bg-muted flex items-center justify-between rounded p-2">
										<span class="font-medium">Query:</span>
										<Badge variant="outline" class="max-w-xs truncate"
											>{urlAnalysis()?.search}</Badge
										>
									</div>
								{/if}
								{#if urlAnalysis()?.hash}
									<div class="bg-muted flex items-center justify-between rounded p-2">
										<span class="font-medium">Fragment:</span>
										<Badge variant="outline" class="max-w-xs truncate">{urlAnalysis()?.hash}</Badge>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</TabsContent>
			</Tabs>

			<div class="flex gap-2">
				<Button variant="outline" onclick={clearAll}>Clear All</Button>
				{#if outputUrl}
					<Button variant="secondary" onclick={copyToClipboard}>Copy Result</Button>
				{/if}
			</div>

			{#if error}
				<div class="text-destructive bg-destructive/10 rounded border p-3">
					{error}
				</div>
			{/if}

			{#if outputUrl && outputUrl !== inputUrl}
				<div>
					<h3 class="mb-2 text-lg font-semibold">Result:</h3>
					<div class="bg-muted rounded border p-3 break-all">
						<a
							href={outputUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline"
						>
							{outputUrl}
						</a>
					</div>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>
