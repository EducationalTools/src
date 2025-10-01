<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	let display = $state('0');
	let firstNumber = '';
	let operator = '';
	let newNumber = true;

	function handleNumber(num: string) {
		if (newNumber) {
			display = num;
			newNumber = false;
		} else {
			display = display === '0' ? num : display + num;
		}
	}

	function handleOperator(op: string) {
		firstNumber = display;
		operator = op;
		newNumber = true;
	}

	function calculate() {
		const num1 = parseFloat(firstNumber);
		const num2 = parseFloat(display);
		let result = 0;

		switch (operator) {
			case '+':
				result = num1 + num2;
				break;
			case '-':
				result = num1 - num2;
				break;
			case '*':
				result = num1 * num2;
				break;
			case '/':
				result = num1 / num2;
				break;
		}

		display = result.toString();
		newNumber = true;
	}

	function clear() {
		display = '0';
		firstNumber = '';
		operator = '';
		newNumber = true;
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	<div class="flex flex-col gap-2">
		<div class="mb-2 w-fit rounded p-4 text-right text-2xl">{display}</div>

		<div class="flex gap-2">
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('7')}>7</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('8')}>8</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('9')}>9</Button>
			<Button variant="secondary" class="flex-grow" onclick={() => handleOperator('/')}>/</Button>
		</div>

		<div class="flex gap-2">
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('4')}>4</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('5')}>5</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('6')}>6</Button>
			<Button variant="secondary" class="flex-grow" onclick={() => handleOperator('*')}>*</Button>
		</div>

		<div class="flex gap-2">
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('1')}>1</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('2')}>2</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('3')}>3</Button>
			<Button variant="secondary" class="flex-grow" onclick={() => handleOperator('-')}>-</Button>
		</div>

		<div class="flex gap-2">
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('0')}>0</Button>
			<Button variant="outline" class="flex-grow" onclick={() => handleNumber('.')}>.</Button>
			<Button variant="secondary" class="flex-grow" onclick={calculate}>=</Button>
			<Button variant="secondary" class="flex-grow" onclick={() => handleOperator('+')}>+</Button>
		</div>

		<Button variant="destructive" onclick={clear}>Clear</Button>
	</div>
</div>
