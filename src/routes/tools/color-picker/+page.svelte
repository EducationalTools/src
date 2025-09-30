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
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { toast } from 'svelte-sonner';
	import Copy from '@lucide/svelte/icons/copy';

	let selectedColor = $state('#3b82f6');
	let colorHistory = $state<string[]>([]);

	// Convert hex to RGB
	function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				}
			: null;
	}

	// Convert RGB to HSL
	function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0,
			s = 0,
			l = (max + min) / 2;

		if (max === min) {
			h = s = 0; // achromatic
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return {
			h: Math.round(h * 360),
			s: Math.round(s * 100),
			l: Math.round(l * 100)
		};
	}

	const rgb = $derived(() => hexToRgb(selectedColor));
	const hsl = $derived(() => {
		const rgbValue = rgb();
		return rgbValue ? rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b) : null;
	});

	function addToHistory() {
		if (!colorHistory.includes(selectedColor)) {
			colorHistory = [selectedColor, ...colorHistory.slice(0, 9)]; // Keep last 10
		}
	}

	function copyToClipboard(value: string) {
		navigator.clipboard.writeText(value);
		toast.success('Color value copied to clipboard');
	}

	function generateRandomColor() {
		selectedColor =
			'#' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0');
		addToHistory();
	}

	// Generate complementary colors
	const complementaryColors = $derived(() => {
		const rgbValue = rgb();
		if (!rgbValue) return [];

		return [
			`#${(255 - rgbValue.r).toString(16).padStart(2, '0')}${(255 - rgbValue.g).toString(16).padStart(2, '0')}${(255 - rgbValue.b).toString(16).padStart(2, '0')}`
		];
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<Card class="w-full max-w-4xl">
		<CardHeader>
			<CardTitle>Color Picker & Palette</CardTitle>
			<CardDescription>Pick colors and get values in different formats</CardDescription>
		</CardHeader>
		<CardContent class="space-y-6">
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<!-- Color Picker Section -->
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<button
							class="h-24 w-24 cursor-pointer rounded-lg border-2 border-gray-300"
							style="background-color: {selectedColor}"
							onclick={() => document.getElementById('colorInput')?.click()}
							aria-label="Open color picker"
						></button>
						<input
							id="colorInput"
							type="color"
							bind:value={selectedColor}
							onchange={addToHistory}
							class="sr-only"
						/>
						<div class="flex flex-col gap-2">
							<Input
								bind:value={selectedColor}
								placeholder="#000000"
								onchange={addToHistory}
								class="font-mono"
							/>
							<Button onclick={generateRandomColor} variant="outline">Random Color</Button>
						</div>
					</div>
				</div>

				<!-- Color Values Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold">Color Values</h3>

					<div class="space-y-2">
						<div class="bg-muted flex items-center justify-between rounded p-2">
							<span class="font-mono text-sm">HEX:</span>
							<div class="flex items-center gap-2">
								<Badge variant="outline" class="font-mono">{selectedColor.toUpperCase()}</Badge>
								<Button size="sm" variant="ghost" onclick={() => copyToClipboard(selectedColor)}>
									<Copy class="h-4 w-4" />
								</Button>
							</div>
						</div>

						{#if rgb()}
							<div class="bg-muted flex items-center justify-between rounded p-2">
								<span class="font-mono text-sm">RGB:</span>
								<div class="flex items-center gap-2">
									<Badge variant="outline" class="font-mono"
										>rgb({rgb()?.r}, {rgb()?.g}, {rgb()?.b})</Badge
									>
									<Button
										size="sm"
										variant="ghost"
										onclick={() => copyToClipboard(`rgb(${rgb()?.r}, ${rgb()?.g}, ${rgb()?.b})`)}
									>
										<Copy class="h-4 w-4" />
									</Button>
								</div>
							</div>
						{/if}

						{#if hsl()}
							<div class="bg-muted flex items-center justify-between rounded p-2">
								<span class="font-mono text-sm">HSL:</span>
								<div class="flex items-center gap-2">
									<Badge variant="outline" class="font-mono"
										>hsl({hsl()?.h}, {hsl()?.s}%, {hsl()?.l}%)</Badge
									>
									<Button
										size="sm"
										variant="ghost"
										onclick={() => copyToClipboard(`hsl(${hsl()?.h}, ${hsl()?.s}%, ${hsl()?.l}%)`)}
									>
										<Copy class="h-4 w-4" />
									</Button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Complementary Colors -->
			{#if complementaryColors().length > 0}
				<div>
					<h3 class="mb-3 text-lg font-semibold">Complementary Color</h3>
					<div class="flex gap-2">
						{#each complementaryColors() as color}
							<button
								class="h-16 w-16 cursor-pointer rounded border"
								style="background-color: {color}"
								onclick={() => {
									selectedColor = color;
									addToHistory();
								}}
								title={color}
								aria-label="Select color {color}"
							></button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Color History -->
			{#if colorHistory.length > 0}
				<div>
					<h3 class="mb-3 text-lg font-semibold">Recent Colors</h3>
					<div class="flex flex-wrap gap-2">
						{#each colorHistory as color}
							<button
								class="h-12 w-12 cursor-pointer rounded border"
								style="background-color: {color}"
								onclick={() => (selectedColor = color)}
								title={color}
								aria-label="Select recent color {color}"
							></button>
						{/each}
					</div>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>
