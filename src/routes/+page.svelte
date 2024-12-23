<script lang="ts">
	import { testStore } from '$lib/state';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let test: boolean;

	testStore.subscribe(($store) => {
		test = $store;
	});
</script>

<Button
	onclick={function () {
		testStore.set(true);
	}}>true</Button
>
<Button
	onclick={function () {
		testStore.set(false);
	}}>false</Button
>
<span>{test}</span>
