import { generate, generate as generateId } from './idgen';

export interface Gmae {
	name: string;
	description: string;
	category: string;
	tags: string[];
	links: { name: string; url: string }[];
	url: string;
}

export interface ParsedGmae extends Gmae {
	id: string;
}

const gmaes: Gmae[] = [
	{
		name: '2048',
		description:
			'Press arrow keys randomly until you get the 2048 tile. Then continue pressing arrow keys randomly.',
		category: 'Puzzle',
		tags: ['kinda-maths', 'casual'],
		links: [{ name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/2048_(video_game)' }],
		url: '/_app/tools/2048/index.html'
	},
	{
		name: 'Bitlife',
		description: 'Do stupid stuff with a virtual character or something.',
		category: 'Simulation',
		tags: [],
		links: [{ name: 'Official site', url: 'https://lifesimulator.online/' }],
		url: '/_app/tools/bitlife/index.html'
	},
	{
		name: 'Cookie Clicker',
		description: 'Waste your life clicking a cookie.',
		category: 'Idle',
		tags: ['waste-your-life', 'casual'],
		links: [{ name: 'Official site', url: 'https://orteil.dashnet.org/cookieclicker/' }],
		url: '/_app/tools/cookieclicker/index.html'
	},
	{
		name: 'Crappy Bird',
		description: 'A crappy version of Flappy Bird.',
		category: 'Action',
		tags: ['flappy'],
		links: [],
		url: '/_app/tools/crappybird/index.html'
	},
	{
		name: 'Floppy Bird',
		description: 'Some other derivative of Flappy Bird...',
		category: 'Action',
		tags: ['flappy'],
		links: [],
		url: '/_app/tools/floppybird/index.html'
	},
	{
		name: 'Hole.io',
		description: 'another io game...',
		category: 'Action',
		tags: [],
		links: [{ name: 'Official site', url: 'https://holeio.com/' }],
		url: '/_app/tools/holeio/index.html'
	},
	{
		name: 'House of Hazards',
		description: 'this is surely not compliant with ohs regulations',
		category: 'Action',
		tags: [],
		links: [{ name: 'Official site', url: 'https://houseofhazards.com/' }],
		url: '/_app/tools/houseofhazards/index.html'
	},
	{
		name: 'Idle Breakout',
		description: 'break bricks, get money, buy upgrades, realise you wasted your life',
		category: 'Action',
		tags: [],
		links: [{ name: 'Official site', url: 'https://www.coolmathgames.com/0-idle-breakout' }],
		url: '/_app/tools/idlebreakout/index.html'
	},
	{
		name: 'Mario Kart',
		description: 'dont sue me :)',
		category: 'Action',
		tags: [],
		links: [
			{
				name: 'If you are nintendo and want this taken down email me here',
				url: 'mailto:me@ingo.au'
			}
		],
		url: '/_app/tools/mariokart/index.html'
	},
	{
		name: 'Minecraft',
		description: 'I, am steve',
		category: 'Sandbox',
		tags: [],
		links: [],
		url: '/_app/tools/minecraft/index.html'
	},
	{
		name: 'Monkey Mart',
		description: 'Monkeys have feelings too you know',
		category: 'Simulation',
		tags: [],
		links: [{ name: 'Official site', url: 'https://monkeymartgame.org/' }],
		url: '/_app/tools/monkeymart/index.html'
	},
	{
		name: 'Monopoly',
		description: 'see, google, apple, microsoft',
		category: 'Strategy',
		tags: [],
		links: [],
		url: '/_app/tools/monopoly/index.html'
	},
	{
		name: 'Pokemon Red',
		description: 'some emulator gmae',
		category: 'Adventure',
		tags: [],
		links: [],
		url: '/_app/tools/pokemonred/index.html'
	},
	{
		name: 'Pedal to the Metal',
		description: 'trust me, you have to listen to all the music in this game',
		category: 'Action',
		tags: ['driving', 'scratch', 'made-by-friends'],
		links: [{ name: 'Scratch', url: 'https://scratch.mit.edu/projects/856661828/' }],
		url: '/_app/tools/pttm/index.html'
	},
	{
		name: 'Scrabble',
		description: 'something with words',
		category: 'Puzzle',
		tags: [],
		links: [],
		url: '/_app/tools/scrab/index.html'
	},
	{
		name: 'Slope',
		description:
			'A game where you roll a ball down a slope until you either fall off or touch red (skill issue)',
		category: 'Action',
		tags: ['balls'],
		links: [{ name: 'Official site', url: 'https://slopeonline.online/' }],
		url: '/_app/tools/slope/index.html'
	},
	{
		name: 'Snow Rider (3d)',
		description: 'avoid litteraly everything appart from presents or something',
		category: 'Action',
		tags: [],
		links: [],
		url: '/_app/tools/snowrider/index.html'
	},
	{
		name: 'Solitaire',
		description: 'something with cards idk',
		category: 'Strategy',
		tags: ['cards'],
		links: [],
		url: '/_app/tools/solit/index.html'
	},
	{
		name: 'SUPERHOT',
		description: 'fps but time only moves when you move',
		category: 'Action',
		tags: ['fps'],
		links: [],
		url: '/_app/tools/superhot/index.html'
	},
	{
		name: 'We have subway surfers at home',
		description:
			'highly advanced subway surfers clone that doesnt seem to work on firefox because its so advanced',
		category: 'Action',
		tags: [],
		links: [],
		url: '/_app/tools/swsurfer/index.html'
	},
	{
		name: 'Tetris',
		description: 'you know tetris',
		category: 'Strategy',
		tags: ['arcade', 'block'],
		links: [],
		url: '/_app/tools/tetris/index.html'
	},
	{
		name: 'Tic Tac Toe',
		description: "also called noughts and crosses if you are a bri'ish lad",
		category: 'Strategy',
		tags: [],
		links: [],
		url: '/_app/tools/tictactoe/index.html'
	},
	{
		name: 'Extreme Pamplona',
		description: 'something maybe to do will bulls (thanks to github copilot lol)',
		category: 'Action',
		tags: [],
		links: [{ name: 'Official site', url: 'https://www.crazygames.com/game/extreme-pamplona' }],
		url: '/_app/tools/xtpamplona/index.html'
	},
	{
		name: 'Star Battles',
		description: 'defeat the destruction star (made by @Bombrrr and @Inglan)',
		category: 'Action',
		tags: ['star', 'made-by-friends'],
		links: [
			{ name: 'Official site', url: 'https://smastudiosau.github.io/projects/starbattle/' },
			{ name: 'Github', url: 'https://github.com/smastudiosau/star-battles' }
		],
		url: '/_app/tools/starbattles/index.html'
	},
	{
		name: 'The Jarsio',
		description: 'some sort of horror gmae but only works on some mirrors (edutools.ingo.au)',
		category: 'Horror',
		tags: ['made-by-friends'],
		links: [{ name: 'Github', url: 'https://github.com/Bombrrr/The-Jarsio' }],
		url: '/_app/tools/jarred/jarred.html'
	},
	{
		name: 'Amazing Strange Rope Police',
		description: 'we have gta at home (before gta 6)',
		category: 'Action',
		tags: ['crime'],
		links: [],
		url: '/_app/tools/amazing-rope-police/index.html'
	},
	{
		name: 'Escape Road',
		description: 'escape the police yay more crime',
		category: 'Action',
		tags: ['crime'],
		links: [],
		url: '/_app/tools/escaperoad/index.html'
	},
	{
		name: 'Scratch Nextbots',
		description: 'very legit gmae totally not made in scratch',
		category: 'Action',
		tags: ['made-by-friends', 'scratch'],
		links: [{ name: 'Scratch', url: 'https://scratch.mit.edu/projects/927726453/' }],
		url: '/_app/tools/scratch-nextbots/index.html'
	},
	{
		name: 'Mine sweeper (scratch edition)',
		description: 'minesweeper (with a space) made in scratch very nice animation. press space',
		category: 'Puzzle',
		tags: ['made-by-friends', 'scratch'],
		links: [{ name: 'Scratch', url: 'https://scratch.mit.edu/projects/903234567/' }],
		url: '/_app/tools/mine-sweeper/index.html'
	},
	{
		name: 'Run 3',
		description: 'probably a gmae where you run',
		category: 'Action',
		tags: [],
		links: [],
		url: '/_app/tools/run3/index.html'
	},
	{
		name: 'Dadish',
		description: 'some sort of gmae with a talking radish or smth',
		category: 'Platformer',
		tags: [],
		links: [],
		url: '/_app/tools/dadish/index.html'
	},
	{
		name: 'Dadish 2',
		description: 'Radish works with a computer with a lot of children coming in for some reason',
		category: 'Platformer',
		tags: [],
		links: [],
		url: '/_app/tools/dadish-2/index.html'
	},
	{
		name: 'Subway surfers',
		description:
			'a game where you surf on a subway thanks zed auto complete no its a gmae where you commit crimes such as grafiti and evading police',
		category: 'Action',
		tags: ['crime'],
		links: [],
		url: '/_app/tools/subwaysurfers/index.html'
	},
	{
		name: 'Grindcraft',
		description: 'minecraft but not minecraft',
		category: 'Clicker',
		tags: [],
		links: [{ name: 'Official Website', url: 'https://grindcraft.com' }],
		url: '/_app/tools/grindcraft/index.html'
	},
	{
		name: 'Trade Craft',
		description: 'a game where you trade items',
		category: 'Clicker',
		tags: ['trade'],
		links: [],
		url: '/_app/tools/tradecraft/index.html'
	},
	{
		name: '1',
		description: 'backwards 2048',
		category: 'Puzzle',
		tags: ['kinda-maths', 'casual'],
		links: [],
		url: '/_app/tools/1/index.html'
	},
	{
		name: 'Cut the rope',
		description: 'a gmae where you cut the rope',
		category: 'Uncategorized',
		tags: [],
		links: [],
		url: '/_app/tools/cuttherope/index.html'
	},
	{
		name: 'Cut the rope holiday',
		description: 'a game where you cut the rope but maybe on a holiday or something',
		category: 'Uncategorized',
		tags: [],
		links: [],
		url: '/_app/tools/ctr-holiday/index.html'
	},
	{
		name: '9007199254740992',
		description: '2048 but you have to get 9007199254740992',
		category: 'Puzzle',
		tags: ['kinda-maths', 'casual'],
		links: [],
		url: '/_app/tools/9007199254740992/index.html'
	},
	{
		name: 'Achievement Unlocked',
		description: '',
		category: 'Uncategorized',
		tags: [],
		links: [],
		url: '/_app/tools/achievementunlocked/index.html'
	},
	{
		name: 'The Final Earth',
		description: 'rebuild earth on an intersting looking planet',
		category: 'Sandbox',
		tags: [],
		links: [],
		url: '/_app/tools/the-final-earth/index.html'
	},
	{
		name: 'This is the only level',
		description: 'do the same thing over and over again (but not)',
		category: 'Uncategorized',
		tags: [],
		links: [],
		url: '/_app/tools/thisistheonlylevel/index.html'
	},
	{
		name: 'GBA Emulator',
		description: 'Nintendo please don\'t sue us',
		category: 'Uncategorized',
		tags: [],
		links: [],
		url: '/_app/tools/gba-emu/index.html'
	}
];

let parsedGmaes: ParsedGmae[] = [];

gmaes.forEach((gmae) => {
	parsedGmaes.push({
		id: generateId(gmae.name),
		category: gmae.category,
		description: gmae.description,
		url: gmae.url,
		links: gmae.links,
		name: gmae.name,
		tags: gmae.tags
	});
});

parsedGmaes.sort((a, b) => a.name.localeCompare(b.name));

export function getGameById(id: string) {
	return parsedGmaes.find((gmae) => gmae.id === id);
}

export { parsedGmaes as gmaes };
