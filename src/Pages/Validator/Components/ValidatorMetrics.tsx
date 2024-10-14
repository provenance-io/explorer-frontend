import Big from 'big.js';
import { Filters, Loading, Table } from '../../../Components';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useGetValidatorMetricsQuery, useGetValidatorMetricPeriodsQuery } from '../../../redux/services';
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
  // Get initial periods for dropdown
  const { data: availableMetricPeriods, isLoading: periodsLoading } =
    useGetValidatorMetricPeriodsQuery({
      address: validatorId,
    });
  // Format periods into a dropdown object
  const periods = availableMetricPeriods?.reduce(
    (
      acc: {
        [key: string]: {
          title: string;
          isDefault: boolean;
          year: number;
          quarter: number;
        };
      },
      cur,
      index
    ) => {
      acc[cur.label] = {
        title: cur.label,
        isDefault: index === 0,
        year: cur.year,
        quarter: cur.quarter,
      };
      return acc;
    },
    {}
  );
  // Data to populate filters
  const filterData = [
    {
      title: 'Period',
      type: 'dropdown',
      options: periods,
      action: (period: number) => {
        setDesiredQuarter(periods ? (periods[period].quarter as 1 | 2 | 3 | 4) : 1);
        setDesiredYear(periods ? periods[period].year : 2023);
      },
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
    // TODO: Uncomment when metrics are updated
    // {
    //   metric: 'Proposal Voting',
    //   value: `${validatorMetrics?.votingMetric.count}/${validatorMetrics?.votingMetric.total}`,
    // },
    {
      metric: 'Uptime',
      value: `${new Big(validatorMetrics?.uptimeMetrics.count || 0)
        .div(validatorMetrics?.uptimeMetrics.total || 1)
        .times(100)
        .round(2)
        .toString()}%`,
    },
    {
      metric: 'KYC Completed',
      value: `${validatorMetrics?.isVerified ? 'Yes' : 'No'}`,
    },
  ];
  return (
    <div>
      {isError && (
        <ErrorMessage>{`Data does not exist for quarter ${quarter}, ${year}`}</ErrorMessage>
      )}
      {validatorMetrics && !metricsLoading && !periodsLoading ? (
        <>
          <Filters filterData={filterData} mustApply={{ title: 'Apply', action: applyFilters }} />
          <Table
            tableHeaders={tableHeaders}
            tableData={tableData}
            isLoading={metricsLoading}
            title="Validator Metrics"
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
