import { useState, Fragment } from 'react';
import { useParams } from 'react-router';
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

export const AccountCharts = () => {
  const [activeTableTab, setActiveTableTab] = useState(0);
  const { addressId } = useParams<{ addressId: string }>();
  const { data: accountHashData, isLoading: accountHashDataLoading } = useGetHashDataQuery({
    address: addressId,
  });
  // Note: This is only called if account has isVesting flag
  const {
    data: vestingData,
    isLoading: vestingDataLoading,
    error: vestingDataError,
  } = useGetVestingDataQuery({
    address: addressId,
  });
  const { matches: isMd } = useMediaQuery(breakpoints.down('md'));

  const hashData = accountHashTotals(accountHashData as unknown as HashDataProps);

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
