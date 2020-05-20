function getTheaterTableHTML()
{
	var theaterNamesTR = "";
	var opposingUnitsTR = "";
	var activeUnitsTR = "";
	
	for (let i = 0; i < theaterNames.length; i++)
	{
		theaterNamesTR += "<td class='centerAlignedTD'>" + theaterNames[i] + "</td>";
		var theater = -1;
		switch(theaterNames[i])
		{
			case "Land":
				theater = unitTypes.Land;
				break;
			case "Sea":
				theater = unitTypes.Sea;
				break;
			case "Air":
				theater = unitTypes.Air;
				break;
		}
		
		var opposingCardsHTML = "";
		for (let i = 0; i < opposingPlayer.deployed.length; i++)
		{
			if (opposingPlayer.deployed[i].theater == theater)
			{
				opposingCardsHTML += getUnitCardHTML(opposingPlayer.deployed[i], false);
			}
		}
		if (opposingCardsHTML.length == 0)
		{
			opposingCardsHTML = "(No Cards)";
		}
		opposingUnitsTR += "<td class='centerAlignedTD'>" + opposingCardsHTML + "</td>";
		
		var activeCardsHTML = "";
		for (let i = 0; i < activePlayer.deployed.length; i++)
		{
			if (activePlayer.deployed[i].theater == theater)
			{
				activeCardsHTML += getUnitCardHTML(activePlayer.deployed[i], false);
			}
		}
		if (activeCardsHTML.length == 0)
		{
			activeCardsHTML = "(No Cards)";
		}
		activeUnitsTR += "<td class='centerAlignedTD'>" + activeCardsHTML + "</td>";
	}
	
	return "<tr>"
	+ opposingUnitsTR
	+ "</tr>"
	+ "<tr>"
	+ theaterNamesTR
	+ "</tr>"
	+ "<tr>"
	+ activeUnitsTR
	+ "</tr>";
}

function getPlayerHandHTML(player)
{
	var returnHTML = "";
	for (let i = 0; i < player.hand.length; i++)
	{
		returnHTML += getUnitCardHTML(player.hand[i], true);
	}
	return returnHTML;
}

function getTheaterHTML(player, theater)
{
	var returnHTML = "";
	for (let i = 0; i < player.deployed.length; i++)
	{
		if (player.deployed[i].theater == theater)
		{
			returnHTML += getUnitCardHTML(player.deployed[i], false);
		}
	}
	return returnHTML;
}

function getUnitCardHTML(card, inHand)
{
	var tableClass = "";
	var imgSrc = "";
	switch(card.type)
	{
		case unitTypes.Land:
			tableClass = "landBack";
			imgSrc = "Land.png";
			break;
		case unitTypes.Sea:
			tableClass = "seaBack";
			imgSrc = "Sea.png";
			break;
		case unitTypes.Air:
			tableClass = "airBack";
			imgSrc = "Air.png";
			break;
	}
	
	var singleImgTag = "<img src='" + imgSrc + "'></img>";
	var imgTag = "";
	for (let i = 0; i < card.strength; i++)
	{
		imgTag += singleImgTag;
	}
	
	var abilitySymbol = "";
	switch(card.abilityType)
	{
		case unitAbilityTypes.Instant:
			abilitySymbol = "&#x1F5F2;";
			break;
		case unitAbilityTypes.Ongoing:
			abilitySymbol = "&infin;";
			break;
	}
	
	var displayedStrength = card.strength;
	var displayedNameText = card.nameText;
	var displayedAbilityText = card.abilityText;
	
	if (!card.faceUp)
	{
		tableClass = "unitImageBack";
		imgTag = "";
		displayedStrength = 2;
		abilitySymbol = "";
		displayedNameText = "";
		displayedAbilityText = "";
	}
	
	var handClass = "";
	if (inHand)
	{
		handClass = "unitCardDiv_hand";
	}
	
	return "<div class='unitCardDiv "
	+ handClass
	+ "' onclick='selectCard("
	+ card.strength
	+ ", "
	+ card.type
	+ ")'><table class='"
	+ tableClass
	+ " unitCardTable'><tr><td class='unitStrength'><strong>"
	+ displayedStrength
	+ "</strong></td><td class='unitAbilityText'><strong> "
	+ abilitySymbol
	+ " "
	+ displayedNameText
	+ "</strong><br/>"
	+ displayedAbilityText
	+ "</td></tr><tr class='unitImageBack'><td colspan='2'>"
	+ imgTag
	+ "</td></tr></table></div>";
}