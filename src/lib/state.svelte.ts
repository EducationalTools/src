export let settingsOpen = $state({ current: false });
export let commandOpen = $state({ current: false });
export let syncState: { current: '' | 'uploading' | 'downloading' } = $state({ current: '' });
