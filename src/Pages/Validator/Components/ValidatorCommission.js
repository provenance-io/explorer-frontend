import React, { useState, useEffect } from 'react';
import { Content, Summary, Loading } from 'Components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { numberFormat } from 'utils';

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
  const { maxChangeRate: commissionMaxChangeRate, maxRate: commissionMaxRate, rate: commissionRateAmount } = commissionRate;
  const { amount: commissionRewardsAmount, denom: commissionRewardsDenom } = commissionRewards;
  const { count: delegatorBondedCount, denom: delegatorBondedDenom } = delegatorBonded;
  const { count: selfBondedCount, denom: selfBondedDenom } = selfBonded;

  const popupNoteBondedTokens = {
    visibility: { visible: showBondedPopup, setVisible: setShowBondedPopup },
    icon: { name: 'HELP', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: 'Self-Bonded:',
        value: `${numberFormat(selfBondedCount, 6)} ${selfBondedDenom} (${numberFormat(
          (selfBondedCount / bondedTokensCount) * 100,
          2
        )} %)`,
      },
      {
        title: 'Delegator Bonded:',
        value: `${numberFormat(delegatorBondedCount, 6)} ${delegatorBondedDenom} (${numberFormat(
          (delegatorBondedCount / bondedTokensCount) * 100,
          2
        )} %)`,
      },
    ],
  };
  const popupNoteCommissionRateRange = {
    visibility: { visible: showCommissionPopup, setVisible: setShowCommissionPopup },
    icon: { name: 'HELP', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [{ title: 'Gas Price', value: `0 ~ ${commissionMaxChangeRate} %` }],
  };

  const summaryData = [
    { title: 'Commission Rate', value: `${numberFormat(commissionRateAmount, 2)} %` },
    {
      title: 'Bonded Tokens',
      value: `${numberFormat(bondedTokensCount, 6)} ${bondedTokensDenom}`,
      popupNote: popupNoteBondedTokens,
    },
    { title: 'Delegators', value: delegatorCount },
    { title: 'Total Shares', value: numberFormat(totalShares, 6) },
    { title: 'Commission Rewards', value: `${numberFormat(commissionRewardsAmount, 6)} ${commissionRewardsDenom}` },
    {
      title: 'Commission Rate Range',
      value: `0 ~ ${commissionMaxRate} %`,
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
