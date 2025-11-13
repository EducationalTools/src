import { generate, generate as generateId } from "./idgen";

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
    name: "2048",
    description:
      "Press arrow keys randomly until you get the 2048 tile. Then continue pressing arrow keys randomly.",
    category: "Puzzle",
    url: "/assets/g/1/g/2048/index.html",
  },
  {
    name: "Bitlife",
    description: "Do stupid stuff with a virtual character or something.",
    category: "Simulation",
    url: "/assets/g/1/g/bitlife/index.html",
  },
  {
    name: "Cookie Clicker",
    description: "Waste your life clicking a cookie.",
    category: "Idle",
    url: "/assets/g/1/g/cookieclicker/index.html",
  },
  {
    name: "Crappy Bird",
    description: "A crappy version of Flappy Bird.",
    category: "Action",
    url: "/assets/g/1/g/crappybird/index.html",
  },
  {
    name: "Floppy Bird",
    description: "Some other derivative of Flappy Bird...",
    category: "Action",
    url: "/assets/g/1/g/floppybird/index.html",
  },
  {
    name: "Hole.io",
    description: "another io game...",
    category: "Action",
    url: "/assets/g/1/g/holeio/index.html",
  },
  {
    name: "House of Hazards",
    description: "this is surely not compliant with ohs regulations",
    category: "Action",
    url: "/assets/g/1/g/houseofhazards/index.html",
  },
  {
    name: "Idle Breakout",
    description:
      "break bricks, get money, buy upgrades, realise you wasted your life",
    category: "Action",
    url: "/assets/g/1/g/idlebreakout/index.html",
  },
  {
    name: "Mario Kart",
    description: "dont sue me :)",
    category: "Action",
    url: "/assets/g/1/g/mariokart/index.html",
  },
  {
    name: "Minecraft",
    description: "I, am steve",
    category: "Sandbox",
    url: "/assets/g/1/g/minecraft/index.html",
  },
  {
    name: "Monkey Mart",
    description: "Monkeys have feelings too you know",
    category: "Simulation",
    url: "/assets/g/1/g/monkeymart/index.html",
  },
  {
    name: "Monopoly",
    description: "see, google, apple, microsoft",
    category: "Strategy",
    url: "/assets/g/1/g/monopoly/index.html",
  },
  {
    name: "Pokemon Red",
    description: "some emulator gmae",
    category: "Adventure",
    url: "/assets/g/1/g/pokemonred/index.html",
  },
  {
    name: "Pedal to the Metal",
    description: "trust me, you have to listen to all the music in this game",
    category: "Action",
    url: "/assets/g/1/g/pttm/index.html",
  },
  {
    name: "Scrabble",
    description: "something with words",
    category: "Puzzle",
    url: "/assets/g/1/g/scrab/index.html",
  },
  {
    name: "Slope",
    description:
      "A game where you roll a ball down a slope until you either fall off or touch red (skill issue)",
    category: "Action",
    url: "/assets/g/1/g/slope/index.html",
  },
  {
    name: "Snow Rider (3d)",
    description: "avoid litteraly everything appart from presents or something",
    category: "Action",
    url: "/assets/g/1/g/snowrider/index.html",
  },
  {
    name: "Solitaire",
    description: "something with cards idk",
    category: "Strategy",
    url: "/assets/g/1/g/solit/index.html",
  },
  {
    name: "SUPERHOT",
    description: "fps but time only moves when you move",
    category: "Action",
    url: "/assets/g/1/g/superhot/index.html",
  },
  {
    name: "We have subway surfers at home",
    description:
      "highly advanced subway surfers clone that doesnt seem to work on firefox because its so advanced",
    category: "Action",
    url: "/assets/g/1/g/swsurfer/index.html",
  },
  {
    name: "Tetris",
    description: "you know tetris",
    category: "Strategy",
    url: "/assets/g/1/g/tetris/index.html",
  },
  {
    name: "Tic Tac Toe",
    description: "also called noughts and crosses if you are a bri'ish lad",
    category: "Strategy",
    url: "/assets/g/1/g/tictactoe/index.html",
  },
  {
    name: "Extreme Pamplona",
    description:
      "something maybe to do will bulls (thanks to github copilot lol)",
    category: "Action",
    url: "/assets/g/1/g/xtpamplona/index.html",
  },
  {
    name: "Star Battles",
    description: "defeat the destruction star (made by @Bombrrr and @Inglan)",
    category: "Action",
    url: "/assets/g/1/g/starbattles/index.html",
  },
  {
    name: "The Jarsio",
    description:
      "some sort of horror gmae but only works on some mirrors (edutools.ingo.au)",
    category: "Horror",
    url: "/assets/g/1/g/jarred/jarred.html",
  },
  {
    name: "Amazing Strange Rope Police",
    description: "we have gta at home (before gta 6)",
    category: "Action",
    url: "/assets/g/1/g/amazing-rope-police/index.html",
  },
  {
    name: "Escape Road",
    description: "escape the police yay more crime",
    category: "Action",
    url: "/assets/g/1/g/escaperoad/index.html",
  },
  {
    name: "Scratch Nextbots",
    description: "very legit gmae totally not made in scratch",
    category: "Action",
    url: "/assets/g/1/g/scratch-nextbots/index.html",
  },
  {
    name: "Mine sweeper (scratch edition)",
    description:
      "minesweeper (with a space) made in scratch very nice animation. press space",
    category: "Puzzle",
    url: "/assets/g/1/g/mine-sweeper/index.html",
  },
  {
    name: "Run 3",
    description: "probably a gmae where you run",
    category: "Action",
    url: "/assets/g/1/g/run3/index.html",
  },
  {
    name: "Dadish",
    description: "some sort of gmae with a talking radish or smth",
    category: "Platformer",
    url: "/assets/g/1/g/dadish/index.html",
  },
  {
    name: "Dadish 2",
    description:
      "Radish works with a computer with a lot of children coming in for some reason",
    category: "Platformer",
    url: "/assets/g/1/g/dadish-2/index.html",
  },
  {
    name: "Subway surfers",
    description:
      "a game where you surf on a subway thanks zed auto complete no its a gmae where you commit crimes such as grafiti and evading police",
    category: "Action",
    url: "/assets/g/1/g/subwaysurfers/index.html",
  },
  {
    name: "Grindcraft",
    description: "minecraft but not minecraft",
    category: "Clicker",
    url: "/assets/g/1/g/grindcraft/index.html",
  },
  {
    name: "Trade Craft",
    description: "a game where you trade items",
    category: "Clicker",
    url: "/assets/g/1/g/tradecraft/index.html",
  },
  {
    name: "1",
    description: "backwards 2048",
    category: "Puzzle",
    url: "/assets/g/1/g/1/index.html",
  },
  {
    name: "Cut the rope",
    description: "a gmae where you cut the rope",
    category: "Uncategorized",
    url: "/assets/g/1/g/cuttherope/index.html",
  },
  {
    name: "Cut the rope holiday",
    description:
      "a game where you cut the rope but maybe on a holiday or something",
    category: "Uncategorized",
    url: "/assets/g/1/g/ctr-holiday/index.html",
  },
  {
    name: "9007199254740992",
    description: "2048 but you have to get 9007199254740992",
    category: "Puzzle",
    url: "/assets/g/1/g/9007199254740992/index.html",
  },
  {
    name: "Achievement Unlocked",
    description: "",
    category: "Uncategorized",
    url: "/assets/g/1/g/achievementunlocked/index.html",
  },
  {
    name: "The Final Earth",
    description: "rebuild earth on an intersting looking planet",
    category: "Sandbox",
    url: "/assets/g/1/g/the-final-earth/index.html",
  },
  {
    name: "This is the only level",
    description: "do the same thing over and over again (but not)",
    category: "Uncategorized",
    url: "/assets/g/1/g/thisistheonlylevel/index.html",
  },
  {
    name: "GBA Emulator",
    description: "Nintendo please don't sue us",
    category: "Uncategorized",
    url: "/assets/g/1/g/gba-emu/index.html",
  },
  {
    name: "Idle Dice",
    description: "Something to do with dice probably",
    category: "Uncategorized",
    url: "/assets/g/1/g/idle-dices/index.html",
  },
  {
    name: "Idle Chopper",
    description: "Chop wood",
    category: "Uncategorized",
    url: "/assets/g/1/g/idle-chopper/index.html",
  },
  {
    name: "Idle Idle Game Dev",
    description: '"Develop" idle games while idle',
    category: "Uncategorized",
    url: "/assets/g/1/g/idle-idle-gamedev/index.html",
  },
  {
    name: "Toy Defence",
    description: "another tower defence variant ig",
    category: "Strategy",
    url: "/assets/g/1/g/toy-defence/index.html",
  },
];

let parsedGmaes: ParsedGmae[] = [];

gmaes.forEach((gmae) => {
  parsedGmaes.push({
    id: generateId(gmae.name),
    category: gmae.category,
    description: gmae.description,
    url: gmae.url,
    name: gmae.name,
  });
});

parsedGmaes.sort((a, b) => a.name.localeCompare(b.name));

export function getGmaeById(id: string) {
  return parsedGmaes.find((gmae) => gmae.id === id);
}

export { parsedGmaes as gmaes };
