function continueGame()
{
	var turnCodeInput = $('#turnCodeInput').val();
	if (validTurnCode(turnCodeInput))
	{
		parseTurnCode(turnCodeInput)
	}
	else
	{
		$('#turnCodeInput').val("Invalid Turn Code!");
	}
}

function startGame()
{
	battleNum = 1;
	
	$('#game').removeClass('invisible');
	$('#landing').addClass('invisible');
	
	buildUnitDeck();
	shuffleUnitCards('test');
	shuffleTheaterCards('test');
	dealStartingHands();
	
	activePlayer = players["playerOne"];
	opposingPlayer = players["playerTwo"];
	drawTurn();
}

function dealStartingHands()
{
	players["playerOne"].hand = [];
	players["playerTwo"].hand = [];
	
	players["playerOne"].deployed = [];
	players["playerTwo"].deployed = [];
	
	for (let i = 0; i < 6; i++)
	{
		players["playerOne"].hand.push(unitCards.pop());
		players["playerTwo"].hand.push(unitCards.pop());
	}
}

function buildUnitDeck()
{
	unitCards.push(newCard(
		"REINFORCE", 
		1, 
		"Look at the top card of the deck. You may play it facedown to an adjacent theater.", 
		unitTypes.Land,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"AMBUSH", 
		2, 
		"FLIP a card in any theater.", 
		unitTypes.Land,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"MANEUVER", 
		3, 
		"FLIP a card in an adjacent theater.", 
		unitTypes.Land,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"AERODROME", 
		4, 
		"You may play cards of strength 3 or less to non-matching theaters.", 
		unitTypes.Air,
		unitAbilityTypes.Ongoing));
	unitCards.push(newCard(
		"CONTAINMENT", 
		5, 
		"If either player plays a card facedown, DISCARD that card with no effect.", 
		unitTypes.Air,
		unitAbilityTypes.Ongoing));
	unitCards.push(newCard(
		"",
		6,
		"",
		unitTypes.Air,
		unitAbilityTypes.None));
	unitCards.push(newCard(
		"SUPPORT", 
		1, 
		"You gain +3 strength in each adjacent theater.", 
		unitTypes.Air,
		unitAbilityTypes.Ongoing));
	unitCards.push(newCard(
		"AIR DROP", 
		2, 
		"On your next turn, you may play a card to a non-matching theater.", 
		unitTypes.Air,
		unitAbilityTypes.OnGoing));
	unitCards.push(newCard(
		"MANEUVER", 
		3, 
		"FLIP a card in an adjacent theater.", 
		unitTypes.Air,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"REDEPLOY", 
		4, 
		"Return 1 of your facedown cards to your hand. If you do, gain an extra turn.", 
		unitTypes.Sea,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"BLOCKADE", 
		5, 
		"If a card is played in an adjacent theater with 3 or more cards already in it (counting both players' cards), DISCARD that card with no effect.", 
		unitTypes.Sea,
		unitAbilityTypes.Ongoing));
	unitCards.push(newCard(
		"", 
		6, 
		"", 
		unitTypes.Sea,
		unitAbilityTypes.None));
	unitCards.push(newCard(
		"TRANSPORT", 
		1, 
		"You may MOVE 1 of your cards to a different theater.", 
		unitTypes.Sea,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"ESCALATION", 
		2, 
		"All of your facedown cards are now strength 4.", 
		unitTypes.Sea,
		unitAbilityTypes.Ongoing));
	unitCards.push(newCard(
		"MANEUVER", 
		3, 
		"FLIP a card in an adjacent theater.", 
		unitTypes.Sea,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"COVER FIRE", 
		4, 
		"All cards COVERED by this card are now strength 4.", 
		unitTypes.Land,
		unitAbilityTypes.Ongoing));
	unitCards.push(newCard(
		"DISRUPT", 
		5, 
		"Your opponent chooses and FLIPS 1 of their cards. Then you FLIP 1 of yours.", 
		unitTypes.Land,
		unitAbilityTypes.Instant));
	unitCards.push(newCard(
		"", 
		6, 
		"", 
		unitTypes.Land,
		unitAbilityTypes.None));
}