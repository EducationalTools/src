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
	import md5 from 'md5';

	let inputText = $state('');
	let hashes = $state<Record<string, string>>({});

	// Simple hash functions
	async function generateSHA256(text: string): Promise<string> {
		const encoder = new TextEncoder();
		const data = encoder.encode(text);
		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	}

	async function generateSHA1(text: string): Promise<string> {
		const encoder = new TextEncoder();
		const data = encoder.encode(text);
		const hashBuffer = await crypto.subtle.digest('SHA-1', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	}

	function generateMD5(text: string): string {
		return md5(text);
	}

	// Simple CRC32 implementation
	function generateCRC32(text: string): string {
		const crcTable = [];
		for (let i = 0; i < 256; i++) {
			let c = i;
			for (let j = 0; j < 8; j++) {
				c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
			}
			crcTable[i] = c;
		}

		let crc = 0 ^ -1;
		for (let i = 0; i < text.length; i++) {
			crc = (crc >>> 8) ^ crcTable[(crc ^ text.charCodeAt(i)) & 0xff];
		}
		return ((crc ^ -1) >>> 0).toString(16).toUpperCase().padStart(8, '0');
	}

	async function generateAllHashes() {
		if (!inputText.trim()) {
			hashes = {};
			return;
		}

		const newHashes: Record<string, string> = {};

		// Generate all hashes
		newHashes.MD5 = generateMD5(inputText);
		newHashes.SHA1 = await generateSHA1(inputText);
		newHashes.SHA256 = await generateSHA256(inputText);
		newHashes.CRC32 = generateCRC32(inputText);

		hashes = newHashes;
	}

	function clearAll() {
		inputText = '';
		hashes = {};
	}

	function copyToClipboard(value: string) {
		navigator.clipboard.writeText(value);
	}

	// Auto-generate hashes when input changes
	$effect(() => {
		generateAllHashes();
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-4xl">
		<CardHeader>
			<CardTitle>Hash Generator</CardTitle>
			<CardDescription>Generate MD5, SHA1, SHA256, and CRC32 hashes from text</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div>
				<Textarea
					bind:value={inputText}
					placeholder="Enter text to generate hashes..."
					class="min-h-[150px]"
				/>
			</div>

			<div class="flex gap-2">
				<Button onclick={generateAllHashes} disabled={!inputText.trim()}>Generate Hashes</Button>
				<Button variant="outline" onclick={clearAll}>Clear All</Button>
			</div>

			{#if Object.keys(hashes).length > 0}
				<div class="space-y-4">
					<h3 class="text-lg font-semibold">Generated Hashes:</h3>

					{#each Object.entries(hashes) as [algorithm, hash]}
						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<Badge variant="secondary" class="text-sm font-medium">{algorithm}</Badge>
								<Button size="sm" variant="ghost" onclick={() => copyToClipboard(hash)}>
									Copy
								</Button>
							</div>
							<div class="bg-muted rounded border p-3 font-mono text-sm break-all">
								{hash}
							</div>
						</div>
					{/each}
				</div>
			{/if}

			{#if inputText.trim()}
				<div class="text-muted-foreground text-sm">
					<p><strong>Input length:</strong> {inputText.length} characters</p>
					<p><strong>Input bytes:</strong> {new TextEncoder().encode(inputText).length} bytes</p>
				</div>
			{/if}

			<div class="text-muted-foreground space-y-1 text-xs">
				<p><strong>Hash Information:</strong></p>
				<ul class="ml-2 list-inside list-disc space-y-1">
					<li>
						<strong>MD5:</strong> 128-bit hash, commonly used but not cryptographically secure
					</li>
					<li><strong>SHA1:</strong> 160-bit hash, deprecated for cryptographic use</li>
					<li>
						<strong>SHA256:</strong> 256-bit hash, part of SHA-2 family, cryptographically secure
					</li>
					<li>
						<strong>CRC32:</strong> 32-bit checksum, used for error detection, not cryptographically
						secure
					</li>
				</ul>
			</div>
		</CardContent>
	</Card>
</div>
