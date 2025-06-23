import { useState, Fragment } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import {
  HashDataProps,
  useGetHashDataQuery,
  useGetVestingDataQuery,
} from '../../../../redux/services/accounts';
import { Content, MultiTable, Loading } from '../../../../Components';
import { accountHashTotals } from '../../../../utils';
import { useMediaQuery } from '../../../../redux/hooks';
import { breakpoints } from '../../../../consts';
import {
  AccountVestingChart,
  AccountVestingTable,
  AccountHashChart,
  AccountHashTable,
} from './Components';

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

export const AccountCharts = () => {
  const [activeTableTab, setActiveTableTab] = useState(0);
  const { addressId } = useParams<{ addressId: string }>();
  const { data: accountHashData, isLoading: accountHashDataLoading } = useGetHashDataQuery({
    address: addressId,
  });
  const [continuousPeriod, setContinuousPeriod] = useState<'DAY' | 'MONTH' | 'YEAR'>('DAY');
  // Note: This is only called if account has isVesting flag
  const {
    data: vestingData,
    isLoading: vestingDataLoading,
    error: vestingDataError,
  } = useGetVestingDataQuery({
    address: addressId,
    continuousPeriod,
  });
  const { matches: isMd } = useMediaQuery(breakpoints.down('md'));

  const hashData = accountHashTotals(accountHashData as unknown as HashDataProps);

  // Add radio options for continuousPeriod
  const periodOptions = [
    { label: 'Day', value: 'DAY' },
    { label: 'Month', value: 'MONTH' },
    { label: 'Year', value: 'YEAR' },
  ];

  return (
    <Content justify="center" alignItems="center" size={isMd ? '100%' : '60%'}>
      {vestingData && !vestingDataError ? (
        accountHashDataLoading || vestingDataLoading ? (
          <Loading />
        ) : (
          <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
            <Fragment key="Hash Info">
              <AccountHashChart hashData={hashData} isLoading={accountHashDataLoading} />
              <AccountHashTable hashData={hashData} isLoading={accountHashDataLoading} />
            </Fragment>
            <Fragment key="Vesting Info">
              {/* Radio buttons for selecting continuousPeriod */}
              <RadioButtonGroup>
                {periodOptions.map((option) => (
                  <div key={String(option.value)}>
                    <Input
                      type="radio"
                      id={`period-${option.value}`}
                      name="continuous-period"
                      value={option.value}
                      checked={continuousPeriod === option.value}
                      onChange={() => setContinuousPeriod(option.value as 'DAY' | 'MONTH' | 'YEAR')}
                    />
                    <Label htmlFor={`period-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioButtonGroup>
              {vestingDataLoading ? <Loading /> : <AccountVestingChart data={vestingData} />}
              <AccountVestingTable data={vestingData} isLoading={vestingDataLoading} />
            </Fragment>
          </MultiTable>
        )
      ) : (
        <>
          <AccountHashChart hashData={hashData} isLoading={accountHashDataLoading} />
          <AccountHashTable hashData={hashData} isLoading={accountHashDataLoading} />
        </>
      )}
    </Content>
  );
};
