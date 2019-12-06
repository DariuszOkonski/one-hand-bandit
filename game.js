import Wallet from './Wallet.js';
import Statistics from './Statistics.js';
import Draw from './Draw.js';
import Result from './Result.js';

class Game {
  constructor(start) {
    this.stats = new Statistics();
    this.wallet = new Wallet(start);

    document.getElementById('start').addEventListener('click', this.startGame);
    this.spanWallet = document.querySelector('.wallet');
    this.boards = [...document.querySelectorAll('.color')];
    this.inputBid = document.getElementById('bid');
    this.spanResult = document.querySelector('.score span.result');
    this.spanGames = document.querySelector('.score span.number');
    this.spanWins = document.querySelector('.score span.win');
    this.spanLosses = document.querySelector('.score span.loss');

    this.render();
  }

  render(colors = ['#2ee', '#2ee', '#2ee'], money = this.wallet.getWalletValue(), stats = [0, 0, 0], result = "", bid = 0, wonMoney = 0) {
    this.boards.forEach((board, index) => {
      board.style.backgroundColor = colors[index];
    });

    this.spanWallet.textContent = money + '$';

    if (result) {
      result = `You won ${wonMoney}`;
    } else if (!result && result !== '') {
      result = `You lost ${bid}`;
    } else {
      result = '';
    }

    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
  }

  startGame() {
    console.log(this)
  }
}

export default Game;