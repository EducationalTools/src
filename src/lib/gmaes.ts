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
	},
	{
		name: 'Floppy Bird',
		description: 'Some other derivative of Flappy Bird...',
		url: '/_app/tools/floppybird/index.html'
	},
	{
		name: 'Hole.io',
		description: 'another io game...',
		url: '/_app/tools/holeio/index.html'
	},
	{
		name: 'House of Hazards',
		description: 'this is surely not compliant with ohs regulations',
		url: '/_app/tools/houseofhazards/index.html'
	},
	{
		name: 'Idle Breakout',
		description: 'break bricks, get money, buy upgrades, realise you wasted your life',
		url: '/_app/tools/idlebreakout/index.html'
	},
	{
		name: 'Mario Kart',
		description: 'dont sue me :)',
		url: '/_app/tools/mariokart/index.html'
	},
	{
		name: 'Minecraft',
		description: 'I, am steve',
		url: '/_app/tools/minecraft/index.html'
	},
	{
		name: 'Monkey Mart',
		description: 'Monkeys have feelings too you know',
		url: '/_app/tools/monkeymart/index.html'
	},
	{
		name: 'Monopoly',
		description: 'see, google, apple, microsoft',
		url: '/_app/tools/monopoly/index.html'
	},
	{
		name: 'Pokemon Red',
		description: 'some emulator gmae',
		url: '/_app/tools/pokemonred/index.html'
	},
	{
		name: 'Pedal to the Metal',
		description: 'trust me, you have to listen to all the music in this game',
		url: '/_app/tools/pttm/index.html'
	},
	{
		name: 'Scrabble',
		description: 'something with words',
		url: '/_app/tools/scrab/index.html'
	},
	{
		name: 'Slope',
		description:
			'A game where you roll a ball down a slope until you either fall off or touch red (skill issue)',
		url: '/_app/tools/slope/index.html'
	},
	{
		name: 'Snow Rider (3d)',
		description: 'avoid litteraly everything appart from presents or something',
		url: '/_app/tools/snowrider/index.html'
	},
	{
		name: 'Solitaire',
		description: 'something with cards idk',
		url: '/_app/tools/solit/index.html'
	},
	{
		name: 'SUPERHOT',
		description: 'fps but time only moves when you move',
		url: '/_app/tools/superhot/index.html'
	},
	{
		name: 'We have subway surfers at home',
		description: 'highly advanced subway surfers clone',
		url: '/_app/tools/swsurfer/index.html'
	},
	{
		name: 'Tetris',
		description: 'you know tetris',
		url: '/_app/tools/tetris/index.html'
	},
	{
		name: 'Tic Tac Toe',
		description: 'very nice tic tac toe game',
		url: '/_app/tools/tictactoe/index.html'
	},
	{
		name: 'Extreme Pamplona',
		description: 'something maybe to do will bulls (thanks to github copilot lol)',
		url: '/_app/tools/xtpamplona/index.html'
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
