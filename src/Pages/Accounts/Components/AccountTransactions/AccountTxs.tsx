import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import styled from 'styled-components';
import { Content, Loading } from 'Components';
import { useTxs, useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { subtractDays } from 'utils';
import { AccountTxsChart } from '.';

const RadioButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input``;

const Label = styled.label`
  margin-left: 10px;
`;

export const AccountTxs = () => {
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const dayTo = format(today, defaultDateFormat);
  const [dayFrom, setDayFrom] = useState(7);

  const { accountTxByDate, accountTxByDateLoading, getAccountTxByDate } = useTxs();
  const { addressId: address } = useParams<{ addressId: string }>();
  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));

  // On initial load get the account tx history for the default time period (7 days)
  useEffect(() => {
    // Get initial txHistory
    getAccountTxByDate({
      address,
      toDate: dayTo,
      fromDate: format(subtractDays(new Date(), dayFrom - 1), defaultDateFormat),
    });
  }, [getAccountTxByDate, dayTo, address, dayFrom]);

  // Build the dataset based on the date range (7, 30, or 60 days) and count the number
  // of transactions and the fees if the account was the feepayer
  // Data structure:
  // Day   |  Number Txs  | Fees paid by this account
  // Current time complexity is O(n^2)
  const buildDataSet = (daysFrom: number) => {
    const txDataSet: { date: string; numTxs: number; fees: number }[] = [];
    // First, create the date array. Time complexity is just O(n) with max of 60 entries
    let index = 0;
    for (let i = daysFrom; i >= 0; i--) {
      txDataSet[index] = {
        date: format(subtractDays(new Date(), i), defaultDateFormat),
        numTxs: 0,
        fees: 0,
      };
      index++;
    }
    // Reset the index which will be used to iterate through the days
    index = daysFrom;
    // Then organize the transaction information
    accountTxByDate.forEach((tx) => {
      // Loop through the available dates until a match is found. This is also O(n) sadly
      while (tx.time.slice(0, 10) !== txDataSet[index].date) {
        index--;
        if (index === 0) break;
      }
      // If there is no time key, or the date isn't there, then increment index
      if (tx.time.slice(0, 10) === txDataSet[index].date) {
        // Otherwise, while the date is correct, add the tx to the count
        txDataSet[index].numTxs++;
        // If this address was the feepayer, add this to the fees there
        if (tx.feepayer.address === address)
          txDataSet[index].fees = txDataSet[index].fees + Number(tx.fee.amount);
      }
    });
    return txDataSet;
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDayFrom(e.target.value);
  };

  const radioButtons = [
    {
      label: '7 Days',
      value: 7,
    },
    {
      label: '30 Days',
      value: 30,
    },
    {
      label: '60 Days',
      value: 60,
    },
  ];

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      size={sizeMd || sizeSm ? '100%' : '50%'}
      icon="INVENTORY"
      title={`${dayFrom}-Day ${sizeMd || sizeSm ? 'Tx' : 'Transaction'} History`}
    >
      <RadioButtonGroup>
        {radioButtons.map((button) => (
          <div key={button.value}>
            <Input
              type="radio"
              id={button.label}
              key={button.value}
              name="radio-button"
              value={button.value}
              onClick={handleChange}
              defaultChecked={dayFrom === button.value}
            />
            <Label htmlFor="radio-button">{button.label}</Label>
          </div>
        ))}
      </RadioButtonGroup>
      {!accountTxByDateLoading ? (
        <>
          {/* TODO: CHANGE HARDCODED 7 TO RADIO BUTTONS */}
          {accountTxByDateLoading ? <Loading /> : <AccountTxsChart tx={buildDataSet(30)} />}
        </>
      ) : (
        <Loading />
      )}
    </Content>
  );
};
