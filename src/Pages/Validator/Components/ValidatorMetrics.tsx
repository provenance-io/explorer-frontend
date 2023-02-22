import Big from 'big.js';
import { Filters, Loading, Table } from 'Components';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useGetValidatorMetricsQuery } from 'redux/services';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.FONT_ERROR};
`;

// Function to calculate current quarter
const getQuarter = () => {
  const month = new Date().getMonth() + 1;
  return Math.ceil(month / 4);
};

export const ValidatorMetrics = () => {
  const { validatorId } = useParams<{ validatorId: string }>();
  const currYear = new Date().getFullYear();
  // Set state for year
  const [year, setYear] = useState(currYear);
  // Set state for quarter
  const [quarter, setQuarter] = useState<1 | 2 | 3 | 4>(getQuarter() as 1 | 2 | 3 | 4);
  // Set states for user desired quarter/year
  const [desiredYear, setDesiredYear] = useState(year);
  const [desiredQuarter, setDesiredQuarter] = useState(quarter);
  // Get the initial data
  const {
    data: validatorMetrics,
    isLoading: metricsLoading,
    isError,
  } = useGetValidatorMetricsQuery({
    address: validatorId,
    year,
    quarter,
  });
  // Data to populate filters
  const filterData = [
    {
      title: 'Year',
      type: 'number',
      min: 2020,
      max: currYear,
      action: (newYear: number) => setDesiredYear(newYear),
    },
    {
      title: 'Quarter',
      type: 'dropdown',
      options: {
        1: { title: '1', isDefault: getQuarter() === 1 },
        2: { title: '2', isDefault: getQuarter() === 2 },
        3: { title: '3', isDefault: getQuarter() === 3 },
        4: { title: '4', isDefault: getQuarter() === 4 },
      },
      action: (newQuarter: 1 | 2 | 3 | 4) => setDesiredQuarter(newQuarter),
    },
  ];
  const applyFilters = () => {
    setYear(desiredYear);
    setQuarter(desiredQuarter);
  };

  const tableHeaders = [
    { displayName: 'Metric', dataName: 'metric' },
    { displayName: 'Value', dataName: 'value' },
  ];

  const tableData = [
    {
      metric: 'Voting',
      value: `${validatorMetrics?.votingMetric.count}/${validatorMetrics?.votingMetric.total}`,
    },
    {
      metric: 'Uptime',
      value: `${new Big(validatorMetrics?.uptimeMetrics.count || 0)
        .div(validatorMetrics?.uptimeMetrics.total || 1)
        .times(100)
        .round(2)
        .toString()}%`,
    },
  ];
  return (
    <div>
      {isError && (
        <ErrorMessage>{`Data does not exist for quarter ${quarter}, ${year}`}</ErrorMessage>
      )}
      <Filters filterData={filterData} mustApply={{ title: 'Apply', action: applyFilters }} />
      {validatorMetrics ? (
        <Table
          tableHeaders={tableHeaders}
          tableData={tableData}
          isLoading={metricsLoading}
          title="Validator Metrics"
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};
