import { MyFieldsProps } from '..//proposals';

const GRANULARITY_TYPES = {
  DAY: 'DAY',
  HOUR: 'HOUR',
  MONTH: 'MONTH',
};

export const downloadData = () => {
  const myFields: MyFieldsProps[] = [
    {
      type: 'date',
      label: 'from date',
      field: 'fromDate',
    },
    {
      type: 'date',
      label: 'to date',
      field: 'toDate',
    },
    {
      type: 'dropdown',
      dropdown: GRANULARITY_TYPES,
      initialValue: GRANULARITY_TYPES.DAY,
      label: 'granularity',
      field: 'granularity',
    },
    {
      type: 'checkbox',
      label: 'Include advanced metrics',
      field: 'advancedMetrics',
    },
  ];
  return myFields;
};
