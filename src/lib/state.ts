import { persisted } from 'svelte-persisted-store';

export const preferencesStore = persisted('preferences', {
	experimentalFeatures: false,
	open: 'tab'
});

export const favoritesStore = persisted('favorites', [] as string[]);
export const historyStore = persisted('history', [] as string[]);
