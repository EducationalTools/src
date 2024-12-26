<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex h-full flex-col items-center justify-center gap-3">
	<span class="text-6xl">{page.status}</span>
	<span class="text-3xl">{page.error?.message}</span>
	<Button variant="outline" href="/">Go home</Button>
</div>
