import { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Loading } from '../../../Components';
import { subtractDays } from '../../../utils';
import {
  useGetTxHistoryDataQuery,
  GranularityProps,
  TxHistoryProps,
} from '../../../redux/services';
import { TxChart } from '../../Dashboard/Components/TxHistory/Components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

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
    label: '1 week',
    value: 6,
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
  const defaultDateFormat = 'yyyy-MM-dd';
  const today = new Date();
  // For the Tx Dashboard, we want to match the TxHeatmap which runs from the past Sunday - Saturday
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

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDaysFrom(e.target.value);
    if (e.target.value === '365') {
      setTxHistoryGran('MONTH');
    } else {
      setTxHistoryGran('DAY');
    }
  };

  return (
    <Wrapper>
      {txHistoryDataLoading ? (
        <Loading />
      ) : (
        <TxChart
          txHistoryGran={txHistoryGran}
          data={txHistoryData as TxHistoryProps[]}
          span={daysFrom}
          today={today}
          showDayOfWeek={daysFrom === 6}
          title={`${
            daysFrom === 6
              ? 'Weekly Tx Data'
              : daysFrom === 60
              ? '2 Month Tx Data'
              : 'Yearly Tx Data'
          }`}
          grid={{
            left: '10%',
            right: '10%',
            bottom: '17%',
          }}
          legendPadding={20}
        />
      )}
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
    </Wrapper>
  );
};
