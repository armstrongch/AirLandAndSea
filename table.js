var battleNum = -1;
var theaterNames = ["Land", "Sea", "Air"];
var unitCards = [];
var unitTypes = 
{
	"Air": 0,
	"Land": 1,
	"Sea": 2
};
var unitAbilityTypes =
{
	"Instant": 0,
	"Ongoing": 1,
	"None": 2
}

function getTheaterScore(theater, player)
{
	var theaterScore = 0;
	for (let i = 0; i < player.deployed.length; i++)
	{
		var deployedCard = player.deployed[i];
		if (deployedCard.theater == theater)
		{
			if (!deployedCard.faceUp)
			{
				theaterScore += 2;
			}
			else
			{
				theaterScore += deployedCard.strength;
			}
		}
	}
	return theaterScore;
}

function getForfeitScore(firstScoringPlayer, numCards)
{
	if (firstScoringPlayer)
	{
		switch(numCards)
		{
			case 6:
			case 5:
			case 4:
				return 2;
			case 3:
			case 2:
				return 3;
			case 1:
				return 4;
			case 0:
				return 6;
		}
	}
	else
	{
		switch(numCards)
		{
			case 6:
			case 5:
				return 2;
			case 4:
			case 3:
				return 3;
			case 2:
				return 4;
			case 1:
			case 0:
				return 6;
		}
	}
}

function getFirstScoringPlayer()
{
	if (battleNum%2 == 1)
	{
		return players["playerOne"];
	}
	else
	{
		return players["playerTwo"];
	}
}

function newCard(nameText, strength, abilityText, type, abilityType)
{
	return {
		nameText: nameText,
		strength: strength,
		abilityText: abilityText,
		type: type,
		faceUp: true,
		abilityType: abilityType,
		theater: -1
	}
}

function shuffleUnitCards(seed)
{
	unitCards = shuffle(unitCards);
}

function shuffleTheaterCards(seed)
{
	theaterNames = shuffle(theaterNames);
}

var players = {
	playerOne: {
		hand: [],
		name: "Player One",
		points: 0,
		deployed: []
	},
	playerTwo: {
		hand: [],
		name: "Player Two",
		points: 0,
		deployed: []
	}
};