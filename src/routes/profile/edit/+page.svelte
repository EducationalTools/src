<script lang="ts">
	import { api } from '$convex/_generated/api';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import { useQuery } from 'convex-svelte';

	const profile = useQuery(api.profiles.getCurrent, {});
	const user = useQuery(api.auth.getCurrentUser, {});

	const id = $props.id();
</script>

<div class="mx-auto w-full max-w-2xl p-4">
	<div class="bg-card flex w-full flex-col gap-4 rounded-xl border p-4">
		<form action="" class="flex flex-col gap-4">
			<div class=" grid grid-cols-2 gap-4">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="name-{id}">Display Name</Label>
					<Input required type="text" id="name-{id}" placeholder="This is how you will appear" />
				</div>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="pronouns-{id}">Pronouns</Label>
					<Input type="text" id="pronouns-{id}" />
				</div>
			</div>
			<div class="grid w-full gap-1.5">
				<Label for="bio-{id}">Bio</Label>
				<Textarea placeholder="Write something about you I guess" id="bio-{id}" />
			</div>
			<Button>Save</Button>
		</form>
	</div>
</div>
