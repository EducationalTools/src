export const prerender = false;
import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { onMount } from 'svelte';

onMount(() => {
	if (browser) {
		posthog.init('phc_jg4gOdigfHQD4MSgrSaO883dp2LjNJbJO7azv61UtI0', {
			api_host: 'https://us.i.posthog.com',
			person_profiles: 'always'
		});
	}
});
