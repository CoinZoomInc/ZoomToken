var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'accuse vanish truly ring mixture advance pig sleep evil aware liar wet';

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },

    rinkeby: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/7a84d151adda400882fe2ffc40c7328c")
      },
      network_id: 4,
      gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
    },

    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/7a84d151adda400882fe2ffc40c7328c")
      },
      network_id: 3,
      gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
    },

    kovan: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://kovan.infura.io/v3/7a84d151adda400882fe2ffc40c7328c")
      },
      network_id: 42,
      gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
    },

    czlive: {
      network_id: 1,
      host: "54.218.97.121",
      port: 8545
      },

    mainnet: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://mainnet.infura.io/v3/7a84d151adda400882fe2ffc40c7328c")
        },
        network_id: 1,
        gas: 8000000 //make sure this gas allocation isn't over 4M, which is the max
        }

  },
};
