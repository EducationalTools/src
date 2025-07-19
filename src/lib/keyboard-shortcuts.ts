export interface KeyboardShortcut {
	key: string;
	metaKey?: boolean;
	handler: () => void;
	description: string;
}

export function handleGlobalKeydown(event: KeyboardEvent, shortcuts: KeyboardShortcut[]): boolean {
	for (const shortcut of shortcuts) {
		const metaKeyMatch = shortcut.metaKey
			? event.metaKey || event.ctrlKey
			: !event.metaKey && !event.ctrlKey;

		if (event.key === shortcut.key && metaKeyMatch) {
			event.preventDefault();
			shortcut.handler();
			return true;
		}
	}
	return false;
}

export function createSidebarShortcuts(commandOpen: { set: (value: boolean) => void }) {
	return [
		{
			key: 'k',
			metaKey: true,
			handler: () => commandOpen.set(true),
			description: 'Open search'
		}
	];
}
