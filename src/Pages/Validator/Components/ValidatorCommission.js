import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Summary, Loading } from '../../../Components';
import { useValidators } from '../../../redux/hooks';
import { numberFormat, formatDenom } from '../../../utils';

const ValidatorCommission = () => {
  const [showBondedPopup, setShowBondedPopup] = useState(false);
  const { getValidatorCommission, validatorCommission, validatorCommissionLoading } =
    useValidators();
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
  const {
    maxChangeRate: commissionMaxChangeRate,
    maxRate: commissionMaxRate,
    rate: commissionRateAmount,
  } = commissionRate;
  const { amount: commissionRewardsAmount, denom: commissionRewardsDenom } = commissionRewards;
  const { count: delegatorBondedCount, denom: delegatorBondedDenom } = delegatorBonded;
  const { count: selfBondedCount, denom: selfBondedDenom } = selfBonded;

  const delegatorBondedPercent = `${numberFormat(
    (delegatorBondedCount / bondedTokensCount) * 100,
    2
  )} %`;
  const selfBondedPercent = `${numberFormat((selfBondedCount / bondedTokensCount) * 100, 2)} %`;
  const commisionRatePercent = `${numberFormat(commissionRateAmount * 100, 2)} %`;
  const commissionRatePercent = `${numberFormat(commissionMaxRate * 100, 2)} %`;
  const commissionMaxChangeRatePercent = `${numberFormat(commissionMaxChangeRate * 100, 2)} %`;

  const popupNoteBondedTokens = {
    visibility: { visible: showBondedPopup, setVisible: setShowBondedPopup },
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        title: 'Self-Bonded:',
        value: `${formatDenom(selfBondedCount, selfBondedDenom)} (${selfBondedPercent})`,
      },
      {
        title: 'Delegator Bonded:',
        value: `${formatDenom(
          delegatorBondedCount,
          delegatorBondedDenom
        )} (${delegatorBondedPercent})`,
      },
    ],
  };

  const summaryData = [
    { title: 'Commission Rate', value: commisionRatePercent },
    {
      title: 'Bonded Tokens',
      value: `${formatDenom(bondedTokensCount, bondedTokensDenom)}`,
      popupNote: popupNoteBondedTokens,
    },
    { title: 'Delegators', value: delegatorCount },
    { title: 'Total Shares', value: `${numberFormat(totalShares, 7)}` },
    {
      title: 'Commission Rewards',
      value: formatDenom(commissionRewardsAmount, commissionRewardsDenom),
    },
    { title: 'Commission Rate Range', value: `0 ~ ${commissionRatePercent}` },
    { title: 'Max Change Rate', value: commissionMaxChangeRatePercent },
  ];

  return (
    <Content size="100%" title="Commission Information">
      {validatorCommissionLoading ? <Loading /> : <Summary data={summaryData} />}
    </Content>
  );
};

export default ValidatorCommission;
