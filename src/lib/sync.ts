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

	if (settings) {
		let preferences = get(preferencesStore);
		mutationData.settings = {
			experimentalFeatures: preferences.experimentalFeatures,
			open: preferences.open,
			theme: preferences.theme,
			panic: {
				enabled: preferences.panic.enabled,
				key: preferences.panic.key,
				url: preferences.panic.url,
				disableExperimentalMode: preferences.panic.disableExperimentalMode
			},
			cloak: {
				mode: preferences.cloak.mode,
				name: preferences.cloak.name,
				icon: preferences.cloak.icon
			},
			history: preferences.history
		};
	}
	if (history) mutationData.history = get(historyStore);
	if (favourites) mutationData.favourites = get(favoritesStore);

	await client.mutation(api.sync.update, { ...mutationData, jwt });
	syncState.current = '';
}
