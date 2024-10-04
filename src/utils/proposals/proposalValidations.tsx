/* This utility returns the formik information to render proposal submission forms
   Format is as follows:
    type: Type of field for UI. Options are text, 
*/
import * as yup from 'yup';
import { ACCESS_TYPES, maxProposalFileSize } from '../../consts';

const checkMaxFileSize = (file?: File) => {
  let valid = true;
  if (file) {
    valid = file.size < maxProposalFileSize;
  }
  return valid;
};

export const proposalValidations = (proposalType: string, blocksHeight: number) => {
  const title = yup.string().required('Title is required');
  const description = yup.string().required('Description is required');
  const initialDeposit = yup.number().integer().default(0).min(0, 'Min deposit is 0');
  switch (proposalType) {
    case 'cancel upgrade': // fallthrough
    case 'text':
      return yup.object().shape({
        title,
        description,
        initialDeposit,
      });
    case 'software upgrade': {
      return yup.object().shape({
        title,
        description,
        name: yup.string().required('Name is required'),
        height: yup.number().min(blocksHeight, `Min height is ${blocksHeight}`),
        initialDeposit,
      });
    }
    case 'store code':
      return yup.object().shape({
        title,
        description,
        runAs: yup.string().required('"Run As" is required'),
        // This is the wasmByteCode file
        file: yup
          .mixed()
          .required('A .wasm file is required')
          .test(
            'fileType',
            'Only .wasm file types are supported',
            (value) => value?.type === 'application/wasm'
          )
          .test('fileSize', 'Files must be less than 1MB', checkMaxFileSize),
        address: yup.string().when(['accessType'], {
          is: (accessType: string) => accessType === ACCESS_TYPES.ACCESS_TYPE_NOBODY,
          then: yup.string().required('Address is required for "address only" access type'),
        }),
        initialDeposit,
      });
    case 'instantiate contract':
      return yup.object().shape({
        title,
        description,
        runAs: yup.string().required('"Run As" is required'),
        admin: yup.string().required('Admin is required'),
        codeId: yup.string().required('Code ID is required'),
        label: yup.string().required('Label is required'),
        msg: yup.string().required('Message is required'),
        fundsList: yup.array().of(
          yup.object().shape({
            amount: yup.number().min(0, 'Min amount is 0').required('Amount is required'),
            denom: yup.string().required('Denom is required'),
          })
        ),
        initialDeposit,
      });
    case 'parameter change':
      return yup.object().shape({
        title,
        description,
        changes: yup.array().of(
          yup.object().shape({
            subspace: yup.string().required('Subspace is required'),
            key: yup.string().required('Key is required'),
            value: yup.string().required('Value is required'),
          })
        ),
        initialDeposit,
      });
    default:
      console.warn(`Invalid proposal type of ${proposalType}`);
      break;
  }
  return proposalValidations;
};
