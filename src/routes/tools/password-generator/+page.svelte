<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

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
		toast.success('Password copied to clipboard');
	}
</script>

<div class="flex h-full items-center justify-center p-3">
	<div class="flex flex-col gap-3">
		<Input
			id="password"
			class="opacity-75 blur-xs hover:opacity-100 focus:opacity-100 focus:blur-none"
		/>
		<div class="flex w-full flex-row gap-3">
			<Button onclick={generatePassword} class="flex-1">Generate</Button>
			<Button onclick={copyPassword} class="flex-1">Copy</Button>
		</div>
	</div>
</div>
