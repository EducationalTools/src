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
name: '0Hh1',
description: 'Play 0Hh1 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/0hh1/index.html'
},
{
name: '1',
description: 'backwards 2048',
category: 'Puzzle',
url: '/_app/tools/1/index.html'
},
{
name: '10 103',
description: 'Play 10 103 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/10-103/index.html'
},
{
name: '10 Minutes Till Dawn',
description: 'Play 10 Minutes Till Dawn - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/10-minutes-till-dawn/index.html'
},
{
name: '123Movies',
description: 'Play 123Movies - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/123movies/index.html'
},
{
name: '1On1',
description: 'Play 1On1 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/1on1.html'
},
{
name: '1V1',
description: 'Play 1V1 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/1v1.html'
},
{
name: '1V1Space',
description: 'Play 1V1Space - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/1v1space/index.html'
},
{
name: '2048',
description: 'Combine numbered tiles to reach 2048',
category: 'Puzzle',
url: '/_app/tools/sz/2/2048/index.html'
},
{
name: '20481',
description: 'Combine numbered tiles to reach 2048',
category: 'Puzzle',
url: '/_app/tools/sz/2/20481/index.html'
},
{
name: '30Dollarwebsite',
description: 'Play 30Dollarwebsite - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/30dollarwebsite/index.html'
},
{
name: '3D Bowling',
description: 'Play 3D Bowling - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/3d-bowling/index.html'
},
{
name: '3Dnoobdestroyer',
description: 'Play 3Dnoobdestroyer - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/3DNOOBDESTROYER/index.html'
},
{
name: '8Ball',
description: 'Play 8Ball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/8ball/index.html'
},
{
name: '9007199254740992',
description: 'Play 9007199254740992 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/9007199254740992/index.html'
},
{
name: '99Balls',
description: 'Play 99Balls - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/99balls/index.html'
},
{
name: 'A Dance Of Fire And Ice',
description: 'Play A Dance Of Fire And Ice - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/a-dance-of-fire-and-ice/index.html'
},
{
name: 'Achievement Unlocked',
description: '',
category: 'Uncategorized',
url: '/_app/tools/achievementunlocked/index.html'
},
{
name: 'Adcap',
description: 'Play Adcap - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/adcap.html'
},
{
name: 'Adofai',
description: 'Play Adofai - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/adofai.html'
},
{
name: 'Adventure Drivers',
description: 'Play Adventure Drivers - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/adventure-drivers/index.html'
},
{
name: 'Ages Of Conflict',
description: 'Play Ages Of Conflict - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/ages-of-conflict/index.html'
},
{
name: 'Airbattle',
description: 'Play Airbattle - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/8/AIRBATTLE/index.html'
},
{
name: 'Align 4',
description: 'Play Align 4 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/align-4/index.html'
},
{
name: 'Amazing Rope Police',
description: 'Play Amazing Rope Police - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/amazing-rope-police/index.html'
},
{
name: 'Amazing Strange Rope Police',
description: 'we have gta at home (before gta 6)',
category: 'Action',
url: '/_app/tools/amazing-rope-police/index.html'
},
{
name: 'Among Us',
description: 'Play Among Us - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/among-us/index.html'
},
{
name: 'Angry Sharks',
description: 'Play Angry Sharks - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/angry-sharks/index.html'
},
{
name: 'Angrybirds',
description: 'Play Angrybirds - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/AngryBirds/index.html'
},
{
name: 'Archer Hero',
description: 'Play Archer Hero - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/archer-hero/index.html'
},
{
name: 'Arena Scratch',
description: 'Play Arena Scratch - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/arena-scratch/index.html'
},
{
name: 'Assessment',
description: 'Play Assessment - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/assessment.html'
},
{
name: 'Asteroids',
description: 'Play Asteroids - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/asteroids/index.html'
},
{
name: 'Awesometanks2',
description: 'Play Awesometanks2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/awesometanks2/index.html'
},
{
name: 'Backcountry',
description: 'Play Backcountry - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/backcountry/index.html'
},
{
name: 'Backrooms',
description: 'Escape the endless yellow rooms',
category: 'Horror',
url: '/_app/tools/sz/1/backrooms/index.html'
},
{
name: 'Backrooms 2D',
description: 'Escape the endless yellow rooms',
category: 'Horror',
url: '/_app/tools/sz/5/backrooms-2d/index.html'
},
{
name: 'Baldi',
description: 'Play Baldi - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/baldi.html'
},
{
name: 'Baldis Basics',
description: 'Play Baldis Basics - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/baldis-basics/index.html'
},
{
name: 'Ball Hop',
description: 'Play Ball Hop - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/ball-hop/index.html'
},
{
name: 'Ballistic Chickens',
description: 'Play Ballistic Chickens - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/ballistic-chickens/index.html'
},
{
name: 'Ballistic Chickens2',
description: 'Play Ballistic Chickens2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/ballistic-chickens2/index.html'
},
{
name: 'Bangocat',
description: 'Play Bangocat - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/BANGOCAT/index.html'
},
{
name: 'Bankrobbery2',
description: 'Play Bankrobbery2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/BANKROBBERY2/index.html'
},
{
name: 'Basketandball',
description: 'Play Basketandball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/basketandball/index.html'
},
{
name: 'Basketball',
description: 'Shoot hoops and score points',
category: 'Sports',
url: '/_app/tools/sz/3/basketball.html'
},
{
name: 'Basketball Legends',
description: 'Shoot hoops and score points',
category: 'Sports',
url: '/_app/tools/sz/7/basketball-legends/index.html'
},
{
name: 'Basketball Stars',
description: 'Shoot hoops and score points',
category: 'Sports',
url: '/_app/tools/sz/7/basketball-stars/index.html'
},
{
name: 'Basketbros',
description: 'Play Basketbros - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/basketbros/index.html'
},
{
name: 'Basketbros Ioo',
description: 'Play Basketbros Ioo - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/7/basketbros-ioo/index.html'
},
{
name: 'Basketbross',
description: 'Play Basketbross - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/basketbross/index.html'
},
{
name: 'Basketrandom',
description: 'Play Basketrandom - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/basketrandom/index.html'
},
{
name: 'Bigredbutton',
description: 'Play Bigredbutton - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/bigredbutton/index.html'
},
{
name: 'Bison',
description: 'Play Bison - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/bison.html'
},
{
name: 'Biters Io',
description: 'Play Biters Io - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/7/biters-io/index.html'
},
{
name: 'Bitlife',
description: 'Life simulation where you make choices',
category: 'Simulation',
url: '/_app/tools/sz/9/bitlife/index.html'
},
{
name: 'Blacholesquare',
description: 'Play Blacholesquare - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/blacholesquare/index.html'
},
{
name: 'Blackjack',
description: 'Play Blackjack - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/blackjack/index.html'
},
{
name: 'Blitz',
description: 'Play Blitz - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/blitz.html'
},
{
name: 'Blockblast',
description: 'Play Blockblast - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/blockblast/index.html'
},
{
name: 'Blockpost',
description: 'Play Blockpost - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/blockpost.html'
},
{
name: 'Bloons2',
description: 'Play Bloons2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/bloons2.html'
},
{
name: 'Bloons4',
description: 'Play Bloons4 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/bloons4.html'
},
{
name: 'Blumgi Rocket',
description: 'Play Blumgi Rocket - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/blumgi-rocket/index.html'
},
{
name: 'Blumgi Slime',
description: 'Play Blumgi Slime - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/blumgi-slime/index.html'
},
{
name: 'Bobtherobber2',
description: 'Play Bobtherobber2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/1/bobtherobber2/index.html'
},
{
name: 'Bomberman',
description: 'Play Bomberman - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/bomberman.html'
},
{
name: 'Bottle Flip',
description: 'Play Bottle Flip - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/bottle-flip/index.html'
},
{
name: 'Boxing Physics',
description: 'Play Boxing Physics - an exciting web game',
category: 'Sports',
url: '/_app/tools/sz/7/boxing-physics/index.html'
},
{
name: 'Boxing Physics2',
description: 'Play Boxing Physics2 - an exciting web game',
category: 'Sports',
url: '/_app/tools/sz/3/boxing-physics2.html'
},
{
name: 'Boxingrandom',
description: 'Play Boxingrandom - an exciting web game',
category: 'Sports',
url: '/_app/tools/sz/11/boxingrandom/index.html'
},
{
name: 'Breaklock',
description: 'Play Breaklock - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/breaklock.html'
},
{
name: 'Bricksbreakerclassic',
description: 'Play Bricksbreakerclassic - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/BRICKSBREAKERCLASSIC/index.html'
},
{
name: 'Bros2',
description: 'Play Bros2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/bros2.html'
},
{
name: 'Bros3',
description: 'Play Bros3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/bros3.html'
},
{
name: 'Btd1',
description: 'Play Btd1 - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/11/btd1/index.html'
},
{
name: 'Btd2',
description: 'Play Btd2 - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/11/btd2/index.html'
},
{
name: 'Btd3',
description: 'Play Btd3 - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/11/btd3/index.html'
},
{
name: 'Btd4',
description: 'Play Btd4 - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/11/btd4/index.html'
},
{
name: 'Btd5',
description: 'Play Btd5 - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/11/btd5/index.html'
},
{
name: 'Btts',
description: 'Play Btts - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/btts/index.html'
},
{
name: 'Buildbridges',
description: 'Play Buildbridges - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/BUILDBRIDGES/index.html'
},
{
name: 'Builder',
description: 'Play Builder - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/BUILDER/index.html'
},
{
name: 'Burger',
description: 'Play Burger - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/burger.html'
},
{
name: 'Burger And Frights',
description: 'Play Burger And Frights - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/burger-and-frights/index.html'
},
{
name: 'Burgeria',
description: 'Play Burgeria - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/burgeria.html'
},
{
name: 'Cannon Basketball 4',
description: 'Shoot hoops and score points',
category: 'Sports',
url: '/_app/tools/sz/6/cannon-basketball-4/index.html'
},
{
name: 'Captaincallisto',
description: 'Play Captaincallisto - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/captaincallisto/index.html'
},
{
name: 'Cars Master',
description: 'High-speed racing action in Cars Master',
category: 'Racing',
url: '/_app/tools/sz/6/cars-master/index.html'
},
{
name: 'Cars Simulator',
description: 'High-speed racing action in Cars Simulator',
category: 'Racing',
url: '/_app/tools/sz/4/cars-simulator/index.html'
},
{
name: 'Cat',
description: 'Play Cat - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/cat.html'
},
{
name: 'Cat Tennis',
description: 'Play Cat Tennis - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/cat tennis/index.html'
},
{
name: 'Cattrap',
description: 'Play Cattrap - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/cattrap.html'
},
{
name: 'Cell',
description: 'Play Cell - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/cell.html'
},
{
name: 'Cell Machine',
description: 'Play Cell Machine - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/cell-machine/index.html'
},
{
name: 'Cellm',
description: 'Play Cellm - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/cellm.html'
},
{
name: 'Champion Island',
description: 'Play Champion Island - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/5/champion-island/index.html'
},
{
name: 'Chickenroyal',
description: 'Play Chickenroyal - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/CHICKENROYAL/index.html'
},
{
name: 'Chrome Dino',
description: 'Play Chrome Dino - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/chrome-dino.html'
},
{
name: 'Circle',
description: 'Play Circle - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/circle/index.html'
},
{
name: 'Circuit',
description: 'Play Circuit - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/circuit.html'
},
{
name: 'Citydriver',
description: 'Play Citydriver - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/CITYDRIVER/index.html'
},
{
name: 'Clean Up Io',
description: 'Play Clean Up Io - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/6/clean-up-io/index.html'
},
{
name: 'Cluster Rush',
description: 'Play Cluster Rush - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/cluster-rush/index.html'
},
{
name: 'Cluster Truck',
description: 'Play Cluster Truck - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/cluster truck/index.html'
},
{
name: 'Colorun',
description: 'Play Colorun - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/colorun/index.html'
},
{
name: 'Connect3',
description: 'Play Connect3 - an exciting web game',
category: 'Puzzle',
url: '/_app/tools/sz/5/connect3/index.html'
},
{
name: 'Cookie',
description: 'Play Cookie - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/cookie.html'
},
{
name: 'Cookie Clicker',
description: 'Waste your life clicking a cookie.',
category: 'Idle',
url: '/_app/tools/cookieclicker/index.html'
},
{
name: 'Cookieclicker Master',
description: 'Click cookies to build a baking empire',
category: 'Idle',
url: '/_app/tools/sz/11/cookieclicker-master/index.html'
},
{
name: 'Craftmine',
description: 'Play Craftmine - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/craftmine/index.html'
},
{
name: 'Crappy Bird',
description: 'A crappy version of Flappy Bird.',
category: 'Action',
url: '/_app/tools/crappybird/index.html'
},
{
name: 'Crazy Cars',
description: 'High-speed racing action in Crazy Cars',
category: 'Racing',
url: '/_app/tools/sz/11/crazy-cars/index.html'
},
{
name: 'Crossy',
description: 'Play Crossy - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/crossy.html'
},
{
name: 'Csgo Clicker',
description: 'Click your way to success in this Csgo Clicker game',
category: 'Idle',
url: '/_app/tools/sz/1/CSGO-CLICKER/index.html'
},
{
name: 'Ctr',
description: 'Play Ctr - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/ctr/index.html'
},
{
name: 'Ctr Holiday',
description: 'Play Ctr Holiday - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/ctr-holiday/index.html'
},
{
name: 'Ctr Tr',
description: 'Play Ctr Tr - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/ctr-tr/index.html'
},
{
name: 'Cubefield',
description: 'Play Cubefield - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/cubefield/index.html'
},
{
name: 'Cupcake2048',
description: 'Combine numbered tiles to reach 2048',
category: 'Puzzle',
url: '/_app/tools/sz/6/cupcake2048/index.html'
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
name: 'Cyber City Driver',
description: 'Play Cyber City Driver - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/cyber-city-driver/index.html'
},
{
name: 'Cybertunnel',
description: 'Play Cybertunnel - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/CYBERTUNNEL/index.html'
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
name: 'Dashcraft',
description: 'Play Dashcraft - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/dashcraft/index.html'
},
{
name: 'Deal Or No Deal',
description: 'Play Deal Or No Deal - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/deal-or-no-deal/index.html'
},
{
name: 'Dealornodeal',
description: 'Play Dealornodeal - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/dealornodeal.html'
},
{
name: 'Death Run 3D',
description: 'Play Death Run 3D - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/death-run-3d/index.html'
},
{
name: 'Defend The Tank',
description: 'Play Defend The Tank - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/defend-the-tank/index.html'
},
{
name: 'Digdug',
description: 'Play Digdug - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/digdug.html'
},
{
name: 'Dk',
description: 'Play Dk - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/dk.html'
},
{
name: 'Doge',
description: 'Play Doge - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/doge.html'
},
{
name: 'Dogeminer',
description: 'Mine dogecoin with the help of Shiba Inus',
category: 'Idle',
url: '/_app/tools/sz/4/DogeMiner/index.html'
},
{
name: 'Dogeminer2',
description: 'Mine dogecoin with the help of Shiba Inus',
category: 'Idle',
url: '/_app/tools/sz/4/Dogeminer2/index.html'
},
{
name: 'Dont Fall Io',
description: 'Play Dont Fall Io - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/6/dont-fall-io/index.html'
},
{
name: 'Donut Boy',
description: 'Play Donut Boy - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/donut-boy/index.html'
},
{
name: 'Doodle',
description: 'Play Doodle - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/doodle.html'
},
{
name: 'Dragon Vs Bricks',
description: 'Play Dragon Vs Bricks - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/dragon-vs-bricks/index.html'
},
{
name: 'Draw The Hill',
description: 'Play Draw The Hill - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/draw-the-hill/index.html'
},
{
name: 'Drawdrive',
description: 'Play Drawdrive - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/DRAWDRIVE/index.html'
},
{
name: 'Dreader',
description: 'Play Dreader - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/dreader.html'
},
{
name: 'Drift',
description: 'Play Drift - an exciting web game',
category: 'Racing',
url: '/_app/tools/sz/3/drift.html'
},
{
name: 'Drift Boss',
description: 'Play Drift Boss - an exciting web game',
category: 'Racing',
url: '/_app/tools/sz/6/drift-boss/index.html'
},
{
name: 'Drift City',
description: 'Play Drift City - an exciting web game',
category: 'Racing',
url: '/_app/tools/sz/6/drift-city/index.html'
},
{
name: 'Drift Hunters',
description: 'Play Drift Hunters - an exciting web game',
category: 'Racing',
url: '/_app/tools/sz/4/drift-hunters/index.html'
},
{
name: 'Drive Mad',
description: 'Play Drive Mad - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/drive-mad/index.html'
},
{
name: 'Ducklife1',
description: 'Train ducks to become racing champions',
category: 'Adventure',
url: '/_app/tools/sz/11/ducklife1/index.html'
},
{
name: 'Ducklife2',
description: 'Train ducks to become racing champions',
category: 'Adventure',
url: '/_app/tools/sz/11/ducklife2/index.html'
},
{
name: 'Ducklife3',
description: 'Train ducks to become racing champions',
category: 'Adventure',
url: '/_app/tools/sz/11/ducklife3/index.html'
},
{
name: 'Ducklife4',
description: 'Train ducks to become racing champions',
category: 'Adventure',
url: '/_app/tools/sz/11/ducklife4/index.html'
},
{
name: 'Eatio',
description: 'Play Eatio - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/7/eatio/index.html'
},
{
name: 'Economical',
description: 'Play Economical - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/economical/index.html'
},
{
name: 'Economical2',
description: 'Play Economical2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/economical2/index.html'
},
{
name: 'Edgenotfound',
description: 'Play Edgenotfound - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/edgenotfound/index.html'
},
{
name: 'Eggycar',
description: 'High-speed racing action in Eggycar',
category: 'Racing',
url: '/_app/tools/sz/6/eggycar/index.html'
},
{
name: 'Emerald',
description: 'Play Emerald - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/emerald.html'
},
{
name: 'Emulatorjs',
description: 'Play Emulatorjs - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/emulatorjs.html'
},
{
name: 'Escape Road',
description: 'escape the police yay more crime',
category: 'Action',
url: '/_app/tools/escaperoad/index.html'
},
{
name: 'Evil Glitch',
description: 'Play Evil Glitch - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/evil-glitch/index.html'
},
{
name: 'Exhibit',
description: 'Play Exhibit - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/exhibit.html'
},
{
name: 'Exo',
description: 'Play Exo - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/EXO/index.html'
},
{
name: 'Extreme Pamplona',
description: 'something maybe to do will bulls (thanks to github copilot lol)',
category: 'Action',
url: '/_app/tools/xtpamplona/index.html'
},
{
name: 'Factoryballs',
description: 'Play Factoryballs - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/factoryballs/index.html'
},
{
name: 'Fakeupdate',
description: 'Play Fakeupdate - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/fakeupdate/index.html'
},
{
name: 'Fancypantsadventures',
description: 'Play Fancypantsadventures - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/fancypantsadventures/index.html'
},
{
name: 'Fbwg',
description: 'Play Fbwg - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/FBWG.html'
},
{
name: 'Fearthespotlight',
description: 'Play Fearthespotlight - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/fearthespotlight/index.html'
},
{
name: 'Fighter2',
description: 'Play Fighter2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/fighter2.html'
},
{
name: 'Firered',
description: 'Play Firered - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/firered.html'
},
{
name: 'Flappy',
description: 'Play Flappy - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/flappy.html'
},
{
name: 'Flappy 2048',
description: 'Combine numbered tiles to reach 2048',
category: 'Puzzle',
url: '/_app/tools/sz/7/flappy-2048/index.html'
},
{
name: 'Flipthegun',
description: 'Play Flipthegun - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/FLIPTHEGUN/index.html'
},
{
name: 'Floppy Bird',
description: 'Some other derivative of Flappy Bird...',
category: 'Action',
url: '/_app/tools/floppybird/index.html'
},
{
name: 'Fnaf',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/3/fnaf.html'
},
{
name: 'Fnaf 1',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/9/fnaf-1/index.html'
},
{
name: 'Fnaf 2',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/4/fnaf-2/index.html'
},
{
name: 'Fnaf 3',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/9/fnaf-3/index.html'
},
{
name: 'Fnaf 4',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/9/fnaf-4/index.html'
},
{
name: 'Fnaf2',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/3/fnaf2.html'
},
{
name: 'Fnaf3',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/3/fnaf3.html'
},
{
name: 'Fnaf4',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/3/fnaf4.html'
},
{
name: 'Fnafshooter',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/8/FNAFSHOOTER/index.html'
},
{
name: 'Fnafsl',
description: 'Survive the night at Freddy Fazbear\'s Pizza',
category: 'Horror',
url: '/_app/tools/sz/5/fnafsl.html'
},
{
name: 'Fnaw',
description: 'Play Fnaw - an exciting web game',
category: 'Horror',
url: '/_app/tools/sz/9/fnaw/index.html'
},
{
name: 'Fnf',
description: 'Play Fnf - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/fnf.html'
},
{
name: 'Fortcraft',
description: 'Play Fortcraft - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/fortcraft/index.html'
},
{
name: 'Fpa',
description: 'Play Fpa - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/fpa.html'
},
{
name: 'Freezeria',
description: 'Play Freezeria - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/freezeria.html'
},
{
name: 'Friendlyfire',
description: 'Play Friendlyfire - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/friendlyfire.html'
},
{
name: 'Fruitninja',
description: 'Play Fruitninja - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/3/fruitninja.html'
},
{
name: 'Frying Nemo',
description: 'Play Frying Nemo - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/frying-nemo/index.html'
},
{
name: 'Funnybattle2',
description: 'Play Funnybattle2 - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/8/FUNNYBATTLE2/index.html'
},
{
name: 'GBA Emulator',
description: 'Nintendo please don',
category: 'Uncategorized',
url: '/_app/tools/gba-emu/index.html'
},
{
name: 'Game',
description: 'Play Game - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/1/game.html'
},
{
name: 'Geodash',
description: 'Play Geodash - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/geodash/index.html'
},
{
name: 'Geometry Dash Lite',
description: 'Play Geometry Dash Lite - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/geometry-dash-lite/index.html'
},
{
name: 'Geometry Dash Remastered',
description: 'Play Geometry Dash Remastered - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/geometry-dash-remastered/index.html'
},
{
name: 'Georgeandtheprinter',
description: 'Play Georgeandtheprinter - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/georgeandtheprinter.html'
},
{
name: 'Getaway',
description: 'Play Getaway - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/getaway.html'
},
{
name: 'Getaway Shootout',
description: 'Play Getaway Shootout - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/getaway-shootout/index.html'
},
{
name: 'Getting Over It',
description: 'Play Getting Over It - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/getting-over-it/index.html'
},
{
name: 'Gimme The Airpod',
description: 'Play Gimme The Airpod - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/gimme-the-airpod/index.html'
},
{
name: 'Goingballs',
description: 'Play Goingballs - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/goingballs/index.html'
},
{
name: 'Golf',
description: 'Play Golf - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/golf.html'
},
{
name: 'Google Baseball',
description: 'Play Google Baseball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/google-baseball/index.html'
},
{
name: 'Google Snake',
description: 'Play Google Snake - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/google-snake.html'
},
{
name: 'Google Solitaire',
description: 'Play Google Solitaire - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/google-solitaire/index.html'
},
{
name: 'Googlegravity Main',
description: 'Play Googlegravity Main - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/1/googlegravity-main/index.html'
},
{
name: 'Gopher Kart',
description: 'Play Gopher Kart - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/gopher-kart/index.html'
},
{
name: 'Granny',
description: 'Play Granny - an exciting web game',
category: 'Horror',
url: '/_app/tools/sz/8/GRANNY/index.html'
},
{
name: 'Gravity Soccer',
description: 'Play Gravity Soccer - an exciting web game',
category: 'Sports',
url: '/_app/tools/sz/7/gravity-soccer/index.html'
},
{
name: 'Greybox',
description: 'Play Greybox - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/greybox.html'
},
{
name: 'Grindcraft',
description: 'Play Grindcraft - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/grindcraft/index.html'
},
{
name: 'Gta',
description: 'Play Gta - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/gta.html'
},
{
name: 'Gun Master',
description: 'Play Gun Master - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/gun-master/index.html'
},
{
name: 'Gunspinn',
description: 'Play Gunspinn - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/gunspinn/index.html'
},
{
name: 'Hacker Typer',
description: 'Play Hacker Typer - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/1/Hacker-Typer/index.html'
},
{
name: 'Hardgolf',
description: 'Play Hardgolf - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/HARDGOLF/index.html'
},
{
name: 'Helicopter',
description: 'Play Helicopter - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/helicopter/index.html'
},
{
name: 'Hexgl Master',
description: 'Play Hexgl Master - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/1/HexGL-master/index.html'
},
{
name: 'Hill Racing',
description: 'High-speed racing action in Hill Racing',
category: 'Racing',
url: '/_app/tools/sz/7/hill-racing/index.html'
},
{
name: 'Hole.io',
description: 'another io game...',
category: 'Action',
url: '/_app/tools/holeio/index.html'
},
{
name: 'Horde Killer',
description: 'Play Horde Killer - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/horde-killer/index.html'
},
{
name: 'Hotdoggeria',
description: 'Play Hotdoggeria - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/hotdoggeria.html'
},
{
name: 'House of Hazards',
description: 'this is surely not compliant with ohs regulations',
category: 'Action',
url: '/_app/tools/houseofhazards/index.html'
},
{
name: 'Hunt',
description: 'Play Hunt - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/hunt.html'
},
{
name: 'Hwy Rcer',
description: 'Play Hwy Rcer - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/hwy-rcer/index.html'
},
{
name: 'Iceagebaby',
description: 'Play Iceagebaby - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/iceagebaby/index.html'
},
{
name: 'Iceagebaby2',
description: 'Play Iceagebaby2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/iceagebaby2/index.html'
},
{
name: 'Idle Breakout',
description: 'Play Idle Breakout - an exciting web game',
category: 'Idle',
url: '/_app/tools/sz/11/idle-breakout/index.html'
},
{
name: 'Idle Chopper',
description: 'Chop wood',
category: 'Uncategorized',
url: '/_app/tools/idle-chopper/index.html'
},
{
name: 'Idle Dice',
description: 'Something to do with dice probably',
category: 'Uncategorized',
url: '/_app/tools/idle-dices/index.html'
},
{
name: 'Idle Idle Game Dev',
description: '',
category: 'Uncategorized',
url: '/_app/tools/idle-idle-gamedev/index.html'
},
{
name: 'Idle Shark',
description: 'Play Idle Shark - an exciting web game',
category: 'Idle',
url: '/_app/tools/sz/6/idle-shark/index.html'
},
{
name: 'Incredibox',
description: 'Play Incredibox - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/Incredibox.html'
},
{
name: 'Jellytruck',
description: 'Play Jellytruck - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/jellytruck/index.html'
},
{
name: 'Jetpack',
description: 'Play Jetpack - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/jetpack.html'
},
{
name: 'Jetpack Joyride',
description: 'Play Jetpack Joyride - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/jetpack-joyride/index.html'
},
{
name: 'Jrpac',
description: 'Play Jrpac - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/jrpac.html'
},
{
name: 'Just Fall',
description: 'Play Just Fall - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/just-fall/index.html'
},
{
name: 'Justfall',
description: 'Play Justfall - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/justfall.html'
},
{
name: 'Kart64',
description: 'Play Kart64 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/kart64.html'
},
{
name: 'Kitchen Gun Game',
description: 'Play Kitchen Gun Game - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/kitchen-gun-game/index.html'
},
{
name: 'Knife Master',
description: 'Play Knife Master - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/knife-master/index.html'
},
{
name: 'Knifehit',
description: 'Play Knifehit - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/knifehit.html'
},
{
name: 'Knight',
description: 'Play Knight - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/knight.html'
},
{
name: 'Legends',
description: 'Play Legends - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/legends.html'
},
{
name: 'Lose95',
description: 'Play Lose95 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/lose95.html'
},
{
name: 'Louie',
description: 'Play Louie - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/louie.html'
},
{
name: 'Madalin Stunt Cars 2',
description: 'High-speed racing action in Madalin Stunt Cars 2',
category: 'Racing',
url: '/_app/tools/sz/2/madalin-stunt-cars-2/index.html'
},
{
name: 'Madalin Stunt Cars 3',
description: 'High-speed racing action in Madalin Stunt Cars 3',
category: 'Racing',
url: '/_app/tools/sz/2/madalin-stunt-cars-3/index.html'
},
{
name: 'Madden',
description: 'Play Madden - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/madden.html'
},
{
name: 'Magictiles',
description: 'Play Magictiles - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/magictiles/index.html'
},
{
name: 'Makesureitsclosed',
description: 'Play Makesureitsclosed - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/makesureitsclosed/index.html'
},
{
name: 'Marbleracemaker',
description: 'Play Marbleracemaker - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/MARBLERACEMAKER/index.html'
},
{
name: 'Mario Kart',
description: 'dont sue me :)',
category: 'Action',
url: '/_app/tools/mariokart/index.html'
},
{
name: 'Mariovsluigi',
description: 'Play Mariovsluigi - an exciting web game',
category: 'Platformer',
url: '/_app/tools/sz/3/mariovsluigi.html'
},
{
name: 'Marvelvscapcom',
description: 'Play Marvelvscapcom - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/MARVELVSCAPCOM/index.html'
},
{
name: 'Mc',
description: 'Play Mc - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/mc.html'
},
{
name: 'Mctd',
description: 'Play Mctd - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/mctd/index.html'
},
{
name: 'Mctd2',
description: 'Play Mctd2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/mctd2/index.html'
},
{
name: 'Merge Round Racers',
description: 'Play Merge Round Racers - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/merge-round-racers/index.html'
},
{
name: 'Mindustry',
description: 'Play Mindustry - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/mindustry/index.html'
},
{
name: 'Mine sweeper (scratch edition)',
description: 'minesweeper (with a space) made in scratch very nice animation. press space',
category: 'Puzzle',
url: '/_app/tools/mine-sweeper/index.html'
},
{
name: 'Minecraft',
description: 'I, am steve',
category: 'Sandbox',
url: '/_app/tools/minecraft/index.html'
},
{
name: 'Minekhan Main',
description: 'Play Minekhan Main - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/MineKhan-main/index.html'
},
{
name: 'Missiles',
description: 'Play Missiles - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/missiles/index.html'
},
{
name: 'Mktest',
description: 'Play Mktest - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/mktest.html'
},
{
name: 'Mktournament',
description: 'Play Mktournament - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/mktournament.html'
},
{
name: 'Moneyrush',
description: 'Play Moneyrush - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/MONEYRUSH/index.html'
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
name: 'Monster Tracks',
description: 'Play Monster Tracks - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/monster-tracks/index.html'
},
{
name: 'Moonlander',
description: 'Play Moonlander - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/moonlander/index.html'
},
{
name: 'Motox3M',
description: 'Extreme motorcycle stunt racing',
category: 'Racing',
url: '/_app/tools/sz/5/motox3m/index.html'
},
{
name: 'Motox3M Pool',
description: 'Extreme motorcycle stunt racing',
category: 'Racing',
url: '/_app/tools/sz/5/motox3m-pool/index.html'
},
{
name: 'Motox3M Spooky',
description: 'Extreme motorcycle stunt racing',
category: 'Racing',
url: '/_app/tools/sz/5/motox3m-spooky/index.html'
},
{
name: 'Motox3M Winter',
description: 'Extreme motorcycle stunt racing',
category: 'Racing',
url: '/_app/tools/sz/5/motox3m-winter/index.html'
},
{
name: 'Motox3M2',
description: 'Extreme motorcycle stunt racing',
category: 'Racing',
url: '/_app/tools/sz/5/motox3m2/index.html'
},
{
name: 'Ms Solitarie',
description: 'Play Ms Solitarie - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/ms-solitarie.html'
},
{
name: 'Msflight',
description: 'Play Msflight - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/msflight/index.html'
},
{
name: 'Mspac',
description: 'Play Mspac - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/mspac.html'
},
{
name: 'Musicball',
description: 'Play Musicball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/MUSICBALL/index.html'
},
{
name: 'Nba',
description: 'Play Nba - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/nba.html'
},
{
name: 'Nba02',
description: 'Play Nba02 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/nba02.html'
},
{
name: 'Neonflytron',
description: 'Play Neonflytron - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/NEONFLYTRON/index.html'
},
{
name: 'Neonsquareres',
description: 'Play Neonsquareres - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/neonsquareres/index.html'
},
{
name: 'Newsuper',
description: 'Play Newsuper - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/newsuper.html'
},
{
name: 'Nightwalk',
description: 'Play Nightwalk - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/nightwalk/index.html'
},
{
name: 'Ninjavsevilcorp',
description: 'Play Ninjavsevilcorp - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/7/ninjavsevilcorp/index.html'
},
{
name: 'Nogame',
description: 'Play Nogame - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/nogame.html'
},
{
name: 'Noob Steve Parkour',
description: 'Play Noob Steve Parkour - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/noob-steve-parkour/index.html'
},
{
name: 'Ocarina',
description: 'High-speed racing action in Ocarina',
category: 'Racing',
url: '/_app/tools/sz/3/ocarina.html'
},
{
name: 'Offlineparadise',
description: 'Play Offlineparadise - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/OfflineParadise/index.html'
},
{
name: 'Only Up',
description: 'Play Only Up - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/only-up/index.html'
},
{
name: 'Open',
description: 'Play Open - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/open.html'
},
{
name: 'Oregon Trail Game Master',
description: 'Play Oregon Trail Game Master - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/oregon-trail-game-master/index.html'
},
{
name: 'Osu',
description: 'Play Osu - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/osu/index.html'
},
{
name: 'Ovo',
description: 'Play Ovo - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/ovo/index.html'
},
{
name: 'Pacman 3D',
description: 'Play Pacman 3D - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/pacman-3d/index.html'
},
{
name: 'Papasbakeria',
description: 'Play Papasbakeria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papasbakeria/index.html'
},
{
name: 'Papasburgeria',
description: 'Play Papasburgeria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papasburgeria/index.html'
},
{
name: 'Papascheeseria',
description: 'Play Papascheeseria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papascheeseria/index.html'
},
{
name: 'Papascupcakeria',
description: 'Play Papascupcakeria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papascupcakeria/index.html'
},
{
name: 'Papasdonuteria',
description: 'Play Papasdonuteria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papasdonuteria/index.html'
},
{
name: 'Papasfreezeria',
description: 'Play Papasfreezeria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papasfreezeria/index.html'
},
{
name: 'Papaspastaria',
description: 'Play Papaspastaria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papaspastaria/index.html'
},
{
name: 'Papaspizzeria',
description: 'Play Papaspizzeria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papaspizzeria/index.html'
},
{
name: 'Papasscooperia',
description: 'Play Papasscooperia - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papasscooperia/index.html'
},
{
name: 'Papassushiria',
description: 'Play Papassushiria - an exciting web game',
category: 'Simulation',
url: '/_app/tools/sz/11/papassushiria/index.html'
},
{
name: 'Paper',
description: 'Play Paper - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/paper.html'
},
{
name: 'Paper Fold',
description: 'Play Paper Fold - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/paper-fold/index.html'
},
{
name: 'Paper2',
description: 'Play Paper2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/paper2.html'
},
{
name: 'Paperio2',
description: 'Play Paperio2 - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/1/paperio2/index.html'
},
{
name: 'Papery Planes',
description: 'Play Papery Planes - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/papery-planes/index.html'
},
{
name: 'Parking Fury 3',
description: 'Play Parking Fury 3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/parking-fury-3/index.html'
},
{
name: 'Parkour',
description: 'Play Parkour - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/PARKOUR/index.html'
},
{
name: 'Party3',
description: 'Play Party3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/party3.html'
},
{
name: 'Pedal to the Metal',
description: 'trust me, you have to listen to all the music in this game',
category: 'Action',
url: '/_app/tools/pttm/index.html'
},
{
name: 'Picky Package',
description: 'Play Picky Package - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/picky-package/index.html'
},
{
name: 'Pipe Riders',
description: 'Play Pipe Riders - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/pipe-riders/index.html'
},
{
name: 'Pixel Gun Survival',
description: 'Play Pixel Gun Survival - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/pixel-gun-survival/index.html'
},
{
name: 'Pixelgun',
description: 'Play Pixelgun - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/pixelgun/index.html'
},
{
name: 'Pizzatower',
description: 'Play Pizzatower - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/11/pizzatower/index.html'
},
{
name: 'Pizzeria',
description: 'Play Pizzeria - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/pizzeria.html'
},
{
name: 'Pokemon Red',
description: 'some emulator gmae',
category: 'Adventure',
url: '/_app/tools/pokemonred/index.html'
},
{
name: 'Pokey Stick',
description: 'Play Pokey Stick - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/pokey-stick/index.html'
},
{
name: 'Polybranch',
description: 'Play Polybranch - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/polybranch/index.html'
},
{
name: 'Polytrack',
description: 'Play Polytrack - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/polytrack/index.html'
},
{
name: 'Popcat Classic',
description: 'Play Popcat Classic - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/popcat-classic/index.html'
},
{
name: 'Portaboy',
description: 'Play Portaboy - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/portaboy.html'
},
{
name: 'Portalgo',
description: 'Play Portalgo - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/portalgo/index.html'
},
{
name: 'President Simulator',
description: 'Play President Simulator - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/president-simulator/index.html'
},
{
name: 'Pressing',
description: 'Play Pressing - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/pressing.html'
},
{
name: 'Protektor',
description: 'Play Protektor - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/protektor/index.html'
},
{
name: 'Push Your Luck',
description: 'Play Push Your Luck - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/push-your-luck/index.html'
},
{
name: 'Pvz1',
description: 'Play Pvz1 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/pvz1/index.html'
},
{
name: 'Q1K3',
description: 'Play Q1K3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/q1k3/index.html'
},
{
name: 'Racer',
description: 'Play Racer - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/racer/index.html'
},
{
name: 'Radius Raid',
description: 'Play Radius Raid - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/radius-raid/index.html'
},
{
name: 'Raft',
description: 'Play Raft - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/raft.html'
},
{
name: 'Raft2',
description: 'Play Raft2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/raft2.html'
},
{
name: 'Retro',
description: 'Play Retro - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/retro.html'
},
{
name: 'Retro Bowl',
description: 'Play Retro Bowl - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/retro-bowl/index.html'
},
{
name: 'Roadblocks',
description: 'Play Roadblocks - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/roadblocks/index.html'
},
{
name: 'Robogo',
description: 'Play Robogo - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/robogo.html'
},
{
name: 'Rocket League',
description: 'Play Rocket League - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/Rocket-League/index.html'
},
{
name: 'Rocketp',
description: 'Play Rocketp - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/rocketp/index.html'
},
{
name: 'Rolly Vortex',
description: 'Play Rolly Vortex - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/rolly-vortex/index.html'
},
{
name: 'Run1',
description: 'Play Run1 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/run1/index.html'
},
{
name: 'Run2',
description: 'Play Run2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/run2/index.html'
},
{
name: 'Run3',
description: 'Play Run3 - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/3/run3.html'
},
{
name: 'Sand Game',
description: 'Play Sand Game - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/sand-game/index.html'
},
{
name: 'Sansfight',
description: 'Play Sansfight - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/sansfight.html'
},
{
name: 'Santy Is Home',
description: 'Play Santy Is Home - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/santy-is-home/index.html'
},
{
name: 'Scooperia',
description: 'Play Scooperia - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/scooperia.html'
},
{
name: 'Scrabble',
description: 'something with words',
category: 'Puzzle',
url: '/_app/tools/scrab/index.html'
},
{
name: 'Scrapmetal',
description: 'Play Scrapmetal - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/scrapmetal/index.html'
},
{
name: 'Scratch Nextbots',
description: 'very legit gmae totally not made in scratch',
category: 'Action',
url: '/_app/tools/scratch-nextbots/index.html'
},
{
name: 'Shellshock',
description: 'Play Shellshock - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/shellshock/index.html'
},
{
name: 'Shuttledeck',
description: 'Play Shuttledeck - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/shuttledeck/index.html'
},
{
name: 'Sketchbook',
description: 'Play Sketchbook - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/sketchbook.html'
},
{
name: 'Sketchpad',
description: 'Play Sketchpad - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/sketchpad.html'
},
{
name: 'Sky Car Stunt',
description: 'High-speed racing action in Sky Car Stunt',
category: 'Racing',
url: '/_app/tools/sz/7/sky-car-stunt/index.html'
},
{
name: 'Slide',
description: 'Play Slide - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/slide/index.html'
},
{
name: 'Slime Rush Td',
description: 'Play Slime Rush Td - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/slime-rush-td/index.html'
},
{
name: 'Slope',
description: 'Roll a ball down an endless slope, avoiding obstacles',
category: 'Action',
url: '/_app/tools/sz/3/slope.html'
},
{
name: 'Slope 2',
description: 'Roll a ball down an endless slope, avoiding obstacles',
category: 'Action',
url: '/_app/tools/sz/2/slope-2/index.html'
},
{
name: 'Slope Ball',
description: 'Roll a ball down an endless slope, avoiding obstacles',
category: 'Action',
url: '/_app/tools/sz/6/slope-ball/index.html'
},
{
name: 'Slowroads',
description: 'Play Slowroads - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/slowroads/index.html'
},
{
name: 'Sm64',
description: 'Play Sm64 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/sm64/index.html'
},
{
name: 'Smallworldcup',
description: 'Play Smallworldcup - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/smallworldcup/index.html'
},
{
name: 'Smash',
description: 'Play Smash - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/smash.html'
},
{
name: 'Snakeio',
description: 'Play Snakeio - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/6/snakeio/index.html'
},
{
name: 'Sniper',
description: 'Play Sniper - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/sniper/index.html'
},
{
name: 'Sniperfixed',
description: 'Play Sniperfixed - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/SNIPERFIXED/index.html'
},
{
name: 'Snow Rider (3d)',
description: 'avoid litteraly everything appart from presents or something',
category: 'Action',
url: '/_app/tools/snowrider/index.html'
},
{
name: 'Snow Rider3D',
description: 'Play Snow Rider3D - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/snow-rider3d/index.html'
},
{
name: 'Snowbattle',
description: 'Play Snowbattle - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/2/snowbattle/index.html'
},
{
name: 'Soccer Random',
description: 'Play Soccer Random - an exciting web game',
category: 'Sports',
url: '/_app/tools/sz/3/soccer-random.html'
},
{
name: 'Solitaire',
description: 'something with cards idk',
category: 'Strategy',
url: '/_app/tools/solit/index.html'
},
{
name: 'Sonic2',
description: 'Play Sonic2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/sonic2.html'
},
{
name: 'Sort',
description: 'Play Sort - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/sort.html'
},
{
name: 'Sort The Court',
description: 'Play Sort The Court - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/sort-the-court/index.html'
},
{
name: 'Space Cadet Pinball',
description: 'Play Space Cadet Pinball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/space-cadet-pinball/index.html'
},
{
name: 'Spacebar',
description: 'Play Spacebar - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/spacebar.html'
},
{
name: 'Spacecompany',
description: 'Play Spacecompany - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/spaceCompany/index.html'
},
{
name: 'Stack Bump 3D',
description: 'Play Stack Bump 3D - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/stack-bump-3d/index.html'
},
{
name: 'Stackball',
description: 'Play Stackball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/stackball/index.html'
},
{
name: 'Star Battles',
description: 'defeat the destruction star (made by @Bombrrr and @Inglan)',
category: 'Action',
url: '/_app/tools/starbattles/index.html'
},
{
name: 'Starwarsmovie',
description: 'Play Starwarsmovie - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/StarWarsMovie.html'
},
{
name: 'Statesio',
description: 'Play Statesio - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/8/STATESIO/index.html'
},
{
name: 'Station 141',
description: 'Play Station 141 - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/5/station-141/index.html'
},
{
name: 'Station Meltdown',
description: 'Play Station Meltdown - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/7/station-meltdown/index.html'
},
{
name: 'Steal This Election',
description: 'Play Steal This Election - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/7/steal-this-election/index.html'
},
{
name: 'Stick Duel Battle',
description: 'Play Stick Duel Battle - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/4/stick-duel-battle/index.html'
},
{
name: 'Stickclimb',
description: 'Play Stickclimb - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/stickclimb/index.html'
},
{
name: 'Stickman Boost',
description: 'Play Stickman Boost - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/5/stickman-boost/index.html'
},
{
name: 'Stickman Epic Battle',
description: 'Play Stickman Epic Battle - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/6/stickman-epic-battle/index.html'
},
{
name: 'Stickman Golf',
description: 'Play Stickman Golf - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/5/stickman-golf/index.html'
},
{
name: 'Stickman Hook',
description: 'Play Stickman Hook - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/5/stickman-hook/index.html'
},
{
name: 'Stickmantourkart',
description: 'Play Stickmantourkart - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/8/STICKMANTOURKART/index.html'
},
{
name: 'Stormthehouse2',
description: 'Play Stormthehouse2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/stormthehouse2/index.html'
},
{
name: 'Stumbleguysig',
description: 'Play Stumbleguysig - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/StumbleGuysIG.html'
},
{
name: 'Stuntcars',
description: 'High-speed racing action in Stuntcars',
category: 'Racing',
url: '/_app/tools/sz/9/stuntcars/index.html'
},
{
name: 'Subway',
description: 'Play Subway - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/subway.html'
},
{
name: 'Superhot',
description: 'Time moves only when you move in this unique FPS',
category: 'Action',
url: '/_app/tools/sz/9/superhot/index.html'
},
{
name: 'Supermario',
description: 'Play Supermario - an exciting web game',
category: 'Platformer',
url: '/_app/tools/sz/4/SuperMario/index.html'
},
{
name: 'Supermarioconstruct',
description: 'Play Supermarioconstruct - an exciting web game',
category: 'Platformer',
url: '/_app/tools/sz/4/supermarioconstruct/index.html'
},
{
name: 'Supersmash',
description: 'Play Supersmash - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/supersmash.html'
},
{
name: 'Sushi Unroll',
description: 'Play Sushi Unroll - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/sushi-unroll/index.html'
},
{
name: 'Swerve',
description: 'Play Swerve - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/swerve/index.html'
},
{
name: 'Sword',
description: 'Play Sword - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/sword.html'
},
{
name: 'Synesthesia',
description: 'Play Synesthesia - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/synesthesia/index.html'
},
{
name: 'Tacomia',
description: 'Play Tacomia - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/tacomia.html'
},
{
name: 'Tactical Weapon Pack 2',
description: 'Play Tactical Weapon Pack 2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/tactical-weapon-pack-2/index.html'
},
{
name: 'Tank Trouble 2',
description: 'Play Tank Trouble 2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/5/tank-trouble-2/index.html'
},
{
name: 'Tanukisunset',
description: 'Play Tanukisunset - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/TANUKISUNSET/index.html'
},
{
name: 'Tekken3',
description: 'Play Tekken3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/tekken3.html'
},
{
name: 'Temple',
description: 'Play Temple - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/temple.html'
},
{
name: 'Tennis',
description: 'Play Tennis - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/tennis.html'
},
{
name: 'Tetris',
description: 'Classic block-stacking puzzle game',
category: 'Puzzle',
url: '/_app/tools/sz/3/tetris.html'
},
{
name: 'The Cube Master',
description: 'Play The Cube Master - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/the-cube-master/index.html'
},
{
name: 'The Final Earth',
description: 'rebuild earth on an intersting looking planet',
category: 'Sandbox',
url: '/_app/tools/the-final-earth/index.html'
},
{
name: 'The Hotel',
description: 'Play The Hotel - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/1/the-hotel/index.html'
},
{
name: 'The Jarsio',
description: 'some sort of horror gmae but only works on some mirrors (edutools.ingo.au)',
category: 'Horror',
url: '/_app/tools/jarred/jarred.html'
},
{
name: 'The Lost Ball',
description: 'Play The Lost Ball - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/the-lost-ball/index.html'
},
{
name: 'Thebowlingclub',
description: 'Play Thebowlingclub - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/thebowlingclub/index.html'
},
{
name: 'Theheist',
description: 'Play Theheist - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/10/theheist/index.html'
},
{
name: 'Thermomorph',
description: 'Play Thermomorph - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/thermomorph/index.html'
},
{
name: 'This is the only level',
description: 'do the same thing over and over again (but not)',
category: 'Uncategorized',
url: '/_app/tools/thisistheonlylevel/index.html'
},
{
name: 'Tic Tac Toe',
description: 'also called noughts and crosses if you are a bri',
category: 'Strategy',
url: '/_app/tools/tictactoe/index.html'
},
{
name: 'Tictacgpt',
description: 'Play Tictacgpt - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/tictacgpt/index.html'
},
{
name: 'Time Shooter 2',
description: 'Fast-paced shooting action in Time Shooter 2',
category: 'Action',
url: '/_app/tools/sz/5/time-shooter-2/index.html'
},
{
name: 'Timeshoot3',
description: 'Play Timeshoot3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/timeshoot3/index.html'
},
{
name: 'Timothy\'S Race',
description: 'Play Timothy\'S Race - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/timothy\'s-race/index.html'
},
{
name: 'Tiny Fishing',
description: 'Play Tiny Fishing - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/tiny-fishing/index.html'
},
{
name: 'Tomb',
description: 'Play Tomb - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/tomb/index.html'
},
{
name: 'Touch',
description: 'Play Touch - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/touch.html'
},
{
name: 'Towermaster',
description: 'Play Towermaster - an exciting web game',
category: 'Strategy',
url: '/_app/tools/sz/7/towermaster/index.html'
},
{
name: 'Townscaper',
description: 'Play Townscaper - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/townscaper/index.html'
},
{
name: 'Toy Defence',
description: 'another tower defence variant ig',
category: 'Strategy',
url: '/_app/tools/toy-defence/index.html'
},
{
name: 'Trade Craft',
description: 'a game where you trade items',
category: 'Clicker',
url: '/_app/tools/tradecraft/index.html'
},
{
name: 'Trafficjam',
description: 'Play Trafficjam - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/trafficjam/index.html'
},
{
name: 'Trainride',
description: 'Play Trainride - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/trainride/index.html'
},
{
name: 'Tube Jumpers',
description: 'Play Tube Jumpers - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/tube-jumpers/index.html'
},
{
name: 'Tunnel2',
description: 'Play Tunnel2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/tunnel2/index.html'
},
{
name: 'Tunnelrush',
description: 'Play Tunnelrush - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/tunnelrush.html'
},
{
name: 'Tv Static',
description: 'Play Tv Static - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/tv-static/index.html'
},
{
name: 'Typewriter',
description: 'Play Typewriter - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/typewriter/index.html'
},
{
name: 'Ultimateds',
description: 'Play Ultimateds - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/ULTIMATEDS/index.html'
},
{
name: 'Unfair',
description: 'Play Unfair - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/unfair.html'
},
{
name: 'Uno',
description: 'Play Uno - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/uno/index.html'
},
{
name: 'Verynormalshooter',
description: 'Fast-paced shooting action in Verynormalshooter',
category: 'Action',
url: '/_app/tools/sz/7/verynormalshooter/index.html'
},
{
name: 'Vex3',
description: 'Play Vex3 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/vex3/index.html'
},
{
name: 'Vex4',
description: 'Play Vex4 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/vex4/index.html'
},
{
name: 'Vex5',
description: 'Play Vex5 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/vex5/index.html'
},
{
name: 'Vex6',
description: 'Play Vex6 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/vex6/index.html'
},
{
name: 'Vex7',
description: 'Play Vex7 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/vex7/index.html'
},
{
name: 'Vmlinux',
description: 'Play Vmlinux - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/vmlinux/index.html'
},
{
name: 'Vvplane',
description: 'Play Vvplane - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/vvplane/index.html'
},
{
name: 'Wallsmash',
description: 'Play Wallsmash - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/11/wallsmash/index.html'
},
{
name: 'Waterworks',
description: 'Play Waterworks - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/waterworks/index.html'
},
{
name: 'Wbwwb',
description: 'Play Wbwwb - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/wbwwb.html'
},
{
name: 'Weavesilk',
description: 'Play Weavesilk - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/weavesilk/index.html'
},
{
name: 'Webgl Rollingsky',
description: 'Play Webgl Rollingsky - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/webgl-rollingsky/index.html'
},
{
name: 'Webosu',
description: 'Play Webosu - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/webosu/index.html'
},
{
name: 'Webretro',
description: 'Play Webretro - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/webretro/index.html'
},
{
name: 'Wheely6',
description: 'Play Wheely6 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/wheely6/index.html'
},
{
name: 'Win The Whitehouse',
description: 'Play Win The Whitehouse - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/4/win-the-whitehouse/index.html'
},
{
name: 'Wingeria',
description: 'Play Wingeria - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/wingeria.html'
},
{
name: 'Wolf3D',
description: 'Play Wolf3D - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/wolf3d/index.html'
},
{
name: 'Wordle',
description: 'Play Wordle - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/wordle/index.html'
},
{
name: 'World',
description: 'Play World - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/world.html'
},
{
name: 'Wounded Summer',
description: 'Play Wounded Summer - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/wounded-summer.html'
},
{
name: 'X Trial Racing',
description: 'High-speed racing action in X Trial Racing',
category: 'Racing',
url: '/_app/tools/sz/7/x-trial-racing/index.html'
},
{
name: 'Xx142 B2Exe',
description: 'Play Xx142 B2Exe - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/xx142-b2exe.html'
},
{
name: 'Yoshi',
description: 'Play Yoshi - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/3/yoshi.html'
},
{
name: 'Yoshifabrication',
description: 'Play Yoshifabrication - an exciting web game',
category: 'Action',
url: '/_app/tools/sz/8/yoshifabrication/index.html'
},
{
name: 'You Vs 100 Skibidi Toilets',
description: 'Play You Vs 100 Skibidi Toilets - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/you-vs-100-skibidi-toilets/index.html'
},
{
name: 'Youarejeffbezos',
description: 'Play Youarejeffbezos - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/7/youarejeffbezos/index.html'
},
{
name: 'Youvs100Sk',
description: 'Play Youvs100Sk - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/8/youvs100sk/index.html'
},
{
name: 'Youvs200Zom',
description: 'Play Youvs200Zom - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/9/YOUVS200ZOM/index.html'
},
{
name: 'Zelda3D',
description: 'Play Zelda3D - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/2/zelda3d/index.html'
},
{
name: 'Zombie Shooter',
description: 'Fast-paced shooting action in Zombie Shooter',
category: 'Action',
url: '/_app/tools/sz/8/ZOMBIE-SHOOTER/index.html'
},
{
name: 'Zombieshooter',
description: 'Fast-paced shooting action in Zombieshooter',
category: 'Action',
url: '/_app/tools/sz/8/ZOMBIESHOOTER/index.html'
},
{
name: 'Zombieshooterwaveofzoms',
description: 'Fast-paced shooting action in Zombieshooterwaveofzoms',
category: 'Action',
url: '/_app/tools/sz/8/ZOMBIESHOOTERWAVEOFZOMS/index.html'
},
{
name: 'Zombotron',
description: 'Play Zombotron - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/zombotron/index.html'
},
{
name: 'Zombotron 2',
description: 'Play Zombotron 2 - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/zombotron-2/index.html'
},
{
name: 'Zombotron 2 Time Machine',
description: 'Play Zombotron 2 Time Machine - an exciting web game',
category: 'Uncategorized',
url: '/_app/tools/sz/6/zombotron-2-time-machine/index.html'
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