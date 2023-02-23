import Big from 'big.js';
import { Filters, Loading, Table } from 'Components';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useGetValidatorMetricsQuery, useGetValidatorMetricPeriodsQuery } from 'redux/services';
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
  /** This tricky function reduces the array of available
   * periods from it's existing format into an object. It
   * formats the years into acceptable format for the dropdown
   * the Filter component expects. It also adds an object
   * that stores the valid quarters for each year. We then
   * use the quarters array to build the dropdown for quarters
   * in that filter */
  const yearsDropdown = availableMetricPeriods?.reduce(
    (
      acc: {
        [key: number]: {
          title: string;
          isDefault: boolean;
          validQuarters: {
            [key: number]: {
              title: string;
              isDefault?: boolean;
            };
          };
        };
      },
      cur
    ) => {
      if (acc[cur.year]) {
        acc[cur.year].validQuarters[cur.quarter] = {
          title: String(cur.quarter),
        };
      } else {
        acc[cur.year] = {
          title: String(cur.year),
          isDefault: currYear === cur.year,
          validQuarters: {
            // Just set default on the first one
            [cur.quarter]: { title: String(cur.quarter), isDefault: true },
          },
        };
      }
      return acc;
    },
    {}
  );
  // Data to populate filters
  const filterData = [
    {
      title: 'Year',
      type: 'dropdown',
      options: yearsDropdown,
      action: (newYear: number) => setDesiredYear(newYear),
    },
    {
      title: 'Quarter',
      type: 'dropdown',
      options: (yearsDropdown && yearsDropdown[desiredYear].validQuarters) || {
        1: { title: '1', isDefault: true },
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
