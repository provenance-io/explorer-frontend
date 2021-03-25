import React, { useState, useEffect } from 'react';
import { Content, Summary, Loading } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { numberFormat, nHashtoHash } from 'utils';

const ValidatorCommission = () => {
  const [showBondedPopup, setShowBondedPopup] = useState(false);
  const [showCommissionPopup, setShowCommissionPopup] = useState(false);
  const { getValidatorCommission, validatorCommission, validatorCommissionLoading } = useValidators();
  const { validatorId } = useParams();
  // Get validatorCommission info on load
  useEffect(() => {
    getValidatorCommission(validatorId);
  }, [validatorId, getValidatorCommission]);

  const {
    commissionRate = {},
    bondedTokens = {},
    selfBonded = {},
    delegatorBonded = {},
    delegatorCount,
    totalShares,
    commissionRewards = {},
  } = validatorCommission;
  const { count: bondedTokensCount, denom: bondedTokensDenom } = bondedTokens;
  const { maxRate: commissionMaxRate, rate: commissionRateAmount } = commissionRate;
  const { amount: commissionRewardsAmount, denom: commissionRewardsDenom } = commissionRewards;
  const { count: delegatorBondedCount, denom: delegatorBondedDenom } = delegatorBonded;
  const { count: selfBondedCount, denom: selfBondedDenom } = selfBonded;

  const delegatorBondedPercent = `${numberFormat((delegatorBondedCount / bondedTokensCount) * 100, 2)} %`;
  const selfBondedPercent = `${numberFormat((selfBondedCount / bondedTokensCount) * 100, 2)} %`;
  const commisionRatePercent = `${numberFormat(commissionRateAmount * 100, 2)} %`;
  const commissionRatePercent = `${numberFormat(commissionMaxRate * 100, 2)} %`;

  const popupNoteBondedTokens = {
    visibility: { visible: showBondedPopup, setVisible: setShowBondedPopup },
    icon: { name: 'HELP', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: 'Self-Bonded:',
        value: `${nHashtoHash(selfBondedCount, { shorthand: false })} ${selfBondedDenom} (${selfBondedPercent})`,
      },
      {
        title: 'Delegator Bonded:',
        value: `${nHashtoHash(delegatorBondedCount, { shorthand: false })} ${delegatorBondedDenom} (${delegatorBondedPercent})`,
      },
    ],
  };
  const popupNoteCommissionRateRange = {
    visibility: { visible: showCommissionPopup, setVisible: setShowCommissionPopup },
    icon: { name: 'HELP', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
  };

  const summaryData = [
    { title: 'Commission Rate', value: commisionRatePercent },
    {
      title: 'Bonded Tokens',
      value: `${nHashtoHash(bondedTokensCount, { shorthand: false })} hash`,
      popupNote: popupNoteBondedTokens,
    },
    { title: 'Delegators', value: delegatorCount },
    { title: 'Total Shares', value: numberFormat(totalShares, 6) },
    { title: 'Commission Rewards', value: `${nHashtoHash(commissionRewardsAmount, { shorthand: false })} hash` },
    {
      title: 'Commission Rate Range',
      value: `0 ~ ${commissionRatePercent}`,
      popupNote: popupNoteCommissionRateRange,
    },
  ];

  return (
    <Content size="100%" title="Commission Information">
      {validatorCommissionLoading ? <Loading /> : <Summary data={summaryData} />}
    </Content>
  );
};

export default ValidatorCommission;
