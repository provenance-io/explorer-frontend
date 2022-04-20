/* This utility returns the formik information to render proposal submission forms
   Format is as follows:
    type: Type of field for UI. Options are text, 
*/

import { ACCESS_TYPES } from "consts";

export interface MyFieldsProps {
  type: string;
  dropdown?: typeof ACCESS_TYPES,
  initialValue?: string,
  label: string;
  field: string;
  subFields?: MyFieldsProps[];
}

export const proposalData = (proposalType: string) => {
  let myFields: MyFieldsProps[] = [];
  // These fields are required by multiple proposals
  const title: MyFieldsProps = {
    type: 'text',
    label: 'title',
    field: 'title',
  };
  const description: MyFieldsProps = {
    type: 'textarea',
    label: 'description',
    field: 'description',
  };
  const initialDeposit: MyFieldsProps = {
    type: 'number',
    label: 'initial deposit (hash)',
    field: 'initialDeposit',
  };

  switch (proposalType) {
    case 'cancel software upgrade': // fallthrough
    case 'text':
      myFields = [
        title,
        description,
        initialDeposit,
      ];
      break;
    case 'software upgrade':
      myFields = [
        title,
        description,
        {
          type: 'text',
          label: 'name',
          field: 'name',
        },
        {
          type: 'number',
          label: 'height',
          field: 'height',
        },
        {
          type: 'text',
          label: 'info',
          field: 'info',
        },
        initialDeposit,
      ];
      break;
    case 'store code':
      myFields = [
        title,
        description,
        {
          type: 'text',
          label: 'run as',
          field: 'runAs',
        },
        {
          type: 'textarea',
          label: 'WASM Byte Code',
          field: 'wasmByteCode',
        },
        {
          type: 'dropdown',
          dropdown: ACCESS_TYPES,
          initialValue: ACCESS_TYPES.NOBODY,
          label: 'access type',
          field: 'accessType',
        },
        // This is conditional based on the access type ONLY_ADDRESS
        {
          type: 'text',
          label: 'address',
          field: 'address',
        },
        initialDeposit,
      ];
      break;
    case 'instantiate code':
      myFields = [
        title,
        description,
        {
          type: 'text',
          label: 'run as',
          field: 'runAs',
        },
        {
          type: 'text',
          label: 'admin',
          field: 'admin',
        },
        {
          type: 'text',
          label: 'code id',
          field: 'codeId',
        },
        {
          type: 'text',
          label: 'label',
          field: 'label',
        },
        {
          type: 'text',
          label: 'message',
          field: 'msg',
        },
        {
          type: 'repeating',
          label: 'fund',
          field: 'fundsList',
          subFields: [
            {
              type: 'number',
              label: 'amount',
              field: 'amount',
            },
            {
              type: 'text',
              label: 'denom',
              field: 'denom',
            },
          ],
        },
        initialDeposit,
      ];
      break;
    case 'parameter change':
      myFields = [
        title,
        description,
        {
          type: 'repeating',
          label: 'change',
          field: 'changesList',
          subFields: [
            {
              type: 'text',
              label: 'subspace',
              field: 'subspace',
            },
            {
              type: 'text',
              label: 'key',
              field: 'key',
            },
            {
              type: 'text',
              label: 'value',
              field: 'value',
            },
          ]
        },
        initialDeposit,
      ];
      break;
    default:
      console.warn(`Invalid proposal type of ${proposalType}`);
      break;
  }
  return myFields;
};