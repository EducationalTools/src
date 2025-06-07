import posthog from 'posthog-js';
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, status }) => {
	if (status !== 404) {
		posthog.captureException(error);
	}
};
