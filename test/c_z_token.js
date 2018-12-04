const CZToken = artifacts.require('CZToken');
const expectEvent = require('../node_modules/openzeppelin-solidity/test/helpers/expectEvent');
const shouldFail = require('../node_modules/openzeppelin-solidity/test/helpers/shouldFail');
const { ZERO_ADDRESS } = require('../node_modules/openzeppelin-solidity/test/helpers/constants');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('CZToken', accounts => {
  let token;
  const owner = accounts[0];
  const anotherAccount = web3.eth.accounts[1];
  const recipient = web3.eth.accounts[2];

  beforeEach(async function () {
    token = await CZToken.new({ from: owner });
  });

  it('has a name', async function () {
    const name = await token.name();
    assert.equal(name, 'CoinZoom');
  });

  it('has a symbol', async function () {
    const symbol = await token.symbol();
    assert.equal(symbol, 'ZOOM');
  });

  it('has 18 decimals', async function () {
    const decimals = await token.decimals();
    assert(decimals.eq(18));
  });


  describe('balanceOf', function () {
    describe('when the requested account has no tokens', function () {
      it('returns zero', async function () {
        (await token.balanceOf(anotherAccount)).should.be.bignumber.equal(0);
      });
    });
  });

  describe('INITIAL_SUPPLY', function () {
    describe('Initial supply of tokens', function () {
      it('is correct', async function () {
        (await token.INITIAL_SUPPLY()).should.be.bignumber.equal(1000000000 * 10**18);
      });
    });
  });

  describe('transfer', function () {
    describe('when the recipient is not the zero address', function () {
      const to = recipient;
        describe('when the sender has enough balance', function () {
        const amount = 100;

        it('transfers the requested amount', async function () {
          await token.transfer(to, amount, { from: owner });
        });

        it('emits a transfer event', async function () {
          const { logs } = await token.transfer(to, amount, { from: owner });

          expectEvent.inLogs(logs, 'Transfer', {
            from: owner,
            to: to,
            value: amount,
          });
        });
      });
    });

    describe('when the recipient is the zero address', function () {
      const to = ZERO_ADDRESS;

      it('reverts', async function () {
        await shouldFail.reverting(token.transfer(to, 100, { from: owner }));
      });
    });
  });

  describe('approve', function () {
    describe('when the spender is not the zero address', function () {
      const spender = recipient;

      describe('when the sender has enough balance', function () {
        const amount = 1000;

        it('emits an approval event', async function () {
          const { logs } = await token.approve(spender, amount, { from: owner });

          expectEvent.inLogs(logs, 'Approval', {
            owner: owner,
            spender: spender,
            value: amount,
          });
        });

        describe('when there was no approved amount before', function () {
          it('approves the requested amount', async function () {
            await token.approve(spender, amount, { from: owner });

            (await token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });

        describe('when the spender had an approved amount', function () {
          beforeEach(async function () {
            await token.approve(spender, 1, { from: owner });
          });

          it('approves the requested amount and replaces the previous one', async function () {
            await token.approve(spender, amount, { from: owner });

            (await token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });
      });
    });
  });


});
