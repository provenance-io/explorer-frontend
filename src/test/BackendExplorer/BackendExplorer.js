import { useState, useEffect, useContext } from 'react';
import { BackendContext } from './context';
import { rng } from './utils/number';
import { repeatFunction } from './utils/function';
import {
  buildNewBlock,
  buildNewTx,
  buildTopValidators,
  buildTransactionHistory,
  buildBlockValidators,
  buildNewValidator,
} from './utils';

/*
  // Backend explorer is for local use only.
  // The purpose of backend explorer is the dynamically and continuously generate blockchain data and save it to the storage reducer
  // The storage reducer will clone its data onto the window object
  // Mock service worker will pull data out of the window object to return to the app components and XHR requests
*/

// Random Building Actions:
// Every random 30-90 seconds build a new transaction

const BackendExplorer = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [blockTimeout, setBlockTimeout] = useState('');
  const [txTimeout, setTxTimeout] = useState('');
  const {
    addBlock,
    addTx,
    blockHeight,
    blocksRecent,
    setTopValidators,
    setTransactionHistory,
    setValidators,
    topCount,
    txs,
  } = useContext(BackendContext);

  useEffect(() => {
    if (initialLoad) {
      // On initial load, build out 10 existing blocks, 10 existing transactions, and the top 10 validators
      const initialSetup = () => {
        if (initialLoad) {
          setInitialLoad(false);
          // Build out all users
          const validators = buildNewValidator();
          setValidators(validators);
          // Build initial top x [topCount] validators
          const topValidators = buildTopValidators(validators, topCount);
          setTopValidators(topValidators, topCount);
          // Build initial 20 day transaction history
          const transactionHistory = buildTransactionHistory(20);
          setTransactionHistory(transactionHistory);
          // Function to create a new block and add it to the store (build out 45 initial block)
          const createBlock = () => {
            const newBlock = buildNewBlock({ blockHeight });
            const blockValidators = buildBlockValidators();
            addBlock({ newBlock, blockValidators });
          };
          repeatFunction(createBlock, 45);
          // Function to create a new tx and add it to the store (build out 45 initial txs)
          const createTx = () => {
            const newTx = buildNewTx({ txs, blocksRecent });
            addTx(newTx);
          };
          repeatFunction(createTx, 45);
        }
      };

      // Every random 5-10 seconds build a new block
      const generateBlocks = () => {
        const rngInterval = rng(5000, 10000);
        const newBlockTimeout = setTimeout(() => {
          const newBlock = buildNewBlock({ blockHeight });
          const blockValidators = buildBlockValidators();
          addBlock({ newBlock, blockValidators });
          generateBlocks();
        }, rngInterval);
        setBlockTimeout(newBlockTimeout);
      };

      // Every random 30-90 seconds build a new tx
      const generateTxs = () => {
        const rngInterval = rng(30000, 90000);
        const newTxTimeout = setTimeout(() => {
          const newTx = buildNewTx({ txs, blocksRecent });
          addTx(newTx);
          generateTxs();
        }, rngInterval);
        setTxTimeout(newTxTimeout);
      };

      initialSetup();
      generateBlocks();
      generateTxs();
    }
  }, [
    addBlock,
    addTx,
    blockHeight,
    blocksRecent,
    blockTimeout,
    initialLoad,
    setTopValidators,
    setTransactionHistory,
    setValidators,
    topCount,
    txs,
    txTimeout,
  ]);

  // Cleanup blockTimeout when needed
  useEffect(
    () => () => {
      clearTimeout(blockTimeout);
    },
    [blockTimeout]
  );
  // Cleanup txTimeout when needed
  useEffect(
    () => () => {
      clearTimeout(txTimeout);
    },
    [txTimeout]
  );

  return null;
};

export default BackendExplorer;
