var activePlayer = -1;
var opposingPlayer = -1;
var selectedCard = null;
var selectedCardIndex = -1;

function setupTurn()
{
	drawTurn();
}

function drawTurn()
{
	$('#playerTurn').html(activePlayer.name + "'s Turn:");
	$('#battleNum').html("Battle Number: " + battleNum);
	$('#handDiv').html(getPlayerHandHTML(activePlayer));
	$('#opponentHand').html("Opponent's Hand: " + opposingPlayer.hand.length + " Cards");
	$('#theaterTable').html(getTheaterTableHTML());
	$('#scoreP').html("Score:<br/>" + activePlayer.name + ": " + activePlayer.points + "<br/>" + opposingPlayer.name + ": " + opposingPlayer.points);
}

function selectCard(cardStrength, cardType)
{
	
	for (let i = 0; i < activePlayer.hand.length; i++)
	{
		var testCard = activePlayer.hand[i];
		if ((testCard.strength == cardStrength) 
		&& (testCard.type == cardType))
		{
			$('#cardNameSpan').html(testCard.nameText + " (" + cardStrength + ")");
			selectedCard = testCard;
			selectedCardIndex = i;
			$('#submitCardButton').prop('disabled', false);
		}
	}
}

function submitCard()
{
	var targetTheater = $('input[name=theater]:checked').val();
	var faceUp = $('input[name=faceUp]:checked').val();
	if (validCardSubmission(targetTheater, faceUp))
	{
		selectedCard.theater = targetTheater;
		selectedCard.faceUp = (faceUp == "true");
		activePlayer.hand.splice(selectedCardIndex, 1);
		activePlayer.deployed.push(selectedCard);
		drawTurn();
		$('#cardSubmissionDiv').addClass('invisible');
		$('#turnCodeDiv').removeClass('invisible');
		$('#turnCodeDiv').html("<p>Turn Code:</p><p>" + generateTurnCode() + "</p>");
	}
}

function validCardSubmission(targetTheater, faceUp)
{
	return true;
}