import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useValidators } from 'redux/hooks';
import { BlockImage, Content, Loading, PopupDataProps, Summary as BaseSummary } from 'Components';
import { capitalize, getFormattedDate, maxLength, numberFormat } from 'utils';
import { breakpoints } from 'consts';
// import { ValidatorMetrics } from './ValidatorMetrics';

const Summary = styled(BaseSummary)`
  border: 10px solid white;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  flex-basis: 100%;
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  gap: 40px;

  @media ${breakpoints.up('sm')} {
    text-align: center;
    grid-template-columns: 1fr 1fr;
  }

  @media ${breakpoints.up('lg')} {
    text-align: center;
    grid-template-columns: 0.75fr 1fr 1fr;
  }
`;

const SpotlightContainer = styled.div`
  grid-column: auto;
  @media ${breakpoints.up('sm')} {
    /* For remove validator metrics */
    /* grid-column: span 2; */
  }
  @media ${breakpoints.up('lg')} {
    grid-column: auto;
  }
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 10px 0;
  font-size: 1.7rem;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  font-style: italic;
  margin: 0 auto;
  margin-top: 10px;
`;

const Status = styled.div<{ status: string }>`
  background: ${({ theme, status }) => theme[`CHIP_${status?.toUpperCase()}`]};
  color: ${({ theme }) => theme.FONT_WHITE};
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  max-width: 100px;
`;

const ValidatorSpotlight = () => {
  const [showOperatorAddressPopup, setShowOperatorAddressPopup] = useState(false);
  const { getValidatorSpotlight, validatorSpotlight, validatorSpotlightLoading } = useValidators();
  const { validatorId } = useParams<{ validatorId: string }>();

  useEffect(() => {
    getValidatorSpotlight(validatorId);
  }, [getValidatorSpotlight, validatorId]);

  const {
    blockCount = { count: 0, total: 0 },
    bondHeight = '--',
    consensusPubKey,
    description,
    imgUrl,
    jailedUntil,
    moniker,
    ownerAddress,
    operatorAddress,
    status,
    unbondingHeight,
    uptime,
    url,
    votingPower, // defaults to null, so the default here doesn't work
    withdrawalAddress,
  } = validatorSpotlight;

  const isJailed = status === 'jailed';
  const { count: votingPowerCount, total: votingPowerTotal } = votingPower || {};
  const votingPowerPercent = numberFormat((votingPowerCount / votingPowerTotal) * 100, 2);
  const { count: missedBlocksCount, total: missedBlocksTotal } = blockCount;

  const operatorAddressPopupNote: PopupDataProps = {
    visibility: { visible: showOperatorAddressPopup, setVisible: setShowOperatorAddressPopup },
    noteMinWidth: '300px',
    position: 'left',
    icon: { name: 'HELP_OUTLINE', size: '1.7rem' },
    method: ['click', 'hover'],
    fontColor: 'FONT_WHITE',
    data: [
      {
        hideTitle: true,
        title: 'Explanation',
        value:
          'The address you used to create a validator, delegate, withdraw delegator reward, etc',
      },
    ],
  };

  const summaryData = [
    {
      title: 'Operator Address',
      value: maxLength(operatorAddress, 11, '3'),
      copy: operatorAddress,
      popupNote: operatorAddressPopupNote,
    },
    {
      title: 'Owner Address',
      value: maxLength(ownerAddress, 11, '3'),
      copy: ownerAddress,
      link: `/accounts/${ownerAddress}`,
    },
    {
      title: 'Withdraw Address',
      value: maxLength(withdrawalAddress, 11, '3'),
      copy: withdrawalAddress,
      link: `/accounts/${withdrawalAddress}`,
    },
    ...(!isJailed
      ? [
          {
            title: 'Voting Power',
            value: `${votingPowerPercent}%`,
          },
          {
            title: 'Uptime',
            value: `${numberFormat(uptime, 2)}%`,
          },
          {
            title: 'Missed Blocks',
            value: `${numberFormat(missedBlocksCount)} in ${numberFormat(missedBlocksTotal)}`,
          },
          {
            title: 'Bond Height',
            value: numberFormat(bondHeight),
          },
        ]
      : [
          {
            title: 'Jailed Until',
            value: jailedUntil ? getFormattedDate(new Date(jailedUntil)) : 'unknown',
          },
          {
            title: 'Unbonding Height',
            value: unbondingHeight,
          },
        ]),
    {
      title: 'Consensus Pubkey',
      value: maxLength(consensusPubKey, 11, '3'),
      copy: consensusPubKey,
    },
  ];

  return (
    <Content>
      {validatorSpotlightLoading ? (
        <Loading />
      ) : (
        <>
          <Grid>
            <SpotlightContainer>
              <ImageContainer>
                <BlockImage icon={imgUrl} moniker={moniker} address={operatorAddress} />
              </ImageContainer>
              <Row>
                <Title title={moniker}>{maxLength(moniker, 18)}</Title>
              </Row>
              {url && (
                <Row title={moniker}>
                  <a
                    href={url}
                    title={`${maxLength(moniker, 18)} url link`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url}
                  </a>
                </Row>
              )}
              {description && (
                <Row>
                  <Description>{description}</Description>
                </Row>
              )}
            </SpotlightContainer>
            <div>
              <Status status={status}>{capitalize(status)}</Status>
              <Summary data={summaryData} />
            </div>
            {/* <ValidatorMetrics /> */}
          </Grid>
        </>
      )}
    </Content>
  );
};

export default ValidatorSpotlight;
