import Wallet from './Wallet.js';
import Statistics from './Statistics.js';
import Draw from './Draw.js';
import Result from './Result.js';

class Game {
  constructor(start) {
    this.stats = new Statistics();
    this.wallet = new Wallet(start);

    document.getElementById('start').addEventListener('click', this.startGame.bind(this));
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
      result = `You won ${wonMoney}$.`;
    } else if (!result && result !== '') {
      result = `You lost ${bid}$.`;
    } else {
      result = '';
    }

    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
  }

  startGame() {
    if (this.inputBid.value < 1)
      return alert('Amount of money you placed can not be less than 1$');

    const bid = Math.floor(this.inputBid.value);

    if (!this.wallet.checkCanPlay(bid))
      return alert('You do not have enough money to play');

    this.wallet.changeWallet(bid, '-');

    this.draw = new Draw();
    const colors = this.draw.getDrawResult();
    const win = Result.checkWinner(colors);
    const wonMoney = Result.moneyWinInGame(win, bid);
    this.wallet.changeWallet(wonMoney, '+');
    this.stats.addGameToStatistics(win, bid);

    this.render(colors, this.wallet.getWalletValue(), this.stats.showGameStatistics(), win, bid, wonMoney)

    document.getElementById('start').setAttribute('disabled', 'true');

    setTimeout(() => {
      document.getElementById('start').removeAttribute('disabled')
      this.inputBid.value = '';
    }, 2000);
  }
}

export default Game;