import { generate, generate as generateId } from './idgen';

const gmaes = [
	{
		name: '2048',
		description:
			'Press arrow keys randomly until you get the 2048 tile. Then continue pressing arrow keys randomly.',
		url: '/_app/tools/2048/index.html'
	},
	{
		name: 'Bitlife',
		description: 'Do stupid stuff with a virtual character or something.',
		url: '/_app/tools/bitlife/index.html'
	},
	{
		name: 'Cookie Clicker',
		description: 'Waste your life clicking a cookie.',
		url: '/_app/tools/cookieclicker/index.html'
	},
	{
		name: 'Crappy Bird',
		description: 'A crappy version of Flappy Bird.',
		url: '/_app/tools/crappybird/index.html'
	}
];

interface Gmae {
	name: string;
	description: string;
	url: string;
}

interface ParsedGmae extends Gmae {
	id: string;
}

let parsedGmaes: ParsedGmae[] = [];

gmaes.forEach((gmae) => {
	parsedGmaes.push({
		id: generateId(gmae.name),
		name: gmae.name,
		description: gmae.description,
		url: gmae.url
	});
});

export function getGameById(id: string) {
	return parsedGmaes.find((gmae) => gmae.id === id);
}

export { parsedGmaes as gmaes };
