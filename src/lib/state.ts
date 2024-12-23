import { persisted } from 'svelte-persisted-store';

export const testStore = persisted('teststore', {
	switch: false
});
