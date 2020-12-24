const gameSummary = {
	numbers: '',
	wins: '',
	losses: '',
	draws: '',
};

const game = {
	playerHand: '',
	aiHand: '',
};

choosePlayerHand = document.querySelector('[data-summary="your-choice"]');
chooseAiHand = document.querySelector('[data-summary="ai-choice"]');
gameWinner = document.querySelector('[data-summary="who-win"]');
gameNumbers = document.querySelector('.panel-right .numbers span');

const hands = [...document.querySelectorAll('.select img')];

const handSelection = function () {
	game.playerHand = this.dataset.option;
	hands.forEach(hand => {
		hand.style.boxShadow = '';
	});
	this.style.boxShadow = '0 0 10px 2px #8f8fef';
};

hands.forEach(hand => {
	hand.addEventListener('click', handSelection);
});

function aiChoise() {
	aiHand = hands[Math.floor(Math.random() * hands.length)].dataset.option;
	return aiHand;
}

function checkResult(player, ai) {
	if (player === ai) {
		return 'draw';
	} else if (
		(player === 'kamień' && ai === 'nożyczki') ||
		(player === 'nożyczki' && ai === 'papier') ||
		(player === 'papier' && ai === 'kamień')
	) {
		return 'win';
	} else return 'loss';
}

function publishResult(player, ai, result) {
	choosePlayerHand.textContent = player;
	chooseAiHand.textContent = ai;
	gameNumbers.textContent = ++gameSummary.numbers;

	if (result === 'win') {
		wins = document.querySelector(
			'.panel-right .wins span'
		).textContent = ++gameSummary.wins;
		gameWinner.textContent = result;
		gameWinner.style.color = 'green';
	} else if (result === 'loss') {
		losses = document.querySelector(
			'.panel-right .losses span'
		).textContent = ++gameSummary.losses;
		gameWinner.textContent = result;
		gameWinner.style.color = 'red';
	} else if (result === 'draw') {
		draws = document.querySelector(
			'.panel-right .draws span'
		).textContent = ++gameSummary.draws;
		gameWinner.textContent = result;
		gameWinner.style.color = 'grey';
	}
}

function endGame() {
	game.playerHand = '';
	game.aiHand = '';
	hands.forEach(hand => (hand.style.boxShadow = ''));
}

const btnPlay = document.querySelector('.start');

function letsPlay() {
	if (!game.playerHand) return alert('Została nie wybrana dłoń. Proszę wybrać');

	game.aiHand = aiChoise();

	const gameResult = checkResult(game.playerHand, game.aiHand);

	publishResult(game.playerHand, game.aiHand, gameResult);

	endGame();
}

btnPlay.addEventListener('click', letsPlay);
