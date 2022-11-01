import * as yup from 'yup';

export const downloadValidations = () =>
  yup.object().shape({
    fromDate: yup
      .date()
      .when('toDate', {
        is: (toDate: any) => Boolean(toDate),
        then: yup
          .date()
          .max(
            yup.ref('toDate'),
            ({ max }) => `From date must be before ${new Date(max).toLocaleDateString()}`
          ),
        otherwise: yup
          .date()
          .max(new Date(), `From date must be before ${new Date().toLocaleDateString()}`),
      })
      .when('toDate', (toDate: any, schema: any) =>
        schema.test({
          test: (fromDate: any) =>
            new Date(fromDate).toLocaleDateString() !== new Date(toDate).toLocaleDateString(),
          message: 'To and From dates must be different',
        })
      ),
    toDate: yup
      .date()
      .required('To date is required')
      .max(new Date(), `To date must be on or before ${new Date().toLocaleDateString()}`),
    granularity: yup.string().matches(/(DAY|HOUR|MONTH)/),
    advancedMetric: yup.boolean(),
  });
