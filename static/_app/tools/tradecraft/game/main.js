var resNames = ["coin", "wood", "bricks", "copper", "iron", "silver", "gold", "plat", "emerald", "ruby", "opal", "amethyst", "citrine", "carbon", "diamond", "purplemetal", "bloodgem", "stardust"];
var values = [1, 2, 5, 10, 100, 250, 530, 1340, 5800, 24000, 82000, 450000, 1000000, 4500000, 14000000, 53000000, 160000000, 999999999];
var resources = [];
var i = 0;
var GLOBAL_CAP = 99999;
var manualScore = 0;
var tradingScore = 0;
var autoScore = 0;
var autoDealActive = false;
var muted = false;


for (i = 0; i < resNames.length; ++i) {
	resources.push({name: resNames[i], value: values[i], amt: 0, manual: 0, auto: 0});
}

resources[0].manual = 1;
var rows = 1;
var cols = 4;
var tradeMinRatio = 0.5;
var tradeMaxRatio = 1.5;
var onlyAffordable = false;
var helpValue = false;
var mobile;

var tutorialStage;



var audio = {};

function main() {
	mobile = mobilecheck();
	// DOM
	$("body").append("<div id='game'><img src='CoolmathGames-800x600.jpg' id='splash'></img><div id='resourceWrap'></div><div id='upgradeWrap'></div>");
	window.setInterval(resetLayout, 100);
	window.setTimeout(function() {$("#splash").fadeOut(800, function() {$(this).remove()})}, 1800)
	$table = $("<table id='dealTable' border=1></table>");
	$("#resourceWrap").append($table);
	
	for (var i = 0; i < 1; ++i) {
		addRow(i);
	}
	
	$("#upgradeWrap").append("<div class='upgrade bgGreen' onclick='buyUpgrade(0)'></div>");
	makeInventoryTable();
	
	$(".upgrade").append(upgrades[0][0].div())
	
	$("#game").append("<button id='mute' onclick='toggleMute()' class='mute'>Mute</button>");
	$("#game").append("<button id='new-game' onclick='confirmReset()'>New Game</button>");
	
	if (mobile) {
		resetLayout();
	}
	
	document.ontouchmove = function(event){
		event.preventDefault();
	}
	
	
	
	
	// audio
	var names = ["good_trade", "bad_trade"];
	for (var i = 0; i < names.length; ++i) {
		
		audio[names[i]] = new Audio("audio/" + names[i] + ".wav");
	}
	var multiNames = ['chop', 'brick', 'clang', 'coin', 'ding'];
	for (var i = 0; i < multiNames.length; ++i) {
		var name = multiNames[i];
		audio[name] = [];
		audio[name].curr = 0;
		for (var j = 0; j < 5; ++j) {
			var a = new Audio("audio/" + name + ".wav");
			audio[name].push(a);
		}
	}
	newGame();
	
	load();
}

function confirmReset() {
	var c = window.confirm("Are you sure you want to start a new game? All progress will be lost.");
	if (c) {
		wipe();
	}
}

function toggleMute() {
	if (muted) 
		muted = false; 
	else 
		muted = true; 
	$('#mute').toggleClass('muted');
}

function resetLayout() {
	fillDiv($("#game"));
}

function addRow(row) {
	$row = $("<tr id='dealRow" + row + "'></tr>")
	for (var j = 0; j < 4; ++j) {
		$row.append($("<td class='dealCell" + j + "' " + (j >= cols ? "style='visibility: hidden'" : "") + " onclick='makeTrade(this)'><div class='progress'></div></td>"));
	}
	$("#dealTable").append($row);
	rows = row + 1;
}

function autoDeal() {
	save();
	autoDealActive = true;
	randomDeal();
	window.setTimeout(autoDeal, 1001 + Math.random() * 2000);
	
}

function setAutoRes(res, ms) {
	var r = resources[res];
	if (r.auto === 0) {
		r.auto = ms;
		autoRes(res, ms);
	}
	else
		r.auto = ms;
	
}

function autoRes(res, ms) {
	getResource(res, 1);
	autoScore += resources[res].value;
	$("#autoScore").html(p(autoScore));
	window.setTimeout(function() {autoRes(res, resources[res].auto)}, ms);
}

function newGame(settings) {
	updateScore();
	tutorialStage = 0;
	//autoDeal();
}

function updateScore() {
	/*makeInventoryTable();*/
	var score = 0;
	for (var r in resources) {
		score += resources[r].value * resources[r].amt;
	}
	$("#score").html(p(score));
	
	
	
	return score;
}

function makeInventoryTable() {
	$("#resDisplay").remove();	
	var bestRes = 0;
	for (var i = 0; i < resources.length; ++i) {
		if (resources[i].amt > 0) {
			bestRes = i;
		}
	}
	if (bestRes === 0)
		bestRes = -1;
	var $table = $("<table id='resDisplay' border=1><tr></table>");
	var $a = $("<tbody>");
	var first = true;
	for (var i = 0; i < Math.min(bestRes + 2, resources.length); ++i) {
		$a.append(
		
			"<td" + (resources[i].manual > 0 ? " onclick='manualGet(" + i + ", " + resources[i].manual + ")' class='manual'" : "") + ">" + 
				"<div class='resVal'>" + (bestRes < 4 ? "Value: " : "") + p(resources[i].value) + "</div>" + 
				"<img class='resName' id='" + resources[i].name + "' src='graphics/" + resources[i].name + ".png'><br>" + 
				"<div class='resAmt' id='" + resources[i].name + "Amt'>" + resources[i].amt + "</div>" +
				"<div class='resText' id='" + resources[i].name + "Name'>" + resources[i].name + "</div>" +
			"</td>");
		if (i % 6 === 5)
			$a.append("<tr>");
		first = false;
	}
	
	$a.append("<tr><td colspan=10>Score: <span id='score'>0</span>" + 
			   "<tr><td colspan=10 id='stats'>" + 
						"Manual score: <span id='manualScore'>" + p(manualScore) + "</span>" + 
						"; Trading score: <span id='tradingScore'>" + p(tradingScore) + "</span>" + 
						"; Auto score: <span id='autoScore'>" + p(autoScore) + "</span>");
	$table.append($a);
	$("#dealTable").after($table);
	
}

function manualGet(res, amt) {
	var name;
	if (res === 0)
		name = "coin"
	else if (res === 1)
		name = "chop";
	else if (res === 2)
		name = "brick";
	else if ((res > 2 && res < 8) || res === 13 || res === 15)
		name = "clang";
	else
		name = 'ding';
	
	if (tutorialStage === 0 && resources[0].amt >= 15) {
		$("#dealTable").css("opacity", "1");
		createDeal("#dealRow0 .dealCell0", 0, 1, 50, 35);
		tutorialStage = 1;
	}
	if (tutorialStage === 2 && resources[0].amt >= 15) {
		$("#upgradeWrap").css("opacity", "1");
		tutorialStage = 3;
	}
	
	manualScore += resources[res].value * amt;
	$("#manualScore").html(p(manualScore));
	
	var a = audio[name][audio[name].curr++ % audio[name].length];
	a.volume = 0.2 + Math.random() * 0.5;
	if (!muted)
		a.play();
	getResource(res, amt);
}

function getResource(res, amt) {
	if ((amt < 0 && -amt <= resources[res].amt) || amt > 0) {
		resources[res].amt += amt;
		$("#" + resources[res].name + "Amt").html(resources[res].amt);
	}
	
	resources[res].amt = Math.min(resources[res].amt, GLOBAL_CAP);
	updateScore();
	updateBgs();
}

function createFloatText(s, x, y) {
	var $a = $("<div class='floatText'>" + (s > 0 ? "+" : "") + p(s) + "</div>");
	$a.css("top", y).css("left", x).css("color", s > 0 ? "#006600" : "#660000");
	
	$("#game").append($a);
	window.setTimeout(function() {$a.css("top", y - 40 * (Math.sign(+s))).css("opacity", 0)}, 0);
	window.setTimeout(function() {$a.remove()}, 2000);
}

function randomDeal() {
	var bestRes = 0;
	for (var i = 0; i < resources.length; ++i) {
		if (resources[i].amt > 0) {
			bestRes = i;
		}
	}
	do {
		var sellIndex = Math.floor(Math.random() * (bestRes + 2));  // resources to sell is random between worst one and the best player has + 1
		sellIndex = Math.max(0, Math.min(resources.length - 1, sellIndex));
	} while (resources[sellIndex].amt === 0 && sellIndex > 0)
	
	do {
		var buyIndex = Math.max(0, Math.min(resources.length - 1, 
		                                    bestRes + 1, 
											sellIndex - 3 + Math.floor(Math.random() * 7)));
	} while (Math.abs(buyIndex - sellIndex) === 0);
	var sellRes = resources[sellIndex];
	var buyRes = resources[buyIndex];
	var sell;
	if (onlyAffordable)
		sell = Math.floor(Math.random() * sellRes.amt) + 1;
	else 
		sell = Math.min((GLOBAL_CAP + 1) / 10 - 1, Math.max(1, Math.ceil((Math.random() + 0.2) * sellRes.amt)));
	
	var sellVal = sell * sellRes.value;
	var buy = Math.min((GLOBAL_CAP + 1) / 10 - 1, Math.round((sellVal / buyRes.value) * (tradeMinRatio + (tradeMaxRatio - tradeMinRatio) * Math.random())));
	if (buy === 0) {
		buy = 1;
		sell = Math.round((buyRes.value / sellRes.value) * (0.5 + Math.random()));
		if (onlyAffordable) {
			randomDeal();
			return;
		}
	}
	do {
		var row = Math.floor(Math.random() * rows);
		var col = Math.floor(Math.random() * cols);
		var q = "#dealRow" + row + " .dealCell" + col;
	} while ($(q + " .progress").css("width") !== "0px");
	createDeal(q, sellIndex, buyIndex, sell, buy);
	updateBgs();
}

function createDeal(q, sellIndex, buyIndex, sell, buy) {
	var sellRes = resources[sellIndex];
	var buyRes = resources[buyIndex];
	var img1 = new Image(24, 24);
	img1.src = "graphics/" + sellRes.name + ".png";
	var img2 = new Image(24, 24);
	img2.src = "graphics/" + buyRes.name + ".png";
	var $div1 = $("<div class='sell'>" + 
					"<span class='sellAmt'>" + sell + "</span>×" + 
					"<input type='hidden' value=" + resources.indexOf(sellRes) + ">" + 
					
				"</div>").append(img1)
	if (helpValue)
		$div1.append($("<div class='helpValue'>" + p(sellRes.value * sell) + "</div>"));;
	var $div2 = $("<div class='buy'>×<span class='buyAmt'>" + buy + "</span><input type='hidden' value=" + resources.indexOf(buyRes) + ">" + (helpValue ? ("<div class='helpValue'>" + p(buyRes.value * buy)) +"</div>" : "") + "</div>");
	$(img2).prependTo($div2);
	var $progress = $("<div class='progress'></div>");
	$div2.append($progress);
	window.setTimeout(function() {$(q + " .progress").css("width", "100%")});
	window.setTimeout(function() {$(q).html($div1).append($div2); updateBgs()}, 2000);
}

function makeTrade(e) {
	var sellAmt = +$($(e).children()[0].children[0]).html();
	var sellRes = +$($(e).children()[0].children[1]).val();
	var buyAmt = +$($(e).children()[1].children[1]).html();
	var buyRes = +$($(e).children()[1].children[2]).val();
	if (sellAmt <= resources[sellRes].amt) {
		getResource(sellRes, -sellAmt);
		getResource(buyRes, buyAmt);
		e = $(e);
		e.html("<div class='progress'></div>");
		e.removeClass("bgGreen bgRed");
		var sellValue = resources[sellRes].value * sellAmt;
		var buyValue = resources[buyRes].value * buyAmt;
		if (sellValue < buyValue && !muted) {
			audio.good_trade.play();
		}
		else if (sellValue > buyValue && !muted) {
			audio.bad_trade.play();
		}
		
		tradingScore += buyValue - sellValue;
		$("#tradingScore").html(p(tradingScore));
		createFloatText(buyValue - sellValue, e.position().left, e.position().top);
		
		if (tutorialStage === 1) {
			tutorialStage = 2;
			
		}
		
		updateBgs();
		makeInventoryTable();
	}
	
	updateScore();
	
}

function updateBgs() {
	for (var i = 0; i < rows; ++i) {
		for (var j = 0; j < cols; ++j) {
			var $cell = $("#dealRow" + i + " .dealCell" + j)[0];
			if ($cell.children.length > 1) {
				var sellAmt = +$($cell.children[0].children[0]).html();
				var sellRes = +$($cell.children[0].children[1]).val();
				$($cell).removeClass("bgGreen bgRed");
				if (sellAmt <= resources[sellRes].amt) {
					$($cell).addClass("bgGreen");
				}
				else {
					$($cell).addClass("bgRed");
				}
			}
		}
	}
	for (var i = 0; i < upgrades.length; ++i) {
		var upgrade = upgrades[i][0];
		if (typeof(upgrade) !== "undefined") {
			var div = $($("#upgradeWrap .upgrade")[i]);
			div.removeClass("bgRed bgGreen");
			if (upgrade.canBuy())
				div.addClass("bgGreen");
			else 
				div.addClass("bgRed");
		}
	}
}

function save() {
	// to save: resource object, amt of ups in each path, stats
	localStorage.setItem("tradingSave", JSON.stringify({resources: resources, upgrades: boughtUps, aS: autoScore, tS: tradingScore, mS: manualScore}));
}

function load() {
	var data = JSON.parse(localStorage.getItem("tradingSave"));
	if (data) {
		resources = data.resources;
		for (var i in resources) {
			if (resources[i].auto > 0) {
				autoRes(i, resources[i].auto);
			}
		}
		var u = data.upgrades;
		for (var path = 0; path < u.length; ++path) {
			for (var i = 0; i < u[path]; ++i) {
				upgrades[path][0].effect();
				upgrades[path].splice(0, 1);
				$($("#upgradeWrap .upgrade")[path]).html(upgrades[path][0].div());
			}
		}
		boughtUps = u;
		autoScore = data.aS;
		tradingScore = data.tS;
		manualScore = data.mS;
		
		$("#upgradeWrap").css("opacity", "1");
		$("#dealTable").css("opacity", "1");
		tutorialStage = 2;
		/*if (!autoDealActive) {
			autoDeal();
		}*/
		makeInventoryTable();
		return true;
	}	
	return false;
}

function wipe() {
	localStorage.removeItem("tradingSave");
	location.reload();
}


function totalSPS() {
	var sps = 0;
	for (var i = 0; i < resources.length; ++i) {
		if (resources[i].auto > 0)
			sps += (1000 / resources[i].auto) * resources[i].value;
	}
	return sps;
}

function p(number) {
	// return string with number with spaces
	var s = "";
	number = "" + number;
	s += number.slice(0, number.length % 3) + "&thinsp;";
	number = number.slice(number.length % 3);
	while (number.length > 0) {
		s += number.slice(0, 3) + "&thinsp;";
		number = number.slice(3);
	}
	return s;
}

window.mobilecheck = function () {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

//https://developer.amazon.com/docs/fire-tablets/ft-webapp-auto-scale-element.html
function fillDiv(div) {
  var currentWidth = 800;//div.outerWidth();
  var currentHeight = 600;//div.outerHeight();

  var availableHeight = window.innerHeight;
  var availableWidth = window.innerWidth;

  var scaleX = availableWidth / currentWidth;
  var scaleY = availableHeight / currentHeight;
  scaleX = Math.min(scaleX, scaleY);

  var translationX = Math.round((availableWidth - (currentWidth * scaleX)) / 2);
  var translationY = Math.round((availableHeight - (currentHeight * scaleY)) / 2);

  div.css({
    "position": "fixed",
    "left": "0px",
    "top": "0px",
    "-webkit-transform": "translate(" + translationX + "px, "
                                      + translationY + "px) scale3d("
                                      + scaleX + ", " + scaleX + ", 1)",
    "-webkit-transform-origin": "0 0"
  });
}
