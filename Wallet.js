class Wallet {
  constructor(setMoney) {
    let _money = setMoney;

    this.getWalletValue = () => _money;

    this.checkCanPlay = (value) => {
      if (_money >= value)
        return true;
      else
        return false;
    }

    this.changeWallet = (value, type = "+") => {
      if (typeof value === 'number' && !isNaN(value)) {
        if (type === "+") {
          return _money += value;
        } else if (type === "-") {
          return _money -= value;
        } else {
          throw new Error('Unknown type of working');
        }
      } else {
        throw new Error('Wrong number');
      }
    }
  }

}

export default Wallet;