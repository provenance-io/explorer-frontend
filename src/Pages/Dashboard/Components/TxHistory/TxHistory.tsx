import { useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { format } from 'date-fns';
import { Button, Content, Loading } from '../../../../Components';
import { useMediaQuery } from '../../../../redux/hooks';
import { breakpoints } from '../../../../consts';
import { subtractDays } from '../../../../utils';
import { useGetTxHistoryDataQuery, GranularityProps, TxHistoryProps } from '../../../../redux/services';
import { DownloadCsvModal, TxChart } from './Components';

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

const radioButtons = [
  {
    label: '2 weeks',
    value: 14,
  },
  {
    label: '2 months',
    value: 60,
  },
  {
    label: '1 year',
    value: 365,
  },
];

interface TxHistoryChartProps {
  // If address is provided, will render for account information
  address?: string;
  // For split views, default is 50%
  size?: '100%' | '50%';
}

export const TxHistory = ({ address, size = '50%' }: TxHistoryChartProps) => {
  // Modal controls
  const [modalOpen, deactivateModalOpen, activateModalOpen] = useToggle(false);
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  const dayTo = format(today, defaultDateFormat);
  const [daysFrom, setDaysFrom] = useState(radioButtons[0].value);
  const defaultGranularity = 'DAY';

  const [txHistoryGran, setTxHistoryGran] = useState<GranularityProps>(defaultGranularity);

  const {
    data: txHistoryData,
    isLoading: txHistoryDataLoading,
    error: txHistoryDataError,
  } = useGetTxHistoryDataQuery({
    fromDate: format(subtractDays(today, daysFrom), defaultDateFormat),
    toDate: dayTo,
    granularity: txHistoryGran.toUpperCase() as GranularityProps,
    address,
  });

  const { matches: sizeSm } = useMediaQuery(breakpoints.down('sm'));
  const { matches: sizeMd } = useMediaQuery(breakpoints.between('sm', 'md'));

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDaysFrom(e.target.value);
    if (e.target.value === '365') {
      setTxHistoryGran('MONTH');
    } else {
      setTxHistoryGran('DAY');
    }
  };

  return (
    <Content
      alignItems="flex-start"
      alignContent="flex-start"
      size={size === '50%' ? (sizeMd || sizeSm ? '100%' : '50%') : size}
      icon="INVENTORY"
      title={`${txHistoryData && txHistoryData.length > 0 ? `${daysFrom}-Day` : ''} ${
        sizeMd || sizeSm ? 'Tx' : 'Transaction'
      } Activity`}
      link={!address ? { to: '/txs', title: 'View All' } : {}}
    >
      {txHistoryData && !txHistoryDataError && (
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
                defaultChecked={daysFrom === button.value}
              />
              <Label htmlFor="radio-button">{button.label}</Label>
            </div>
          ))}
        </RadioButtonGroup>
      )}
      {txHistoryDataLoading ? (
        <Loading />
      ) : (
        <TxChart
          txHistoryGran={txHistoryGran}
          data={txHistoryData as TxHistoryProps[]}
          span={daysFrom}
          today={today}
          title=""
        />
      )}
      {txHistoryData && !txHistoryDataError && (
        <Button onClick={activateModalOpen}>Generate CSV</Button>
      )}
      <DownloadCsvModal modalOpen={modalOpen} onClose={deactivateModalOpen} address={address} />
    </Content>
  );
};
