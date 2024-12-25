<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	let categories = ['distance', 'temperature', 'angle', 'storage', 'duration'];
	let unitsMap: Record<string, string[]> = {
		distance: ['m', 'km', 'mi'],
		temperature: ['C', 'F'],
		angle: ['deg', 'rad'],
		storage: ['MB', 'GB', 'TB'],
		duration: ['s', 'min', 'h']
	};

	let category = 'distance';
	let fromUnit = unitsMap[category][0];
	let toUnit = unitsMap[category][1];
	let inputValue = '';
	let outputValue = '';

	function convert() {
		const value = parseFloat(inputValue);
		if (isNaN(value)) {
			outputValue = 'Invalid input - please enter a valid number.';
			return;
		}
		switch (category) {
			case 'distance':
				if (fromUnit === 'm' && toUnit === 'km') outputValue = (value / 1000).toString();
				else if (fromUnit === 'km' && toUnit === 'm') outputValue = (value * 1000).toString();
				else outputValue = value.toString();
				break;
			case 'temperature':
				if (fromUnit === 'C' && toUnit === 'F') outputValue = ((value * 9) / 5 + 32).toString();
				else if (fromUnit === 'F' && toUnit === 'C')
					outputValue = (((value - 32) * 5) / 9).toString();
				else outputValue = value.toString();
				break;
			case 'angle':
				if (fromUnit === 'deg' && toUnit === 'rad')
					outputValue = ((value * Math.PI) / 180).toString();
				else if (fromUnit === 'rad' && toUnit === 'deg')
					outputValue = ((value * 180) / Math.PI).toString();
				else outputValue = value.toString();
				break;
			case 'storage':
				if (fromUnit === 'MB' && toUnit === 'GB') outputValue = (value / 1024).toString();
				else if (fromUnit === 'GB' && toUnit === 'TB') outputValue = (value / 1024).toString();
				else outputValue = value.toString();
				break;
			case 'duration':
				if (fromUnit === 's' && toUnit === 'min') outputValue = (value / 60).toString();
				else if (fromUnit === 'min' && toUnit === 'h') outputValue = (value / 60).toString();
				else outputValue = value.toString();
				break;
		}
	}
</script>

<!-- ...existing code... -->
<div class="flex flex-col gap-4">
	<Select.Root
		bind:value={category}
		type="single"
		on:valueChange={(e: CustomEvent<string>) => {
			category = e.detail;
			fromUnit = unitsMap[category][0];
			toUnit = unitsMap[category][1];
			inputValue = '';
			outputValue = '';
		}}
	>
		<Select.Trigger class="w-[180px]">
			{category}
		</Select.Trigger>
		<Select.Content>
			{#each categories as c}
				<Select.Item value={c}>{c}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Select.Root
		bind:value={fromUnit}
		type="single"
		on:valueChange={(e: CustomEvent<string>) => (fromUnit = e.detail)}
	>
		<Select.Trigger class="w-[100px]">{fromUnit}</Select.Trigger>
		<Select.Content>
			{#each unitsMap[category] as u}
				<Select.Item value={u}>{u}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Select.Root
		bind:value={toUnit}
		type="single"
		on:valueChange={(e: CustomEvent<string>) => (toUnit = e.detail)}
	>
		<Select.Trigger class="w-[100px]">{toUnit}</Select.Trigger>
		<Select.Content>
			{#each unitsMap[category] as u}
				<Select.Item value={u}>{u}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Input type="number" placeholder="Value" bind:value={inputValue} />

	<Button variant="outline" onclick={convert}>Convert</Button>

	<div>Result: {outputValue}</div>
</div>
