<script lang="ts">
	import { testStore } from '$lib/state';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

{$testStore}

<Switch bind:checked={$testStore} />

<Button onclick={() => testStore.set(!$testStore)}>Toggle</Button>
