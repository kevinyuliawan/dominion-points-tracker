(function($, window, document) {
	var targets = ['province', 'duchy', 'estate', 'gardens', 'cards'];
	var buttons = ['minus', 'plus'];
	var inputs = [];
	var buttonTargets = [];
	var currentTarget;
	targets.forEach((item, index, enumerable) => {
		for(var i = 1; i<=4; i++){
			inputs.push('#' + item + i);
			buttonTargets.push('#' + buttons[0] + '-' + item + i); //since there's only two we can set them manually for now
			buttonTargets.push('#' + buttons[1] + '-' + item + i);
		}
	});

	var pointsMap = {
		'province': 6,
		'duchy': 3,
		'estate': 1
	};

	$(inputs.join(',')).change(function(){
		//map out points
		var playerMap = {
			1: 0, 2: 0, 3: 0, 4: 0
		}
		var curPlayer, curCard, value, points, cards;
		inputs.forEach((item, index, enumerable) => {
			curPlayer = item[item.length - 1];
			curCard = item.substring(1, item.length - 1);
			quantity = Number($(item).val()) || 0;
			if(curCard === 'province' || curCard === 'duchy' || curCard === 'estate'){
				points = quantity * pointsMap[curCard];
			}else if(curCard === 'gardens'){
				cards = Number($('#cards'+curPlayer).val()) || 0;
				points = Math.floor(cards/10) * quantity;
			}
			playerMap[curPlayer] += points;
		});

		//update points inputs
		var pointsInputs = ["#points1", "#points2", "#points3", "#points4"];
		pointsInputs.forEach(item => {
			curPlayer = item[item.length-1];
			if($(item).length > 0){
				$(item).val(playerMap[curPlayer]);
			}
		});
	});

	$('#reset').click(function(){
		var input;
		inputs.forEach(id => {
			input = $(id);
			curCard = id.substring(1, id.length - 1);
			if(input.length > 0){
				if(curCard === 'estate'){
					input.val(3);
				}else if(curCard === 'cards'){
					input.val(10);
				}else{
					input.val(0);
				}
				input.change();
			}
		});
	});

	var clickedButton, buttonType, buttonTarget, cardName;
	$(buttonTargets.join(',')).click(function(event){
		clickedButton = event.currentTarget.id;
		buttonType = clickedButton.substring(0, clickedButton.indexOf('-'));
		curPlayer = clickedButton[clickedButton.length - 1];
		cardName = clickedButton.substring(clickedButton.indexOf('-')+1, clickedButton.length - 1);
		buttonTarget = $('#' + cardName + curPlayer);
		cardTarget = $('#cards' + curPlayer);
		if(buttonType === 'plus'){
			buttonTarget.val(function(i, oldval) {
			  return ++oldval;
			});
			if(cardName !== 'cards'){ //update cards amount
				cardTarget.val(function(i, oldval) {
			  	return ++oldval;
				});
			}
		}else{
			buttonTarget.val(function(i, oldval) {
			  return --oldval;
			});
			if(cardName !== 'cards'){
				cardTarget.val(function(i, oldval) {
			  	return --oldval;
				});
			}
		}
		buttonTarget.change(); //manually trigger a recalculate
	});




}(window.jQuery, window, document));