import { get } from 'svelte/store';
import { api } from '../convex/_generated/api';
import { syncState } from './state.svelte';
import { syncSettingsStore, preferencesStore, favoritesStore, historyStore } from './stores';
import { useConvexClient } from 'convex-svelte';

export async function save(
	jwt: string,
	{
		settings = false,
		history = false,
		favourites = false
	}: { settings?: boolean; history?: boolean; favourites?: boolean }
) {
	const client = useConvexClient();

	syncState.current = 'uploading';
	let mutationData: { settings?: any; history?: any; favourites?: any } = {};

	if (settings) mutationData.settings = get(preferencesStore);
	if (history) mutationData.history = get(historyStore);
	if (favourites) mutationData.favourites = get(favoritesStore);

	await client.mutation(api.sync.update, { ...mutationData, jwt });
	syncState.current = '';
}
