<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	let categories = ['distance', 'temperature', 'angle', 'storage', 'duration'];
	let unitsMap: Record<string, string[]> = {
		distance: ['m', 'km', 'mi'],
		temperature: ['C', 'F'],
		angle: ['deg', 'rad'],
		storage: ['MB', 'GB', 'TB'],
		duration: ['s', 'min', 'h']
	};

	let selectedCategory = 'distance';
	let selectedFromUnit = 'm';
	let selectedToUnit = 'km';
	let inputValue = '';
	let outputValue = '';

	// Reactive statement to handle category changes
	$: if (selectedCategory) {
		selectedFromUnit = unitsMap[selectedCategory][0];
		selectedToUnit = unitsMap[selectedCategory][1];
		inputValue = '';
		outputValue = '';
	}

	function convert() {
		const value = parseFloat(inputValue);
		if (isNaN(value)) {
			outputValue = 'Invalid input - please enter a valid number.';
			return;
		}
		switch (selectedCategory) {
			case 'distance':
				if (selectedFromUnit === 'm' && selectedToUnit === 'km') outputValue = (value / 1000).toString();
				else if (selectedFromUnit === 'km' && selectedToUnit === 'm') outputValue = (value * 1000).toString();
				else outputValue = value.toString();
				break;
			case 'temperature':
				if (selectedFromUnit === 'C' && selectedToUnit === 'F') outputValue = ((value * 9) / 5 + 32).toString();
				else if (selectedFromUnit === 'F' && selectedToUnit === 'C')
					outputValue = (((value - 32) * 5) / 9).toString();
				else outputValue = value.toString();
				break;
			case 'angle':
				if (selectedFromUnit === 'deg' && selectedToUnit === 'rad')
					outputValue = ((value * Math.PI) / 180).toString();
				else if (selectedFromUnit === 'rad' && selectedToUnit === 'deg')
					outputValue = ((value * 180) / Math.PI).toString();
				else outputValue = value.toString();
				break;
			case 'storage':
				if (selectedFromUnit === 'MB' && selectedToUnit === 'GB') outputValue = (value / 1024).toString();
				else if (selectedFromUnit === 'GB' && selectedToUnit === 'TB') outputValue = (value / 1024).toString();
				else outputValue = value.toString();
				break;
			case 'duration':
				if (selectedFromUnit === 's' && selectedToUnit === 'min') outputValue = (value / 60).toString();
				else if (selectedFromUnit === 'min' && selectedToUnit === 'h') outputValue = (value / 60).toString();
				else outputValue = value.toString();
				break;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="flex w-96 flex-col gap-4 shadow-md">
		<div class="flex flex-col gap-4">
			<select bind:value={selectedCategory} class="w-full rounded-md border border-input px-3 py-2">
				{#each categories as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
			<div class="flex flex-row gap-3">
				<select bind:value={selectedFromUnit} class="w-full rounded-md border border-input px-3 py-2">
					{#each unitsMap[selectedCategory] as u}
						<option value={u}>{u}</option>
					{/each}
				</select>
				<select bind:value={selectedToUnit} class="w-full rounded-md border border-input px-3 py-2">
					{#each unitsMap[selectedCategory] as u}
						<option value={u}>{u}</option>
					{/each}
				</select>
			</div>

			<Input type="number" placeholder="Value" bind:value={inputValue} />

			<Button variant="outline" onclick={convert}>Convert</Button>

			<div>Result: {outputValue}</div>
		</div>
	</div>
</div>
