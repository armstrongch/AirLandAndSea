function parseTurnCode(turnCode)
{
	var aIndex = turnCode.indexOf("A");
	var bIndex = turnCode.indexOf("B");
	var cIndex = turnCode.indexOf("C");
	var dIndex = turnCode.indexOf("D");
	var eIndex = turnCode.indexOf("E");
	var fIndex = turnCode.indexOf("F");
	var gIndex = turnCode.indexOf("G");
	var hIndex = turnCode.indexOf("H");
	var iIndex = turnCode.indexOf("I");
	
	var activePlayerHand_code = turnCode.substring(0, aIndex);
	var activePlayerDeployed_code = turnCode.substring(aIndex+1, bIndex);
	var opposingPlayerHand_code = turnCode.substring(bIndex+1, cIndex);
	var opposingPlayerDeployed_code = turnCode.substring(cIndex+1, dIndex);
	var specialStatus_code = turnCode.substring(dIndex+1, eIndex);
	
	var battleNum_code = turnCode.substring(eIndex+1, fIndex);
	var activePlayerPoints_code = turnCode.substring(fIndex+1, gIndex);
	var opposingPlayerPoints_code = turnCode.substring(gIndex+1, hIndex);
	var theaterOrder_code = turnCode.substring(hIndex+1, iIndex);
	var activePlayer_code = turnCode.substring(iIndex+1);

	battleNum = parseInt(battleNum_code);
	
	$('#game').removeClass('invisible');
	$('#landing').addClass('invisible');
	
	buildUnitDeck();
	var theatreOrderString = theaterOrder[parseInt(theaterOrder_code)];
	theaterNames = [];
	for (let i = 0; i < 3; i++)
	{
		switch (parseInt(theatreOrderString.substring(i, i+1)))
		{
			case unitTypes.Air:
				theaterNames[i] = "Air";
				break;
			case unitTypes.Land:
				theaterNames[i] = "Land";
				break;
			case unitTypes.Sea:
				theaterNames[i] = "Sea";
				break;
		}
	}
	
	if (activePlayer_code == "2")
	{
		activePlayer = players["playerOne"];
		opposingPlayer = players["playerTwo"];
	}
	else
	{
		activePlayer = players["playerTwo"];
		opposingPlayer = players["playerOne"];
	}
	
	for (let i = 0; i < activePlayerHand_code.length; i += 2)
	{
		var cardCode = activePlayerHand_code.substring(i, i+2);
		opposingPlayer.hand.push(getCardFromCardCode(cardCode));
	}
	
	for (let i = 0; i < activePlayerDeployed_code.length; i += 3)
	{
		var cardCode = activePlayerDeployed_code.substring(i, i+3);
		opposingPlayer.deployed.push(getCardFromCardCode(cardCode));
	}
	
	for (let i = 0; i < opposingPlayerHand_code.length; i += 2)
	{
		var cardCode = opposingPlayerHand_code.substring(i, i+2);
		activePlayer.hand.push(getCardFromCardCode(cardCode));
	}
	
	for (let i = 0; i < opposingPlayerDeployed_code.length; i += 3)
	{
		var cardCode = opposingPlayerDeployed_code.substring(i, i+3);
		activePlayer.deployed.push(getCardFromCardCode(cardCode));
	}
	
	activePlayer.points = parseInt(activePlayerPoints_code);
	opposingPlayer.points = parseInt(opposingPlayerPoints_code);
	
	drawTurn();
	
	var specialStatusString = "<br/>";
	
	// If the previous player withdrew from the battle
	if (specialStatus_code == 1)
	{
		specialStatusString = opposingPlayer.name + " has withdrawn from the battle.";
		battleNum++;
		
		buildUnitDeck();
		shuffleUnitCards('test');
		shuffleTheaterCards('test');
		dealStartingHands();
		
		drawTurn();
		
		var firstScoringPlayer = getFirstScoringPlayer();
		if (firstScoringPlayer.name == activePlayer.name)
		{
			specialStatusString += " You will make the first move in battle number " + battleNum + ".";
		}
		else
		{
			specialStatusString += " " + opposingPlayer.name + " will make the first move in battle number " + battleNum + ".";
			$('#cardSubmissionDiv').addClass('invisible');
			$('#turnCodeDiv').removeClass('invisible');
			$('#turnCodeDiv').html("<p>Turn Code:</p><p>" + generateTurnCode("") + "</p>");
		}
	}
	// If both players have played all of their cards
	else if (activePlayer.hand.length == 0)
	{
		var playerOne_AirScore = getTheaterScore(unitTypes.Air, players["playerOne"]);
		var playerTwo_AirScore = getTheaterScore(unitTypes.Air, players["playerTwo"]);
		
		var playerOne_SeaScore = getTheaterScore(unitTypes.Sea, players["playerOne"]);
		var playerTwo_SeaScore = getTheaterScore(unitTypes.Sea, players["playerTwo"]);
		
		var playerOne_LandScore = getTheaterScore(unitTypes.Land, players["playerOne"]);
		var playerTwo_LandScore = getTheaterScore(unitTypes.Land, players["playerTwo"]);
		
	}
	
	
	// If a player has scored 12 points, (ending the game)
	if ((players["playerOne"].points >= 12) || (players["playerTwo"].points >= 12))
	{
		specialStatusString = "<br/>Game Over!";
		$('#cardSubmissionDiv').addClass('invisible');
		$('#turnCodeDiv').removeClass('invisible');
		$('#turnCodeDiv').html("<p>Turn Code:</p><p>" + generateTurnCode("") + "</p>");
	}

	$('#playerTurn').html($('#playerTurn').html() + "<br/>" + specialStatusString);
}

function getCardFromCardCode(cardCode)
{
	var updateCardStatus = false;
	if (cardCode.length == 2)
	{
		var cardStats = cardCodes[parseInt(cardCode)];
	}
	else
	{
		var cardStats = cardCodes[parseInt(cardCode.substring(0, 2))];
		var cardStatus = statusCodes[parseInt(cardCode.substring(2, 3))];
		updateCardStatus = true;
	}
	
	for (let i = 0; i < unitCards.length; i++)
	{
		if ((unitCards[i].strength == cardStats.strength) && (unitCards[i].type == cardStats.type))
		{
			if (updateCardStatus)
			{
				unitCards[i].theater = cardStatus.theater;
				unitCards[i].faceUp = cardStatus.faceUp;
			}
			return unitCards[i];
		}
	}
}

function generateTurnCode(specialStatus)
{
	var activePlayerHand = "";
	for (let i = 0; i < activePlayer.hand.length; i++)
	{
		activePlayerHand += getCardCode(activePlayer.hand[i]);
	}
	
	var activePlayerDeployed = "";
	for (let i = 0; i < activePlayer.deployed.length; i++)
	{
		activePlayerDeployed += getCardCode(activePlayer.deployed[i]);
		activePlayerDeployed += getStatusCode(activePlayer.deployed[i]);
	}
	
	var opposingPlayerHand = "";
	for (let i = 0; i < opposingPlayer.hand.length; i++)
	{
		opposingPlayerHand += getCardCode(opposingPlayer.hand[i]);
	}
	
	var opposingPlayerDeployed = "";
	for (let i = 0; i < opposingPlayer.deployed.length; i++)
	{
		opposingPlayerDeployed += getCardCode(opposingPlayer.deployed[i]);
		opposingPlayerDeployed += getStatusCode(opposingPlayer.deployed[i]);
	}
	
	var specialStatus_code = 0;
	if (specialStatus == "forfeit")
	{
		specialStatus_code = 1;
	}
	
	var activePlayerNum = 1;
	if (activePlayer.name == "Player Two")
	{
		activePlayerNum = 2;
	}
	
	var theaterOrderString = "";
	for (let i = 0; i < theaterNames.length; i++)
	{
		theaterOrderString += unitTypes[theaterNames[i]].toString();
	}
	var theaterOrderIndexString = theaterOrder.indexOf(theaterOrderString).toString();
	
	var miscInfoString =  specialStatus_code.toString() + "E" + battleNum.toString() + "F" + activePlayer.points.toString() + "G" + opposingPlayer.points.toString() + "H" + theaterOrderIndexString + "I" + activePlayerNum;
	
	var generatedTurnCode = activePlayerHand + "A" + activePlayerDeployed + "B" + opposingPlayerHand + "C" + opposingPlayerDeployed + "D" + miscInfoString;
	
	if (!validTurnCode(generatedTurnCode))
	{
		alert("Error! Failed to generate turn code. Please contact the developer!");
	}
	
	return generatedTurnCode;
}

function getCardCode(card)
{
	var cc = (card.strength - 1) + 6*card.type;
	if (cc < 10)
	{
		return "0" + cc.toString();
	}
	else
	{
		return cc.toString();
	}
}

function getStatusCode(card)
{
	var sc = parseInt(card.theater);
	if (!card.faceUp)
	{
		sc += 3
	}
	return sc.toString();
}

function validTurnCode(turnCode)
{
	const regex = /(\d{2})*(A{1})(\d{3})*(B{1})(\d{2})*(C{1})(\d{3})*(D{1})(\d{1})(E{1})(\d{1})+(F{1})(\d{1})+(G{1})(\d{1})+(H{1})(\d{1})(I{1})(\d{1})/;
	const found = turnCode.match(regex);
	if ((found != null) && (found[0] == turnCode))
	{
		return true;
	}
	else
	{
		return false;
	}
}

//0-5
var theaterOrder =
[
	"012",
	"021",
	"102",
	"120",
	"201",
	"210"
];

//0-5
var statusCodes =
[
	{theater: unitTypes.Air, faceUp: true},
	{theater: unitTypes.Land, faceUp: true},
	{theater: unitTypes.Sea, faceUp: true},
	{theater: unitTypes.Air, faceUp: false},
	{theater: unitTypes.Land, faceUp: false},
	{theater: unitTypes.Sea, faceUp: false}
];

//0-17
var cardCodes =
[
	{strength: 1, type: unitTypes.Air},
	{strength: 2, type: unitTypes.Air},
	{strength: 3, type: unitTypes.Air},
	{strength: 4, type: unitTypes.Air},
	{strength: 5, type: unitTypes.Air},
	{strength: 6, type: unitTypes.Air},
	{strength: 1, type: unitTypes.Land},
	{strength: 2, type: unitTypes.Land},
	{strength: 3, type: unitTypes.Land},
	{strength: 4, type: unitTypes.Land},
	{strength: 5, type: unitTypes.Land},
	{strength: 6, type: unitTypes.Land},
	{strength: 1, type: unitTypes.Sea},
	{strength: 2, type: unitTypes.Sea},
	{strength: 3, type: unitTypes.Sea},
	{strength: 4, type: unitTypes.Sea},
	{strength: 5, type: unitTypes.Sea},
	{strength: 6, type: unitTypes.Sea}
];