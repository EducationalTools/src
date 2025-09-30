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

	let text = $state('');
	let qrCodeUrl = $state('');

	function generateQRCode() {
		if (text.trim()) {
			// Using QR Server API for simplicity - free and no API key required
			const encodedText = encodeURIComponent(text);
			qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}`;
		}
	}

	function clearAll() {
		text = '';
		qrCodeUrl = '';
	}

	function downloadQR() {
		if (qrCodeUrl) {
			const link = document.createElement('a');
			link.href = qrCodeUrl;
			link.download = 'qrcode.png';
			link.click();
		}
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-2xl">
		<CardHeader>
			<CardTitle>QR Code Generator</CardTitle>
			<CardDescription>Generate QR codes from text, URLs, or any other data</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div>
				<Textarea
					bind:value={text}
					placeholder="Enter text, URL, or any data to encode..."
					class="min-h-[100px]"
				/>
			</div>

			<div class="flex gap-2">
				<Button onclick={generateQRCode} disabled={!text.trim()}>Generate QR Code</Button>
				<Button variant="outline" onclick={clearAll}>Clear</Button>
			</div>

			{#if qrCodeUrl}
				<div class="flex flex-col items-center space-y-4">
					<img src={qrCodeUrl} alt="Generated QR Code" class="rounded border" />
					<Button variant="secondary" onclick={downloadQR}>Download QR Code</Button>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>
