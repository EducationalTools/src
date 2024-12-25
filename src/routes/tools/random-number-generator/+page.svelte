<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	let min: number = 1;
	let max: number = 100;
	let random: number = 0;

	function generate() {
		random = Math.floor(Math.random() * (max - min + 1)) + min;
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-3">
	<div class="flex flex-col gap-3">
		<h1 class="rounded border p-10 text-center text-4xl font-bold">{random}</h1>

		<div class="flex items-center gap-3">
			<Input type="number" class="w-full" bind:value={min} placeholder="Min" />
			-
			<Input type="number" class="w-full" bind:value={max} placeholder="Max" />
		</div>
		<Button onclick={generate} class="w-full">Generate</Button>
	</div>
</div>
