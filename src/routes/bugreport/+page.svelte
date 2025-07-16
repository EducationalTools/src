<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	const id = $props.id();
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
	<h1 class="text-3xl">Bug Report</h1>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="brief-description-{id}">Brief Description</Label>
		<Input type="text" id="brief-description-{id}" />
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="description-{id}">Describe the bug</Label>
		<p class="text-muted-foreground text-sm">A clear and concise description of what the bug is.</p>
		<Textarea id="description-{id}"></Textarea>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="reproduction-{id}">How could you reproduce this issue?</Label>
		<p class="text-muted-foreground text-sm">
			Please provide a step-by-step guide on how to reproduce this issue.
		</p>
		<Textarea id="reproduction-{id}"></Textarea>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="expected-{id}">What did you expect to happen?</Label>
		<p class="text-muted-foreground text-sm">
			A clear and concise description of what you expected to happen.
		</p>
		<Textarea id="expected-{id}"></Textarea>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="log-{id}">Relevant log output</Label>
		<p class="text-muted-foreground text-sm">
			Please copy and paste any relevant log output. This will be automatically formatted into code,
			so no need for backticks.
		</p>
		<Textarea id="log-{id}"></Textarea>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="additional-{id}">Additional information</Label>
		<Textarea id="additional-{id}"></Textarea>
	</div>
</div>
