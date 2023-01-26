/* 
This simple util takes content from the proposal GUI and,
regardless of proposal type, returns the required object
to submit to the backend for processing. This omits the
possible file item as that is handled separately.
*/

export interface ContentProps {
  description: string;
  title: string;
  initialDeposit?: string;
  changes?: {
    subspace: string;
    key: string;
    value: string;
  }[];
  name?: string;
  height?: number;
  info?: string;
  runAs?: string;
  accessType?: string;
  address?: string;
  admin?: string;
  codeId?: number;
  label?: string;
  msg?: string;
  funds?: {
    amount: string;
    denom: string;
  }[];
  submitter: string;
}

export const proposalContent = ({
  description,
  title,
  initialDeposit,
  changes,
  name,
  height,
  info,
  runAs,
  accessType,
  address,
  admin,
  codeId,
  label,
  msg,
  funds,
  submitter,
}: ContentProps) => ({
  // If there is content, stringify. Otherwise, return an empty string
  content:
    changes ||
    name ||
    height ||
    info ||
    runAs ||
    accessType ||
    address ||
    admin ||
    codeId ||
    label ||
    msg ||
    funds
      ? JSON.stringify({
          changes,
          name,
          height,
          info,
          runAs,
          ...(accessType &&
            accessType !== 'ACCESS_TYPE_UNSPECIFIED' && {
              accessConfig: { type: accessType, address },
            }),
          admin,
          codeId,
          label,
          msg,
          funds,
        })
      : '',
  title,
  description,
  initialDeposit: initialDeposit
    ? [{ amount: (parseFloat(initialDeposit) * 1e9).toFixed(), denom: 'nhash' }]
    : [],
  submitter,
});
