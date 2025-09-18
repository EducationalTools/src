export type Mirror = {
	url: string;
	quality?: 'highlyrecommended' | 'recommended' | 'notrecommended';
	notes?: string;
};

export const mirrors: Mirror[] = [
	{ url: 'https://edutools.ingo.au', quality: 'highlyrecommended' },
	{ url: 'https://edutools.ingowolf.au', quality: 'recommended' },
	{ url: 'https://educationaltools.github.io', quality: 'recommended' },
	{ url: 'https://educationaltools.vercel.app' },
	{ url: 'https://edutools.infinityfreeapp.com', quality: 'notrecommended' }
];
