<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { onMount } from 'svelte';
	onMount(() => {
		generatePassword();
	});

	function generatePassword() {
		let password = '';
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?';
		const charactersLength = characters.length;
		for (let i = 0; i < 30; i++) {
			password += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		const input = document.querySelector('#password') as HTMLInputElement;
		if (!input) return;
		input.value = password;
	}

	function copyPassword() {
		const input = document.querySelector('#password') as HTMLInputElement;
		if (!input) return;
		const password = input.value;
		navigator.clipboard.writeText(password);
	}
</script>

<div class="flex h-full flex-row items-center justify-center gap-3 p-3">
	<Input
		id="password"
		class="bg-white text-black blur-lg duration-300 hover:blur-sm focus:bg-transparent focus:text-white focus:blur-0"
	/>
	<Button onclick={generatePassword}>Generate</Button>
	<Button onclick={copyPassword}>Copy</Button>
</div>
