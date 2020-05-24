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