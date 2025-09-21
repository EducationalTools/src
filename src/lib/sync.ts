import { api } from '../convex/_generated/api';
import { syncState } from './state.svelte';
import { syncSettingsStore, preferencesStore } from './stores';
import { useConvexClient } from 'convex-svelte';

const client = useConvexClient();

export function saveSettings(
	jwt: string,
	settings: {
		experimentalFeatures: boolean;
		open: string;
		theme: string;
		panic: {
			enabled: boolean;
			key: string;
			url: string;
			disableExperimentalMode: boolean;
		};
		cloak: {
			mode: string;
			name: string;
			icon: string;
		};
		history: boolean;
	}
) {
	client.mutation(api.sync.update, { settings, jwt });
}

export function saveHistory(jwt: string, history: string[]) {
	client.mutation(api.sync.update, { history, jwt });
}

export function saveFavourites(jwt: string, favourites: string[]) {
	client.mutation(api.sync.update, { favourites, jwt });
}
