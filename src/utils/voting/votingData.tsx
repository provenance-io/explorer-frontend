import { VOTING_TYPES } from "consts";
import { MyFieldsProps } from "utils/proposals";

export const votingData = (votingType: string) => {
  let myFields: MyFieldsProps[] = [];
  switch (votingType) {
    case 'weighted':
      myFields = [
        {
          type: 'number',
          label: 'yes',
          field: 'yes',
        },
        {
          type: 'number',
          label: 'no',
          field: 'no',
        },
        {
          type: 'number',
          label: 'abstain',
          field: 'abstain',
        },
        {
          type: 'number',
          label: 'no with veto',
          field: 'noWithVeto',
        },
      ];
      break;
    default:
      myFields = [
        {
          type: 'dropdown',
          dropdown: VOTING_TYPES,
          initialValue: VOTING_TYPES.YES,
          label: 'vote',
          field: 'vote',
        },
      ];
      break;
  }
  return myFields;
};