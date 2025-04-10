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
		description: 'Guide a bird through pipes by tapping to flap its wings.',
		url: '/_app/tools/floppybird/index.html'
	},
	{
		name: 'Grindcraft Remastered',
		description: 'Mine resources and craft items in this idle game.',
		url: '/_app/tools/grindcraftremastered/index.html'
	},
	{
		name: 'Hole.io',
		description: 'Consume objects with your black hole to grow bigger.',
		url: '/_app/tools/holeio/index.html'
	},
	{
		name: 'House of Hazards',
		description: 'Navigate through hazardous house environments.',
		url: '/_app/tools/houseofhazards/index.html'
	},
	{
		name: 'Idle Breakout',
		description: 'Break bricks automatically in this idle game version of Breakout.',
		url: '/_app/tools/idlebreakout/index.html'
	},
	{
		name: 'Mario Kart',
		description: 'Race as Mario characters on various tracks.',
		url: '/_app/tools/mariokart/index.html'
	},
	{
		name: 'Minecraft',
		description: 'Build and explore in this blocky world.',
		url: '/_app/tools/minecraft/index.html'
	},
	{
		name: 'Monkey Mart',
		description: 'Monkeys have feelings to you know',
		url: '/_app/tools/monkeymart/index.html'
	},
	{
		name: 'Monopoly',
		description: 'Buy properties and bankrupt your opponents in this classic board game.',
		url: '/_app/tools/monopoly/index.html'
	},
	{
		name: 'Paper.io 2',
		description: 'Capture territory in this IO game by drawing boundaries.',
		url: '/_app/tools/paperio2/index.html'
	},
	{
		name: 'Pokemon Red',
		description: 'Play the classic Pokemon Red game on your browser.',
		url: '/_app/tools/pokemonred/index.html'
	},
	{
		name: 'PTTM',
		description: 'Play this mysterious game (PTTM).',
		url: '/_app/tools/pttm/index.html'
	},
	{
		name: 'Rocket League',
		description: 'Play soccer with rocket-powered cars.',
		url: '/_app/tools/rocketleague/index.html'
	},
	{
		name: 'Scrab',
		description: 'Form words from letter tiles in this word game.',
		url: '/_app/tools/scrab/index.html'
	},
	{
		name: 'Slenderman',
		description: 'Collect pages while avoiding the Slenderman in this horror game.',
		url: '/_app/tools/slenderman/index.html'
	},
	{
		name: 'Slope',
		description:
			'A game where you roll a ball down a slope until you either fall off or touch red (skill issue',
		url: '/_app/tools/slope/index.html'
	},
	{
		name: 'Snow Rider',
		description: 'Ride down snowy slopes, performing tricks and avoiding obstacles.',
		url: '/_app/tools/snowrider/index.html'
	},
	{
		name: 'Solitaire',
		description: 'Play the classic card game of patience.',
		url: '/_app/tools/solit/index.html'
	},
	{
		name: 'SPR',
		description: 'Play this SPR game.',
		url: '/_app/tools/spr/index.html'
	},
	{
		name: 'SUPERHOT',
		description: 'Time moves only when you move in this FPS game.',
		url: '/_app/tools/superhot/index.html'
	},
	{
		name: 'SW Surfer',
		description: 'Surf through this Star Wars themed endless runner.',
		url: '/_app/tools/swsurfer/index.html'
	},
	{
		name: 'Tetris',
		description: 'Arrange falling blocks to create complete lines.',
		url: '/_app/tools/tetris/index.html'
	},
	{
		name: 'Tic Tac Toe',
		description: 'Play the classic game of X and O.',
		url: '/_app/tools/tictactoe/index.html'
	},
	{
		name: 'XT Pamplona',
		description: 'Run with the bulls in this game based on the famous Spanish festival.',
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
