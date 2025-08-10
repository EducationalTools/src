import { error } from '@sveltejs/kit';
import { getGameById } from '$lib/gmaes';

export function load({ url }) {
	let gmae = getGameById(url.pathname.split('/').slice(2).join('/'));
	if (!gmae) throw error(404, 'Not Found');
}
