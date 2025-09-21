import { api } from '../convex/_generated/api';
import { syncState } from './state.svelte';
import { syncSettingsStore, preferencesStore } from './stores';
import { useConvexClient } from 'convex-svelte';

const client = useConvexClient();

export async function saveSettings(
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
	syncState.current = 'uploading';
	await client.mutation(api.sync.update, { settings, jwt });
	syncState.current = '';
}

export async function saveHistory(jwt: string, history: string[]) {
	syncState.current = 'uploading';
	await client.mutation(api.sync.update, { history, jwt });
	syncState.current = '';
}

export async function saveFavourites(jwt: string, favourites: string[]) {
	syncState.current = 'uploading';
	await client.mutation(api.sync.update, { favourites, jwt });
	syncState.current = '';
}
