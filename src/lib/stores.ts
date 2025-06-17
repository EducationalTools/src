import { persisted } from 'svelte-persisted-store';

export const preferencesStore = persisted('preferences', {
	experimentalFeatures: false,
	open: 'tab',
	theme: 'shadcn-zinc',
	panic: {
		enabled: false,
		key: '`',
		url: 'https://classroom.google.com',
		disableExperimentalMode: true
	},
	cloak: {
		mode: 'off',
		name: 'Home',
		icon: 'https://ssl.gstatic.com/classroom/favicon.png'
	},
	analytics: true,
	history: true
});

export const favoritesStore = persisted('favorites', [] as string[]);
export const historyStore = persisted('history', [] as string[]);
