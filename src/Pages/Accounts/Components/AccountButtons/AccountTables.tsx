import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from '@provenanceio/wallet-lib';
import { MultiTable, Section as BaseSection } from 'Components';
// import { useMediaQuery } from 'redux/hooks';
// import { breakpoints } from 'consts';
import { useAccounts } from 'redux/hooks';
import { formatDenom, isEmpty } from 'utils';
import {
  AccountAssets,
  AccountDelegations,
  AccountDelegationsOwner,
  AccountRewards,
  AccountUnbondings,
  AccountAttributes,
} from './Components';

const Section = styled(BaseSection)`
  max-width: 100%;
`;

export const AccountTables = () => {
  // const { matches: sizeMd } = useMediaQuery(breakpoints.down('md'));
  const { walletService } = useWallet();
  const { addressId } = useParams<{ addressId: string }>();
  const {
    state: { address: delegatorAddress },
  } = walletService;
  const [activeTableTab, setActiveTableTab] = useState(0);
  const {
    accountAssetsTotal,
    accountInfo,
    accountDelegationsTotal: { amount, denom },
    accountRewards,
    accountUnbondingTotal: { amount: uAmount, denom: uDenom },
    accountRedelegationsTotal: { amount: rAmount },
  } = useAccounts();

  const isOwnAccount = addressId === delegatorAddress;
  const totalDelegations = formatDenom(Number(amount), denom, { decimal: 2 });
  // Determine total awards for Rewards title
  const haveRewards = !isEmpty(accountRewards);
  const totalRewards =
    haveRewards && accountRewards.total.length > 0
      ? `${formatDenom(Number(accountRewards.total[0].amount), accountRewards.total[0].denom, {
          decimal: 2,
          minimumFractionDigits: 2,
        })}`
      : '0 hash';
  // Determine total amount unbonding
  const totalUnbondings = formatDenom(
    parseFloat(rAmount || '0') + parseFloat(uAmount || '0'),
    uDenom,
    {
      decimal: 2,
    }
  );

  return (
    <Section>
      <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
        <AccountAssets key={`Assets (${accountAssetsTotal})`} />
        {isOwnAccount ? (
          <AccountDelegationsOwner key={`Delegations (${totalDelegations})`} />
        ) : (
          <AccountDelegations key={`Delegations (${totalDelegations})`} />
        )}
        <AccountUnbondings key={`Unbondings (${totalUnbondings})`} />
        <AccountRewards key={`Rewards (${totalRewards})`} />
        <AccountAttributes
          key={`Attributes (${accountInfo.attributes ? accountInfo.attributes.length : 0})`}
        />
      </MultiTable>
    </Section>
  );
};

//   const getLargeSize = () => (
//     <>
//       <Section>
//         <AccountAssets />
//       </Section>
//       <Section>
//         {isOwnAccount ? <AccountDelegationsOwner /> : <AccountDelegations />}
//         <AccountUnbondings />
//       </Section>
//       <Section>
//         <AccountRewards />
//         <AccountAttributes />
//       </Section>
//     </>
//   );

//   const getMediumSize = () => (
//     <>
//       <Section>
//         <AccountAssets />
//       </Section>
//       <Section>{isOwnAccount ? <AccountDelegationsOwner /> : <AccountDelegations />}</Section>
//       <Section>
//         <AccountUnbondings />
//       </Section>
//       <Section>
//         <AccountRewards />
//       </Section>
//       <Section>
//         <AccountAttributes />
//       </Section>
//     </>
//   );

//   return sizeMd ? getMediumSize() : getLargeSize();
// };
