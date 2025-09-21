import { get } from 'svelte/store';
import { api } from '../convex/_generated/api';
import { syncState } from './state.svelte';
import { syncSettingsStore, preferencesStore, favoritesStore, historyStore } from './stores';
import { useConvexClient } from 'convex-svelte';

const client = useConvexClient();

export async function saveSettings(jwt: string) {
	syncState.current = 'uploading';
	await client.mutation(api.sync.update, { settings: get(preferencesStore), jwt });
	syncState.current = '';
}

export async function saveHistory(jwt: string) {
	syncState.current = 'uploading';
	await client.mutation(api.sync.update, { history: get(historyStore), jwt });
	syncState.current = '';
}

export async function saveFavourites(jwt: string) {
	syncState.current = 'uploading';
	await client.mutation(api.sync.update, { favourites: get(favoritesStore), jwt });
	syncState.current = '';
}
