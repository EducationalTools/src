var upgrades = [[], [], []];
var boughtUps = [0, 0, 0];
var debug = false;
function Upgrade(name, cost, tooltip, effect) {
	this.name = name;
	this.cost = cost;
	this.tooltip = tooltip;
	this.effect = effect;
	
	this.buy = function() {
		
		if (this.canBuy()) {
			this.effect();
			for (var i in this.cost) {
				getResource(i, -this.cost[i]);
			}
			return true;
		}
		return false;
	}
	
	this.canBuy = function() {
		if (debug)
			return true;
		var canBuy = true;
		for (var i in this.cost) {
			if (resources[i].amt < this.cost[i]) {
				canBuy = false;
				return false;
			}
		}
		return true;
	}
	
	this.div = function() {
		var costDiv = "<div class='upCost'>";
		for (var i in this.cost) {
			costDiv += "<div class='upCostRes'><span class='upCostResAmt'>" + this.cost[i] + "×</span><img src='graphics/" + resources[i].name + ".png'>"+ "</div>";
		}
		costDiv += "</div>";
		return $(
				/*"<div class='upgrade bgGreen' onclick='buyUpgrade(0)'>" +
					"<div class='upName'>" + this.name + "</div>" + 
					costDiv +
					"<div class='upTooltip'>" + this.tooltip + "</div>" + 
					
					
				"</div>");*/
					"<div class='upName'>" + this.name + "</div>" + 
					costDiv +
					"<div class='upTooltip'>" + this.tooltip + "</div>");
	}
}

upgrades[0].push(
	new Upgrade("Work gloves", {0: 30, 1: 10}, "This is your first upgrade. Lets you click for wood.", function() {newManual(1, 1)}),
	new Upgrade("More deals!", {0: 30, 1: 20, 2: 10}, "Start getting more trading deals. Each resource has certain value, try to gain value by trading.", autoDeal),
	new Upgrade("Money!", {0: 150, 1: 10, 2: 10}, "Each click on the coin gives you two coins.", function(){newManual(0, 2)}),
	new Upgrade("DIY brick set", {0: 60, 2: 20}, "Lets you get bricks manually.", function() {newManual(2, 1)}),
	new Upgrade("Iron axe", {1: 20, 4: 2}, "Mine wood twice as fast!", function() {newManual(1, 2)}),
	new Upgrade("Multitasking", {2: 10, 3: 8, 4: 5}, "Open another upgrade path and always have two upgrades to choose from!", function() {newPath(1)}),
	new Upgrade("Spaaace", {1: 25, 2: 10, 3: 20}, "Gain 4 additional tiles for deals.", function() {addRow(1)}),
	
	new Upgrade("Mine cart", {0: 300, 1: 200, 4: 10}, "Mine copper. Clang.", function() {newManual(3, 1)}),
	new Upgrade("Utility tech tree", {5: 5, 6: 1}, "Open third upgrade path focusing on unique upgrades affecting trade offers.", function() {newPath(2)}),
	new Upgrade("Making money 101", {0: 500, 5: 5, 6: 2}, "Gain 10 coins with each click! ", function() {newManual(0, 10)}),
	
	new Upgrade("Metal detector", {7: 5, 8: 5, 9: 2}, "Collect iron faster than ever before! Well, that is not that hard tbh...", function() {newManual(4, 1)}),
	new Upgrade("Jewelry training", {0: 3000, 6: 5, 9: 1}, "Learn to use hammer in more delicate way and create silver.", function() {newManual(5, 1)}),
	new Upgrade("Philosopher's stone", {0: 6000, 5: 40, 10: 1}, "Everything is gold!", function() {newManual(6, 1)}),
	
	new Upgrade("[Clever name]", {1: 6000, 8: 40, 11: 1}, "[Clever tooltip explaining you can click on platinum now]", function() {newManual(7, 1)}),
	new Upgrade("And so on", {10: 10, 11: 10}, "I think you get the pattern already", function() {newManual(8, 1)}),
	new Upgrade("Ruby", {10: 20, 11: 20, 12: 5}, "No, not that programming language.", function() {newManual(9, 1)}),
	new Upgrade("Opal. Probably", {10: 200, 11: 200, 13: 10}, "Or do you know other blue gemstones?", function() {newManual(10, 1)}),
	new Upgrade("Purple gem", {11: 200, 14: 10, 15: 1}, "Some say it is amethyst.", function() {newManual(11, 1)}),
	new Upgrade("End.", {}, "You bought all the upgrades for manual resource gain. Grats. ", function() {})
);

upgrades[1].push(
	new Upgrade("Invest", {0: 600}, "Gain money automatically. Passive income, the dream.", function() {setAutoRes(0, 1000)}),
	new Upgrade("Treants", {1: 800, 5: 10}, "Trees go to your inventory on their own.", function() {setAutoRes(1, 1000)}),
	new Upgrade("Tiny golems", {0: 5000, 2: 1000, 6: 4}, "Golems make bricks out of themselves. It is brutal but you get bricks from it.", function() {setAutoRes(2, 2000)}),
	new Upgrade("Lawyer", {0: 3000}, "Double the amount of coins you gain automatically!", function() {setAutoRes(0, 500)}),
	new Upgrade("Motherload machine", {5: 50, 6: 30, 7: 10}, "Gain copper over time! And a bit of iron on top of that!", function() {setAutoRes(3, 1000); setAutoRes(4, 10000)}),
	new Upgrade("Silver and gold!", {7: 10, 8: 3, 9: 1}, "Gain silver and gold automatically. Somehow...", function() {setAutoRes(5, 1000); setAutoRes(6, 5000)}),
	new Upgrade("Autoplat", {8: 10, 9: 3, 10: 1}, "I don't see platinum often, but it is always above gold in games...", function() {setAutoRes(7, 1000)}),
	new Upgrade("Shine!", {9: 10, 10: 5, 11: 1}, "Gems! All mine! Get it? Mine?", function() {setAutoRes(8, 1000); setAutoRes(9, 1000)}),
	new Upgrade("Blue gems...", {10: 10, 11: 5, 13: 2}, "You can collect those too...", function() {setAutoRes(10, 1000)}),
	new Upgrade("The last one", {10: 100, 12: 50, 13: 20}, "This is the rarest resource you can get automatically.", function() {setAutoRes(11, 1000)}),
	
	new Upgrade("This one is finished.", {}, "You bought all the upgrades for automatic resource gain. Grats.", function() {})
)

upgrades[2].push(
	
	new Upgrade("Wide connections", {0: 1000, 5: 30, 6: 10}, "Add 4 additional tiles for trades.", function() {addRow(2); rows=3}),
	new Upgrade("Calculator", {5: 15, 6: 10, 7: 5}, "Displays value of resources you are selling and buying.", function() {helpValue = true}),
	new Upgrade("Subscribe GFMAG", {6: 30, 7: 10}, "All the deals are about 20% better (and cooler).", function() {tradeMinRatio = 0.6; tradeMaxRatio = 1.8}),
	new Upgrade("Bribe them all", {8: 100, 9: 50, 10: 20}, "Get only offers you can afford.", function() {onlyAffordable = true}),

	
	new Upgrade("Nothing more.", {}, "You bought all the utility upgrades. Grats. If you have an idea for an interesting upgrade you want to see here, let me know and I will name it after you.", function() {})
)

function buyUpgrade(path) {
	if (upgrades[path].length > 1 && upgrades[path][0].buy()) {
		boughtUps[path] += 1;
		$($("#upgradeWrap .upgrade")[path]).html(upgrades[path][1].div());
		upgrades[path].splice(0, 1);
		updateBgs();
	}
	if (tutorialStage === 3) {
		/*if (!autoDealActive) {
			autoDeal();
		}*/
		tutorialStage = 4;
		createDeal("#dealRow0 .dealCell0", 1, 2, 30, 20);
	}
}

function newPath(path) {
	$("#upgradeWrap").append("<div class='upgrade bgGreen' onclick='buyUpgrade(" + path + ")'></div>");
	$(".upgrade:nth-child(" + (path + 1) + ")").append(upgrades[path][0].div())
}

function newManual(res, amt) {
	resources[res].manual = amt;
	makeInventoryTable();
}

function upgradeWidth() {
	cols = 4;
	$("td").css("visibility", "visible");
}
