import Home from '@lucide/svelte/icons/home';
import Wrench from '@lucide/svelte/icons/wrench';
import Game from '@lucide/svelte/icons/gamepad-2';
import Code from '@lucide/svelte/icons/code';
import Server from '@lucide/svelte/icons/server';
import Copy from '@lucide/svelte/icons/copy';
import History from '@lucide/svelte/icons/history';
import ArchiveRestore from '@lucide/svelte/icons/archive-restore';
import List from '@lucide/svelte/icons/list';
import Plus from '@lucide/svelte/icons/plus';
import Info from '@lucide/svelte/icons/info';

export interface NavigationItem {
	title: string;
	icon: any;
	url: string;
	experimental?: boolean;
	items?: {
		title: string;
		url: string;
		icon?: any;
	}[];
}

export function createMainNavigation(
	gmaes: Array<{ id: string; name: string }> = []
): NavigationItem[] {
	return [
		{
			title: 'Home',
			icon: Home,
			url: '/',
			experimental: false
		},
		{
			title: 'Tools',
			icon: Wrench,
			experimental: false,
			url: '',
			items: [
				{
					title: 'Calculator',
					url: '/tools/calculator'
				},
				{
					title: 'Converter',
					url: '/tools/converter'
				},
				{
					title: 'Rich Text Editor',
					url: '/tools/rich-text-editor'
				},
				{
					title: 'Word Counter',
					url: '/tools/word-counter'
				},
				{
					title: 'Password Generator',
					url: '/tools/password-generator'
				},
				{
					title: 'Random Number Gen',
					url: '/tools/random-number-generator'
				}
			]
		},
		{
			title: 'Gmaes',
			icon: Game,
			experimental: true,
			url: '',
			items: [
				{
					title: 'All Gmaes',
					url: '/g',
					icon: List
				},
				{
					title: 'History',
					url: '/history',
					icon: History
				},
				{
					title: 'Request a Gmae',
					url: 'https://github.com/EducationalTools/src/issues/new?template=gmae_request.yml',
					icon: Plus
				},
				...gmaes.map((gmae) => ({
					title: gmae.name,
					url: `/g/${gmae.id}`
				}))
			]
		},
		{
			title: 'Mirrors',
			experimental: true,
			url: '/mirrors',
			icon: Copy
		},
		{
			title: 'Host a mirror',
			experimental: true,
			icon: Server,
			url: '/mirrors/host'
		},
		{
			title: 'Backups',
			experimental: true,
			icon: ArchiveRestore,
			url: '/backups'
		},
		{
			title: 'About',
			experimental: true,
			icon: Info,
			url: '/about'
		}
	];
}
