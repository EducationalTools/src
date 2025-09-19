import { generate, generate as generateId } from './idgen';

export interface Gmae {
	name: string;
	description: string;
	category: string;
	url: string;
}

export interface ParsedGmae extends Gmae {
	id: string;
}

const gmaes: Gmae[] = [
	{
		name: 'Cookie Clicker',
		description: 'Waste your life clicking a cookie.',
		category: 'Idle',
		url: '/_app/tools/cookieclicker/index.html'
	},
	{
		name: 'Crappy Bird',
		description: 'A crappy version of Flappy Bird.',
		category: 'Action',
		url: '/_app/tools/crappybird/index.html'
	},
	{
		name: 'Floppy Bird',
		description: 'Some other derivative of Flappy Bird...',
		category: 'Action',
		url: '/_app/tools/floppybird/index.html'
	},
	{
		name: 'Hole.io',
		description: 'another io game...',
		category: 'Action',
		url: '/_app/tools/holeio/index.html'
	},
	{
		name: 'House of Hazards',
		description: 'this is surely not compliant with ohs regulations',
		category: 'Action',
		url: '/_app/tools/houseofhazards/index.html'
	},
	{
		name: 'Mario Kart',
		description: 'dont sue me :)',
		category: 'Action',
		url: '/_app/tools/mariokart/index.html'
	},
	{
		name: 'Minecraft',
		description: 'I, am steve',
		category: 'Sandbox',
		url: '/_app/tools/minecraft/index.html'
	},
	{
		name: 'Monkey Mart',
		description: 'Monkeys have feelings too you know',
		category: 'Simulation',
		url: '/_app/tools/monkeymart/index.html'
	},
	{
		name: 'Monopoly',
		description: 'see, google, apple, microsoft',
		category: 'Strategy',
		url: '/_app/tools/monopoly/index.html'
	},
	{
		name: 'Pokemon Red',
		description: 'some emulator gmae',
		category: 'Adventure',
		url: '/_app/tools/pokemonred/index.html'
	},
	{
		name: 'Pedal to the Metal',
		description: 'trust me, you have to listen to all the music in this game',
		category: 'Action',
		url: '/_app/tools/pttm/index.html'
	},
	{
		name: 'Scrabble',
		description: 'something with words',
		category: 'Puzzle',
		url: '/_app/tools/scrab/index.html'
	},
	{
		name: 'Slope',
		description: 'A game where you roll a ball down a slope until you either fall off or touch red (skill issue)',
		category: 'Action',
		url: '/_app/tools/slope/index.html'
	},
	{
		name: 'Snow Rider (3d)',
		description: 'avoid litteraly everything appart from presents or something',
		category: 'Action',
		url: '/_app/tools/snowrider/index.html'
	},
	{
		name: 'Solitaire',
		description: 'something with cards idk',
		category: 'Strategy',
		url: '/_app/tools/solit/index.html'
	},
	{
		name: 'Superhot',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/9/superhot/index.html'
	},
	{
		name: 'We have subway surfers at home',
		description: 'highly advanced subway surfers clone that doesnt seem to work on firefox because its so advanced',
		category: 'Action',
		url: '/_app/tools/swsurfer/index.html'
	},
	{
		name: 'Tetris',
		description: 'you know tetris',
		category: 'Strategy',
		url: '/_app/tools/tetris/index.html'
	},
	{
		name: 'Extreme Pamplona',
		description: 'something maybe to do will bulls (thanks to github copilot lol)',
		category: 'Action',
		url: '/_app/tools/xtpamplona/index.html'
	},
	{
		name: 'Star Battles',
		description: 'defeat the destruction star (made by @Bombrrr and @Inglan)',
		category: 'Action',
		url: '/_app/tools/starbattles/index.html'
	},
	{
		name: 'The Jarsio',
		description: 'some sort of horror gmae but only works on some mirrors (edutools.ingo.au)',
		category: 'Horror',
		url: '/_app/tools/jarred/jarred.html'
	},
	{
		name: 'Amazing Strange Rope Police',
		description: 'we have gta at home (before gta 6)',
		category: 'Action',
		url: '/_app/tools/amazing-rope-police/index.html'
	},
	{
		name: 'Escape Road',
		description: 'escape the police yay more crime',
		category: 'Action',
		url: '/_app/tools/escaperoad/index.html'
	},
	{
		name: 'Scratch Nextbots',
		description: 'very legit gmae totally not made in scratch',
		category: 'Action',
		url: '/_app/tools/scratch-nextbots/index.html'
	},
	{
		name: 'Mine sweeper (scratch edition)',
		description: 'minesweeper (with a space) made in scratch very nice animation. press space',
		category: 'Puzzle',
		url: '/_app/tools/mine-sweeper/index.html'
	},
	{
		name: 'Run 3',
		description: 'probably a gmae where you run',
		category: 'Action',
		url: '/_app/tools/run3/index.html'
	},
	{
		name: 'Dadish',
		description: 'some sort of gmae with a talking radish or smth',
		category: 'Platformer',
		url: '/_app/tools/dadish/index.html'
	},
	{
		name: 'Dadish 2',
		description: 'Radish works with a computer with a lot of children coming in for some reason',
		category: 'Platformer',
		url: '/_app/tools/dadish-2/index.html'
	},
	{
		name: 'Subway surfers',
		description: 'a game where you surf on a subway thanks zed auto complete no its a gmae where you commit crimes such as grafiti and evading police',
		category: 'Action',
		url: '/_app/tools/subwaysurfers/index.html'
	},
	{
		name: 'Trade Craft',
		description: 'a game where you trade items',
		category: 'Clicker',
		url: '/_app/tools/tradecraft/index.html'
	},
	{
		name: 'Cut the rope',
		description: 'a gmae where you cut the rope',
		category: 'Uncategorized',
		url: '/_app/tools/cuttherope/index.html'
	},
	{
		name: 'Cut the rope holiday',
		description: 'a game where you cut the rope but maybe on a holiday or something',
		category: 'Uncategorized',
		url: '/_app/tools/ctr-holiday/index.html'
	},
	{
		name: 'Achievement Unlocked',
		description: '',
		category: 'Uncategorized',
		url: '/_app/tools/achievementunlocked/index.html'
	},
	{
		name: 'The Final Earth',
		description: 'rebuild earth on an intersting looking planet',
		category: 'Sandbox',
		url: '/_app/tools/the-final-earth/index.html'
	},
	{
		name: 'This is the only level',
		description: 'do the same thing over and over again (but not)',
		category: 'Uncategorized',
		url: '/_app/tools/thisistheonlylevel/index.html'
	},
	{
		name: 'Idle Dice',
		description: 'Something to do with dice probably',
		category: 'Uncategorized',
		url: '/_app/tools/idle-dices/index.html'
	},
	{
		name: 'Idle Chopper',
		description: 'Chop wood',
		category: 'Uncategorized',
		url: '/_app/tools/idle-chopper/index.html'
	},
	{
		name: 'Toy Defence',
		description: 'another tower defence variant ig',
		category: 'Strategy',
		url: '/_app/tools/toy-defence/index.html'
	},
	{
		name: 'Airbattle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/8/AIRBATTLE/index.html'
	},
	{
		name: 'FNAF SHOOTER',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Action',
		url: '/_app/tools/sz/8/FNAFSHOOTER/index.html'
	},
	{
		name: 'Fighter2.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/fighter2.html'
	},
	{
		name: 'Flipthegun',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/FLIPTHEGUN/index.html'
	},
	{
		name: 'Fruitninja',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/9/fruitninja/index.html'
	},
	{
		name: 'Fruitninja.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/fruitninja.html'
	},
	{
		name: 'Funnybattle2',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/8/FUNNYBATTLE2/index.html'
	},
	{
		name: 'Getaway Shootout',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/2/getaway-shootout/index.html'
	},
	{
		name: 'Gun Master',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/7/gun-master/index.html'
	},
	{
		name: 'Gunspinn',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/7/gunspinn/index.html'
	},
	{
		name: 'Kitchen Gun Game',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/10/kitchen-gun-game/index.html'
	},
	{
		name: 'Ninjavsevilcorp',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/7/ninjavsevilcorp/index.html'
	},
	{
		name: 'Pixel Gun Survival',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/6/pixel-gun-survival/index.html'
	},
	{
		name: 'Pixelgun',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/5/pixelgun/index.html'
	},
	{
		name: 'Sansfight.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/sansfight.html'
	},
	{
		name: 'Sniper',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/sniper/index.html'
	},
	{
		name: 'Sniper',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/SNIPER/index.html'
	},
	{
		name: 'Sniperfixed',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/SNIPERFIXED/index.html'
	},
	{
		name: 'Snowbattle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/2/snowbattle/index.html'
	},
	{
		name: 'Snowbattle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/7/snowbattle/index.html'
	},
	{
		name: 'Starwarsmovie.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/6/StarWarsMovie.html'
	},
	{
		name: 'Stick Duel Battle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/4/stick-duel-battle/index.html'
	},
	{
		name: 'Stickman Epic Battle',
		description: 'stick figure does stick figure things',
		category: 'Action',
		url: '/_app/tools/sz/6/stickman-epic-battle/index.html'
	},
	{
		name: 'Superhot.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/superhot.html'
	},
	{
		name: 'Time Shooter 2',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/5/time-shooter-2/index.html'
	},
	{
		name: 'Timeshoot3',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/6/timeshoot3/index.html'
	},
	{
		name: 'Verynormalshooter',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/7/verynormalshooter/index.html'
	},
	{
		name: 'Zombie Shooter',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/ZOMBIE-SHOOTER/index.html'
	},
	{
		name: 'Zombieshooter',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/ZOMBIESHOOTER/index.html'
	},
	{
		name: 'Zombieshooterwaveofzoms',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/ZOMBIESHOOTERWAVEOFZOMS/index.html'
	},
	{
		name: 'Backrooms',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/1/backrooms/index.html'
	},
	{
		name: 'Backrooms 2d',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/5/backrooms-2d/index.html'
	},
	{
		name: 'Backrooms.html',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/3/backrooms.html'
	},
	{
		name: 'FNAF  1',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-1/index.html'
	},
	{
		name: 'FNAF  2',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/4/fnaf-2/index.html'
	},
	{
		name: 'FNAF  2',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-2/index.html'
	},
	{
		name: 'FNAF  3',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-3/index.html'
	},
	{
		name: 'FNAF  4',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-4/index.html'
	},
	{
		name: 'FNAF .HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf.html'
	},
	{
		name: 'FNAF 2',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf2/fnaf2.html'
	},
	{
		name: 'FNAF 2.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf2.html'
	},
	{
		name: 'FNAF 3',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/FNAF3/index.html'
	},
	{
		name: 'FNAF 3',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf3/fnaf3.html'
	},
	{
		name: 'FNAF 3.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf3.html'
	},
	{
		name: 'FNAF 4',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf4/fnaf4.html'
	},
	{
		name: 'FNAF 4.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf4.html'
	},
	{
		name: 'FNAF SL.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/5/fnafsl.html'
	},
	{
		name: 'Granny',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/8/GRANNY/index.html'
	},
	{
		name: 'Captaincallisto',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/7/captaincallisto/index.html'
	},
	{
		name: 'Cookie.html',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/3/cookie.html'
	},
	{
		name: 'Cookieclicker Master',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/11/cookieclicker-master/index.html'
	},
	{
		name: 'Craftmine',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/2/craftmine/index.html'
	},
	{
		name: 'Csgo Clicker',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/1/CSGO-CLICKER/index.html'
	},
	{
		name: 'Dogeminer',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/4/DogeMiner/index.html'
	},
	{
		name: 'Dogeminer2',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/4/Dogeminer2/index.html'
	},
	{
		name: 'Idle Shark',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/6/idle-shark/index.html'
	},
	{
		name: 'Incredibox.html',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/5/Incredibox.html'
	},
	{
		name: 'Minekhan Main',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/6/MineKhan-main/index.html'
	},
	{
		name: 'Mariovsluigi.html',
		description: 'italian plumber does questionable things',
		category: 'Platformer',
		url: '/_app/tools/sz/3/mariovsluigi.html'
	},
	{
		name: 'Sonic2.html',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/3/sonic2.html'
	},
	{
		name: 'Stickman Boost',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/5/stickman-boost/index.html'
	},
	{
		name: 'Stickman Boost',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/11/stickman-boost/index.html'
	},
	{
		name: 'Stickman Hook',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/5/stickman-hook/index.html'
	},
	{
		name: 'Stickmantourkart',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/8/STICKMANTOURKART/index.html'
	},
	{
		name: 'Supermario',
		description: 'italian plumber does questionable things',
		category: 'Platformer',
		url: '/_app/tools/sz/4/SuperMario/index.html'
	},
	{
		name: 'Supermarioconstruct',
		description: 'italian plumber does questionable things',
		category: 'Platformer',
		url: '/_app/tools/sz/4/supermarioconstruct/index.html'
	},
	{
		name: 'Tube Jumpers',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/8/tube-jumpers/index.html'
	},
	{
		name: 'Tube Jumpers',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/11/tube-jumpers/index.html'
	},
	{
		name: 'Vex3',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex3/index.html'
	},
	{
		name: 'Vex4',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex4/index.html'
	},
	{
		name: 'Vex5',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex5/index.html'
	},
	{
		name: 'Vex6',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex6/index.html'
	},
	{
		name: 'Vex7',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex7/index.html'
	},
	{
		name: '2048.html',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/2048.html'
	},
	{
		name: '20481',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/2/20481/index.html'
	},
	{
		name: 'Blockblast',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/11/blockblast/index.html'
	},
	{
		name: 'Blockpost',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/6/blockpost/index.html'
	},
	{
		name: 'Blockpost.html',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/blockpost.html'
	},
	{
		name: 'Connect3',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/5/connect3/index.html'
	},
	{
		name: 'Cupcake2048',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/6/cupcake2048/index.html'
	},
	{
		name: 'Flappy 2048',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/7/flappy-2048/index.html'
	},
	{
		name: 'Roadblocks',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/7/roadblocks/index.html'
	},
	{
		name: 'Sword.html',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/sword.html'
	},
	{
		name: 'Tetris.html',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/tetris.html'
	},
	{
		name: 'Wordle',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/2/wordle/index.html'
	},
	{
		name: 'Wordle',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/5/wordle/index.html'
	},
	{
		name: 'Wordle.html',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/wordle.html'
	},
	{
		name: 'Adventure Drivers',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/5/adventure-drivers/index.html'
	},
	{
		name: 'Cars Master',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/cars-master/index.html'
	},
	{
		name: 'Cars Simulator',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/4/cars-simulator/index.html'
	},
	{
		name: 'Citydriver',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/8/CITYDRIVER/index.html'
	},
	{
		name: 'Crazy Cars',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/crazy-cars/index.html'
	},
	{
		name: 'Cyber City Driver',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/7/cyber-city-driver/index.html'
	},
	{
		name: 'Drawdrive',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/8/DRAWDRIVE/index.html'
	},
	{
		name: 'Drift Boss',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/drift-boss/index.html'
	},
	{
		name: 'Drift Boss',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/drift-boss/index.html'
	},
	{
		name: 'Drift City',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/drift-city/index.html'
	},
	{
		name: 'Drift Hunters',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/4/drift-hunters/index.html'
	},
	{
		name: 'Drift.html',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/3/drift.html'
	},
	{
		name: 'Drive Mad',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/5/drive-mad/index.html'
	},
	{
		name: 'Eggycar',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/eggycar/index.html'
	},
	{
		name: 'Hill Racing',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/7/hill-racing/index.html'
	},
	{
		name: 'Madalin Stunt Cars 2',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/2/madalin-stunt-cars-2/index.html'
	},
	{
		name: 'Madalin Stunt Cars 2',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/madalin-stunt-cars-2/index.html'
	},
	{
		name: 'Madalin Stunt Cars 3',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/2/madalin-stunt-cars-3/index.html'
	},
	{
		name: 'Madalin Stunt Cars 3',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/madalin-stunt-cars-3/index.html'
	},
	{
		name: 'Marbleracemaker',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/9/MARBLERACEMAKER/index.html'
	},
	{
		name: 'Merge Round Racers',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/4/merge-round-racers/index.html'
	},
	{
		name: 'Motox3m',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m/index.html'
	},
	{
		name: 'Motox3m',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m/index.html'
	},
	{
		name: 'Motox3m Pool',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m-pool/index.html'
	},
	{
		name: 'Motox3m Pool',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m-pool/index.html'
	},
	{
		name: 'Motox3m Spooky',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m-spooky/index.html'
	},
	{
		name: 'Motox3m Spooky',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m-spooky/index.html'
	},
	{
		name: 'Motox3m Winter',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m-winter/index.html'
	},
	{
		name: 'Motox3m Winter',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m-winter/index.html'
	},
	{
		name: 'Motox3m2',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m2/index.html'
	},
	{
		name: 'Ocarina.html',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/3/ocarina.html'
	},
	{
		name: 'Racer',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/7/racer/index.html'
	},
	{
		name: 'Sky Car Stunt',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/7/sky-car-stunt/index.html'
	},
	{
		name: 'Stuntcars',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/9/stuntcars/index.html'
	},
	{
		name: 'X Trial Racing',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/7/x-trial-racing/index.html'
	},
	{
		name: 'Bitlife.html',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/3/bitlife.html'
	},
	{
		name: 'Ducklife1',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife1/index.html'
	},
	{
		name: 'Ducklife2',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife2/index.html'
	},
	{
		name: 'Ducklife3',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife3/index.html'
	},
	{
		name: 'Ducklife4',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife4/index.html'
	},
	{
		name: 'Papasbakeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasbakeria/index.html'
	},
	{
		name: 'Papasburgeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasburgeria/index.html'
	},
	{
		name: 'Papascheeseria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papascheeseria/index.html'
	},
	{
		name: 'Papascupcakeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papascupcakeria/index.html'
	},
	{
		name: 'Papasdonuteria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasdonuteria/index.html'
	},
	{
		name: 'Papasfreezeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasfreezeria/index.html'
	},
	{
		name: 'Papaspastaria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papaspastaria/index.html'
	},
	{
		name: 'Papaspizzeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papaspizzeria/index.html'
	},
	{
		name: 'Papasscooperia',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasscooperia/index.html'
	},
	{
		name: 'Papassushiria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papassushiria/index.html'
	},
	{
		name: 'President Simulator',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/8/president-simulator/index.html'
	},
	{
		name: 'Basketandball',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/basketandball/index.html'
	},
	{
		name: 'Basketball Legends',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketball-legends/index.html'
	},
	{
		name: 'Basketball Stars',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketball-stars/index.html'
	},
	{
		name: 'Basketball.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/basketball.html'
	},
	{
		name: 'Basketbros',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/11/basketbros/index.html'
	},
	{
		name: 'Basketbros Ioo',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketbros-ioo/index.html'
	},
	{
		name: 'Basketbross',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketbross/index.html'
	},
	{
		name: 'Basketrandom',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/11/basketrandom/index.html'
	},
	{
		name: 'Cannon Basketball 4',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/cannon-basketball-4/index.html'
	},
	{
		name: 'Cat Tennis',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/11/cat tennis/index.html'
	},
	{
		name: 'Golf.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/golf.html'
	},
	{
		name: 'Google Baseball',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/google-baseball/index.html'
	},
	{
		name: 'Gravity Soccer',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/gravity-soccer/index.html'
	},
	{
		name: 'Hardgolf',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/9/HARDGOLF/index.html'
	},
	{
		name: 'Nba.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/nba.html'
	},
	{
		name: 'Nba02.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/nba02.html'
	},
	{
		name: 'Soccer Random.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/soccer-random.html'
	},
	{
		name: 'Space Cadet Pinball',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/space-cadet-pinball/index.html'
	},
	{
		name: 'Stickman Golf',
		description: 'stick figure does stick figure things',
		category: 'Sports',
		url: '/_app/tools/sz/5/stickman-golf/index.html'
	},
	{
		name: 'Stickman Golf',
		description: 'stick figure does stick figure things',
		category: 'Sports',
		url: '/_app/tools/sz/11/stickman-golf/index.html'
	},
	{
		name: 'Tennis.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/tennis.html'
	},
	{
		name: 'BTD 1',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd1/index.html'
	},
	{
		name: 'BTD 2',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd2/index.html'
	},
	{
		name: 'BTD 3',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd3/index.html'
	},
	{
		name: 'BTD 4',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd4/index.html'
	},
	{
		name: 'BTD 5',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd5/index.html'
	},
	{
		name: 'Bloons2.html',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/3/bloons2.html'
	},
	{
		name: 'Bloons4.html',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/3/bloons4.html'
	},
	{
		name: 'Pizzatower',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/pizzatower/index.html'
	},
	{
		name: 'Towermaster',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/7/towermaster/index.html'
	},
	{
		name: 'Among Us',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/among-us/index.html'
	},
	{
		name: 'Geometry Dash Lite',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/11/geometry-dash-lite/index.html'
	},
	{
		name: 'Geometry Dash Remastered',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/geometry-dash-remastered/index.html'
	},
	{
		name: 'Osu',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/osu/index.html'
	},
	{
		name: 'Osu.html',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/11/Osu.html'
	},
	{
		name: 'Portalgo',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/portalgo/index.html'
	},
	{
		name: 'Slope 2',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/slope-2/index.html'
	},
	{
		name: 'Slope Ball',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/6/slope-ball/index.html'
	},
	{
		name: 'Slope.html',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/3/slope.html'
	},
	{
		name: 'Webosu',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/webosu/index.html'
	},
	{
		name: 'Zelda3d',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/zelda3d/index.html'
	},
	{
		name: 'Grindcraft',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/grindcraft/index.html'
	},
	{
		name: '2048',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/2/2048/index.html'
	},
	{
		name: '1',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/5/1/index.html'
	},
	{
		name: '9007199254740992',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/5/9007199254740992/index.html'
	},
	{
		name: 'Bitlife',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/9/bitlife/index.html'
	},
	{
		name: 'Superhot',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/9/superhot/index.html'
	},
	{
		name: 'Idle Breakout',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/11/idle-breakout/index.html'
	},
	{
		name: 'Airbattle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/8/AIRBATTLE/index.html'
	},
	{
		name: 'FNAF SHOOTER',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Action',
		url: '/_app/tools/sz/8/FNAFSHOOTER/index.html'
	},
	{
		name: 'Fighter2.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/fighter2.html'
	},
	{
		name: 'Flipthegun',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/FLIPTHEGUN/index.html'
	},
	{
		name: 'Fruitninja',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/9/fruitninja/index.html'
	},
	{
		name: 'Fruitninja.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/fruitninja.html'
	},
	{
		name: 'Funnybattle2',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/8/FUNNYBATTLE2/index.html'
	},
	{
		name: 'Getaway Shootout',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/2/getaway-shootout/index.html'
	},
	{
		name: 'Gun Master',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/7/gun-master/index.html'
	},
	{
		name: 'Gunspinn',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/7/gunspinn/index.html'
	},
	{
		name: 'Kitchen Gun Game',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/10/kitchen-gun-game/index.html'
	},
	{
		name: 'Ninjavsevilcorp',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/7/ninjavsevilcorp/index.html'
	},
	{
		name: 'Pixel Gun Survival',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/6/pixel-gun-survival/index.html'
	},
	{
		name: 'Pixelgun',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/5/pixelgun/index.html'
	},
	{
		name: 'Sansfight.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/sansfight.html'
	},
	{
		name: 'Sniper',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/sniper/index.html'
	},
	{
		name: 'Sniper',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/SNIPER/index.html'
	},
	{
		name: 'Sniperfixed',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/SNIPERFIXED/index.html'
	},
	{
		name: 'Snowbattle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/2/snowbattle/index.html'
	},
	{
		name: 'Snowbattle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/7/snowbattle/index.html'
	},
	{
		name: 'Starwarsmovie.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/6/StarWarsMovie.html'
	},
	{
		name: 'Stick Duel Battle',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/4/stick-duel-battle/index.html'
	},
	{
		name: 'Stickman Epic Battle',
		description: 'stick figure does stick figure things',
		category: 'Action',
		url: '/_app/tools/sz/6/stickman-epic-battle/index.html'
	},
	{
		name: 'Superhot.html',
		description: 'yet another game that probably works sometimes',
		category: 'Action',
		url: '/_app/tools/sz/3/superhot.html'
	},
	{
		name: 'Time Shooter 2',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/5/time-shooter-2/index.html'
	},
	{
		name: 'Timeshoot3',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/6/timeshoot3/index.html'
	},
	{
		name: 'Verynormalshooter',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/7/verynormalshooter/index.html'
	},
	{
		name: 'Zombie Shooter',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/ZOMBIE-SHOOTER/index.html'
	},
	{
		name: 'Zombieshooter',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/ZOMBIESHOOTER/index.html'
	},
	{
		name: 'Zombieshooterwaveofzoms',
		description: 'point and click until things stop moving',
		category: 'Action',
		url: '/_app/tools/sz/8/ZOMBIESHOOTERWAVEOFZOMS/index.html'
	},
	{
		name: 'Backrooms',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/1/backrooms/index.html'
	},
	{
		name: 'Backrooms 2d',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/5/backrooms-2d/index.html'
	},
	{
		name: 'Backrooms.html',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/3/backrooms.html'
	},
	{
		name: 'FNAF  1',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-1/index.html'
	},
	{
		name: 'FNAF  2',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/4/fnaf-2/index.html'
	},
	{
		name: 'FNAF  2',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-2/index.html'
	},
	{
		name: 'FNAF  3',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-3/index.html'
	},
	{
		name: 'FNAF  4',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf-4/index.html'
	},
	{
		name: 'FNAF .HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf.html'
	},
	{
		name: 'FNAF 2',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf2/fnaf2.html'
	},
	{
		name: 'FNAF 2.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf2.html'
	},
	{
		name: 'FNAF 3',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/FNAF3/index.html'
	},
	{
		name: 'FNAF 3',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf3/fnaf3.html'
	},
	{
		name: 'FNAF 3.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf3.html'
	},
	{
		name: 'FNAF 4',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/9/fnaf4/fnaf4.html'
	},
	{
		name: 'FNAF 4.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/3/fnaf4.html'
	},
	{
		name: 'FNAF SL.HTML',
		description: 'jumpscare simulator for people who like being scared',
		category: 'Horror',
		url: '/_app/tools/sz/5/fnafsl.html'
	},
	{
		name: 'Granny',
		description: 'yet another game that probably works sometimes',
		category: 'Horror',
		url: '/_app/tools/sz/8/GRANNY/index.html'
	},
	{
		name: 'Captaincallisto',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/7/captaincallisto/index.html'
	},
	{
		name: 'Cookie.html',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/3/cookie.html'
	},
	{
		name: 'Cookieclicker Master',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/11/cookieclicker-master/index.html'
	},
	{
		name: 'Craftmine',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/2/craftmine/index.html'
	},
	{
		name: 'Csgo Clicker',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/1/CSGO-CLICKER/index.html'
	},
	{
		name: 'Dogeminer',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/4/DogeMiner/index.html'
	},
	{
		name: 'Dogeminer2',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/4/Dogeminer2/index.html'
	},
	{
		name: 'Idle Shark',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/6/idle-shark/index.html'
	},
	{
		name: 'Incredibox.html',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/5/Incredibox.html'
	},
	{
		name: 'Minekhan Main',
		description: 'yet another game that probably works sometimes',
		category: 'Idle',
		url: '/_app/tools/sz/6/MineKhan-main/index.html'
	},
	{
		name: 'Mariovsluigi.html',
		description: 'italian plumber does questionable things',
		category: 'Platformer',
		url: '/_app/tools/sz/3/mariovsluigi.html'
	},
	{
		name: 'Sonic2.html',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/3/sonic2.html'
	},
	{
		name: 'Stickman Boost',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/5/stickman-boost/index.html'
	},
	{
		name: 'Stickman Boost',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/11/stickman-boost/index.html'
	},
	{
		name: 'Stickman Hook',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/5/stickman-hook/index.html'
	},
	{
		name: 'Stickmantourkart',
		description: 'stick figure does stick figure things',
		category: 'Platformer',
		url: '/_app/tools/sz/8/STICKMANTOURKART/index.html'
	},
	{
		name: 'Supermario',
		description: 'italian plumber does questionable things',
		category: 'Platformer',
		url: '/_app/tools/sz/4/SuperMario/index.html'
	},
	{
		name: 'Supermarioconstruct',
		description: 'italian plumber does questionable things',
		category: 'Platformer',
		url: '/_app/tools/sz/4/supermarioconstruct/index.html'
	},
	{
		name: 'Tube Jumpers',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/8/tube-jumpers/index.html'
	},
	{
		name: 'Tube Jumpers',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/11/tube-jumpers/index.html'
	},
	{
		name: 'Vex3',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex3/index.html'
	},
	{
		name: 'Vex4',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex4/index.html'
	},
	{
		name: 'Vex5',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex5/index.html'
	},
	{
		name: 'Vex6',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex6/index.html'
	},
	{
		name: 'Vex7',
		description: 'yet another game that probably works sometimes',
		category: 'Platformer',
		url: '/_app/tools/sz/7/vex7/index.html'
	},
	{
		name: '2048.html',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/2048.html'
	},
	{
		name: '20481',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/2/20481/index.html'
	},
	{
		name: 'Blockblast',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/11/blockblast/index.html'
	},
	{
		name: 'Blockpost',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/6/blockpost/index.html'
	},
	{
		name: 'Blockpost.html',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/blockpost.html'
	},
	{
		name: 'Connect3',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/5/connect3/index.html'
	},
	{
		name: 'Cupcake2048',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/6/cupcake2048/index.html'
	},
	{
		name: 'Flappy 2048',
		description: 'slide numbers around until you get bored or rage quit',
		category: 'Puzzle',
		url: '/_app/tools/sz/7/flappy-2048/index.html'
	},
	{
		name: 'Roadblocks',
		description: 'use your brain or pretend to use your brain',
		category: 'Puzzle',
		url: '/_app/tools/sz/7/roadblocks/index.html'
	},
	{
		name: 'Sword.html',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/sword.html'
	},
	{
		name: 'Tetris.html',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/tetris.html'
	},
	{
		name: 'Wordle',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/2/wordle/index.html'
	},
	{
		name: 'Wordle',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/5/wordle/index.html'
	},
	{
		name: 'Wordle.html',
		description: 'yet another game that probably works sometimes',
		category: 'Puzzle',
		url: '/_app/tools/sz/3/wordle.html'
	},
	{
		name: 'Adventure Drivers',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/5/adventure-drivers/index.html'
	},
	{
		name: 'Cars Master',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/cars-master/index.html'
	},
	{
		name: 'Cars Simulator',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/4/cars-simulator/index.html'
	},
	{
		name: 'Citydriver',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/8/CITYDRIVER/index.html'
	},
	{
		name: 'Crazy Cars',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/crazy-cars/index.html'
	},
	{
		name: 'Cyber City Driver',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/7/cyber-city-driver/index.html'
	},
	{
		name: 'Drawdrive',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/8/DRAWDRIVE/index.html'
	},
	{
		name: 'Drift Boss',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/drift-boss/index.html'
	},
	{
		name: 'Drift Boss',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/drift-boss/index.html'
	},
	{
		name: 'Drift City',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/drift-city/index.html'
	},
	{
		name: 'Drift Hunters',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/4/drift-hunters/index.html'
	},
	{
		name: 'Drift.html',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/3/drift.html'
	},
	{
		name: 'Drive Mad',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/5/drive-mad/index.html'
	},
	{
		name: 'Eggycar',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/eggycar/index.html'
	},
	{
		name: 'Hill Racing',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/7/hill-racing/index.html'
	},
	{
		name: 'Madalin Stunt Cars 2',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/2/madalin-stunt-cars-2/index.html'
	},
	{
		name: 'Madalin Stunt Cars 2',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/madalin-stunt-cars-2/index.html'
	},
	{
		name: 'Madalin Stunt Cars 3',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/2/madalin-stunt-cars-3/index.html'
	},
	{
		name: 'Madalin Stunt Cars 3',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/madalin-stunt-cars-3/index.html'
	},
	{
		name: 'Marbleracemaker',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/9/MARBLERACEMAKER/index.html'
	},
	{
		name: 'Merge Round Racers',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/4/merge-round-racers/index.html'
	},
	{
		name: 'Motox3m',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m/index.html'
	},
	{
		name: 'Motox3m',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m/index.html'
	},
	{
		name: 'Motox3m Pool',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m-pool/index.html'
	},
	{
		name: 'Motox3m Pool',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m-pool/index.html'
	},
	{
		name: 'Motox3m Spooky',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m-spooky/index.html'
	},
	{
		name: 'Motox3m Spooky',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m-spooky/index.html'
	},
	{
		name: 'Motox3m Winter',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m-winter/index.html'
	},
	{
		name: 'Motox3m Winter',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/11/motox3m-winter/index.html'
	},
	{
		name: 'Motox3m2',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/5/motox3m2/index.html'
	},
	{
		name: 'Ocarina.html',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/3/ocarina.html'
	},
	{
		name: 'Racer',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/7/racer/index.html'
	},
	{
		name: 'Sky Car Stunt',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/7/sky-car-stunt/index.html'
	},
	{
		name: 'Stuntcars',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/9/stuntcars/index.html'
	},
	{
		name: 'Timothy\'s Race',
		description: 'go fast and probably crash into things',
		category: 'Racing',
		url: '/_app/tools/sz/6/timothy\'s-race/index.html'
	},
	{
		name: 'X Trial Racing',
		description: 'yet another game that probably works sometimes',
		category: 'Racing',
		url: '/_app/tools/sz/7/x-trial-racing/index.html'
	},
	{
		name: 'Bitlife.html',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/3/bitlife.html'
	},
	{
		name: 'Ducklife1',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife1/index.html'
	},
	{
		name: 'Ducklife2',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife2/index.html'
	},
	{
		name: 'Ducklife3',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife3/index.html'
	},
	{
		name: 'Ducklife4',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/11/ducklife4/index.html'
	},
	{
		name: 'Papasbakeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasbakeria/index.html'
	},
	{
		name: 'Papasburgeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasburgeria/index.html'
	},
	{
		name: 'Papascheeseria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papascheeseria/index.html'
	},
	{
		name: 'Papascupcakeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papascupcakeria/index.html'
	},
	{
		name: 'Papasdonuteria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasdonuteria/index.html'
	},
	{
		name: 'Papasfreezeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasfreezeria/index.html'
	},
	{
		name: 'Papaspastaria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papaspastaria/index.html'
	},
	{
		name: 'Papaspizzeria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papaspizzeria/index.html'
	},
	{
		name: 'Papasscooperia',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papasscooperia/index.html'
	},
	{
		name: 'Papassushiria',
		description: 'run a restaurant and probably make people angry about their food',
		category: 'Simulation',
		url: '/_app/tools/sz/11/papassushiria/index.html'
	},
	{
		name: 'President Simulator',
		description: 'yet another game that probably works sometimes',
		category: 'Simulation',
		url: '/_app/tools/sz/8/president-simulator/index.html'
	},
	{
		name: 'Basketandball',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/basketandball/index.html'
	},
	{
		name: 'Basketball Legends',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketball-legends/index.html'
	},
	{
		name: 'Basketball Stars',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketball-stars/index.html'
	},
	{
		name: 'Basketball.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/basketball.html'
	},
	{
		name: 'Basketbros',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/11/basketbros/index.html'
	},
	{
		name: 'Basketbros Ioo',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketbros-ioo/index.html'
	},
	{
		name: 'Basketbross',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/basketbross/index.html'
	},
	{
		name: 'Basketrandom',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/11/basketrandom/index.html'
	},
	{
		name: 'Cannon Basketball 4',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/cannon-basketball-4/index.html'
	},
	{
		name: 'Cat Tennis',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/11/cat tennis/index.html'
	},
	{
		name: 'Golf.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/golf.html'
	},
	{
		name: 'Google Baseball',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/google-baseball/index.html'
	},
	{
		name: 'Gravity Soccer',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/7/gravity-soccer/index.html'
	},
	{
		name: 'Hardgolf',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/9/HARDGOLF/index.html'
	},
	{
		name: 'Nba.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/nba.html'
	},
	{
		name: 'Nba02.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/nba02.html'
	},
	{
		name: 'Soccer Random.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/soccer-random.html'
	},
	{
		name: 'Space Cadet Pinball',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/6/space-cadet-pinball/index.html'
	},
	{
		name: 'Stickman Golf',
		description: 'stick figure does stick figure things',
		category: 'Sports',
		url: '/_app/tools/sz/5/stickman-golf/index.html'
	},
	{
		name: 'Stickman Golf',
		description: 'stick figure does stick figure things',
		category: 'Sports',
		url: '/_app/tools/sz/11/stickman-golf/index.html'
	},
	{
		name: 'Tennis.html',
		description: 'yet another game that probably works sometimes',
		category: 'Sports',
		url: '/_app/tools/sz/3/tennis.html'
	},
	{
		name: 'BTD 1',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd1/index.html'
	},
	{
		name: 'BTD 2',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd2/index.html'
	},
	{
		name: 'BTD 3',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd3/index.html'
	},
	{
		name: 'BTD 4',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd4/index.html'
	},
	{
		name: 'BTD 5',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/btd5/index.html'
	},
	{
		name: 'Bloons2.html',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/3/bloons2.html'
	},
	{
		name: 'Bloons4.html',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/3/bloons4.html'
	},
	{
		name: 'Pizzatower',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/11/pizzatower/index.html'
	},
	{
		name: 'Towermaster',
		description: 'yet another game that probably works sometimes',
		category: 'Strategy',
		url: '/_app/tools/sz/7/towermaster/index.html'
	},
	{
		name: 'Among Us',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/among-us/index.html'
	},
	{
		name: 'Geometry Dash Lite',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/11/geometry-dash-lite/index.html'
	},
	{
		name: 'Geometry Dash Remastered',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/geometry-dash-remastered/index.html'
	},
	{
		name: 'Osu',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/osu/index.html'
	},
	{
		name: 'Osu.html',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/11/Osu.html'
	},
	{
		name: 'Portalgo',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/portalgo/index.html'
	},
	{
		name: 'Slope 2',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/slope-2/index.html'
	},
	{
		name: 'Slope Ball',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/6/slope-ball/index.html'
	},
	{
		name: 'Slope.html',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/3/slope.html'
	},
	{
		name: 'Webosu',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/7/webosu/index.html'
	},
	{
		name: 'Zelda3d',
		description: 'yet another game that probably works sometimes',
		category: 'Uncategorized',
		url: '/_app/tools/sz/2/zelda3d/index.html'
	}
];

let parsedGmaes: ParsedGmae[] = [];

gmaes.forEach((gmae) => {
	parsedGmaes.push({
		id: generateId(gmae.name),
		category: gmae.category,
		description: gmae.description,
		url: gmae.url,
		name: gmae.name
	});
});

parsedGmaes.sort((a, b) => a.name.localeCompare(b.name));

export function getGameById(id: string) {
	return parsedGmaes.find((gmae) => gmae.id === id);
}

export { parsedGmaes as gmaes };
