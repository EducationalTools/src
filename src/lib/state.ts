import { persisted } from 'svelte-persisted-store';

export const preferencesStore = persisted('preferences', {
	experimentalFeatures: false
});
