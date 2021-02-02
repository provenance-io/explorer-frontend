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
    commissionRate = 'N/A',
    bondedTokens = 'N/A',
    bondedTokensDenomination = 'N/A',
    selfBonded = 'N/A',
    selfBondedPercent = 'N/A',
    selfBondedDenomination = 'N/A',
    delegatorBonded = 'N/A',
    delegatorBondedDenomination = 'N/A',
    delegatorBondedPercent = 'N/A',
    delegators = 'N/A',
    totalShares = 'N/A',
    commissionRewards = 'N/A',
    commissionRewardsDenomination = 'N/A',
    commissionRateRangeMin = 'N/A',
    commissionRateRangeMax = 'N/A',
    maxChangeRateEverytimeMin = 'N/A',
    maxChangeRateEverytimeMax = 'N/A',
  } = validatorCommission;

  const popupNoteBondedTokens = {
    visibility: { visible: showBondedPopup, setVisible: setShowBondedPopup },
    icon: { name: 'HELP', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      { title: 'Self-Bonded', value: `${numberFormat(selfBonded, 6)} ${selfBondedDenomination} (${selfBondedPercent} %)` },
      {
        title: 'Delegator Bonded',
        value: `${numberFormat(delegatorBonded, 6)} ${delegatorBondedDenomination} (${delegatorBondedPercent} %)`,
      },
    ],
  };
  const popupNoteCommissionRateRange = {
    visibility: { visible: showCommissionPopup, setVisible: setShowCommissionPopup },
    icon: { name: 'HELP', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [{ title: 'Gas Price', value: `${maxChangeRateEverytimeMin} ~ ${maxChangeRateEverytimeMax} %` }],
  };

  const summaryData = [
    { title: 'Commission Rate', value: `${numberFormat(commissionRate, 2)} %` },
    {
      title: 'Bonded Tokens',
      value: `${numberFormat(bondedTokens, 6)} ${bondedTokensDenomination}`,
      popupNote: popupNoteBondedTokens,
    },
    { title: 'Delegators', value: delegators },
    { title: 'Total Shares', value: numberFormat(totalShares, 6) },
    { title: 'Commission Rewards', value: `${numberFormat(commissionRewards, 6)} ${commissionRewardsDenomination}` },
    {
      title: 'Commission Rate Range',
      value: `${commissionRateRangeMin} ~ ${commissionRateRangeMax} %`,
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
