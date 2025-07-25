import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { persisted } from 'svelte-persisted-store';

export const trackerDialogClosed = persisted('trackerDialogClosed', false);

export function initializeAnalytics() {
	if (!browser) return;

	posthog.init('phc_jg4gOdigfHQD4MSgrSaO883dp2LjNJbJO7azv61UtI0', {
		api_host: 'https://us.i.posthog.com',
		person_profiles: 'always',
		capture_exceptions: true
	});
}

export async function checkTrackerBlocked(): Promise<boolean> {
	if (!browser) return false;

	try {
		await fetch('https://us-assets.i.posthog.com/static/exception-autocapture.js');
		return false;
	} catch {
		return navigator.onLine;
	}
}
