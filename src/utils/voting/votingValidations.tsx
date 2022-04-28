import * as yup from 'yup';

export const votingValidations = (votingType: string) => {
  switch (votingType) {
    case 'weighted':
      return (
        yup.object().shape({
          yes: yup
            .number()
            .typeError("Please enter a valid number")
            .min(0, "The minimum value is 0%")
            .max(100, "The maximum value is 100%"),
          no: yup
            .number()
            .typeError("Please enter a valid number")
            .min(0, "The minimum value is 0%")
            .max(100, "The maximum value is 100%"),
          abstain: yup
            .number()
            .typeError("Please enter a valid number")
            .min(0, "The minimum value is 0%")
            .max(100, "The maximum value is 100%"),
          noWithVeto: yup
            .number()
            .typeError("Please enter a valid number")
            .min(0, "The minimum value is 0%")
            .max(100, "The maximum value is 100%"),
        })
      );
    default:
      return (
        yup.object().shape({
          vote: yup
            .string()
            .required("A vote is required"),
        })
      );
  };
};