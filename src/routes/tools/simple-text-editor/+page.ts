import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(302, '/tools/rich-text-editor'); // needs `throw` in v1
}
