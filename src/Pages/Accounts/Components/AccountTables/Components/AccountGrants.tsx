import { useState, Dispatch, SetStateAction, Fragment } from 'react';
import ReactJson from 'react-json-view';
import { Content, MultiTable, Loading, Summary, Table } from '../../../../../Components';
import { useParams } from 'react-router';
import { AuthzProps, FeeGrantProps, useGetGrantsQuery } from '../../../../../redux/services';
import { capitalize, formatDenom, isEmpty } from '../../../../../utils';

interface GrantsProps {
  grant: 'authz' | 'feegrant';
  type: 'granter' | 'grantee';
  currentPage: number;
  changePage: Dispatch<SetStateAction<number>>;
}

const AllGrants = ({ grant, type, currentPage, changePage }: GrantsProps) => {
  const { addressId: address } = useParams<{ addressId: string }>();
  const { data, error, isLoading, isFetching } = useGetGrantsQuery({
    grant,
    type,
    address,
    page: currentPage,
    // default count is 10 items
  });

  const { results: Data = [], pages: Pages = 0, total: Total = 0 } = data || {};

  const grantHeaders = (grant: 'authz' | 'feegrant', type: 'grantee' | 'granter') => [
    {
      displayName: `${capitalize(type)}`,
      dataName: type,
    },
    {
      displayName: 'Type',
      dataName: 'type',
    },
    // Only add this field for authz grant requests
    ...(grant === 'authz'
      ? [
          {
            displayName: 'Expiration',
            dataName: 'expiration',
          },
        ]
      : []),
    {
      displayName: '',
      dataName: 'accordion',
    },
  ];

  const additionalAuthzData = (Data as AuthzProps[]).map((item) => (
    <Content title="Details">
      {!isEmpty(item.authorization) && (
        <Summary
          data={Object.keys(item.authorization).map((key) => ({
            title: key,
            value: item.authorization[key as keyof typeof item.authorization],
            list: Array.isArray(item.authorization[key as keyof typeof item.authorization])
              ? key === 'transferLimits'
                ? (item.authorization[key as keyof typeof item.authorization] as Array<any>).map(
                    (val) => formatDenom(val.amount, val.denom)
                  )
                : item.authorization[key as keyof typeof item.authorization]
              : undefined,
          }))}
        />
      )}
    </Content>
  ));

  const additionalFeegrantData = (Data as FeeGrantProps[]).map((item) => (
    <Content title="Details">
      {!isEmpty(item.allowance) && (
        <Summary
          data={Object.keys(item.allowance).map((key) => ({
            title: key,
            value: JSON.stringify(item.allowance[key as keyof typeof item.allowance]),
            isJson: true,
          }))}
        />
      )}
    </Content>
  ));

  return (
    <>
      {error ? (
        <Content title="Error processing request">
          <ReactJson src={JSON.parse(JSON.stringify(error))} theme={'summerfruit'} collapsed />
        </Content>
      ) : isFetching || isLoading ? (
        <Loading />
      ) : (
        <Table
          title={`${grant === 'feegrant' ? 'Fee Grant' : 'Authz'} ${capitalize(type)} (${Total})`}
          tableData={Data}
          // Note that we render the opposite info from the request. If this
          // account is the grantee of Authz, we want to show who was granted
          // authz, and vice versa.
          tableHeaders={grantHeaders(grant, type === 'grantee' ? 'granter' : 'grantee')}
          totalPages={Pages}
          currentPage={currentPage}
          changePage={changePage}
          accordionData={
            Data.length
              ? grant === 'authz'
                ? additionalAuthzData
                : additionalFeegrantData
              : undefined
          }
        />
      )}
    </>
  );
};

export const AccountGrants = () => {
  // State variables
  const [authzGranteePage, setAuthzGranteePage] = useState(1);
  const [authzGranterPage, setAuthzGranterPage] = useState(1);
  // const [feegrantGranteePage, setFeegrantGranteePage] = useState(1);
  const [feegrantGranterPage, setFeegrantGranterPage] = useState(1);
  const [activeTableTab, setActiveTableTab] = useState(0);

  return (
    <Content>
      <MultiTable active={activeTableTab} setActive={setActiveTableTab}>
        <Fragment key="Authz Granter">
          {AllGrants({
            grant: 'authz',
            type: 'granter',
            currentPage: authzGranterPage,
            changePage: setAuthzGranterPage,
          })}
        </Fragment>
        <Fragment key="Authz Grantee">
          {AllGrants({
            grant: 'authz',
            type: 'grantee',
            currentPage: authzGranteePage,
            changePage: setAuthzGranteePage,
          })}
        </Fragment>
        <Fragment key="Fee Grant Granter">
          {AllGrants({
            grant: 'feegrant',
            type: 'granter',
            currentPage: feegrantGranterPage,
            changePage: setFeegrantGranterPage,
          })}
        </Fragment>
        {/* <Fragment key="Fee Grant Grantee">
          {AllGrants({
            grant: 'feegrant',
            type: 'grantee',
            currentPage: feegrantGranteePage,
            changePage: setFeegrantGranteePage,
          })}
        </Fragment> */}
      </MultiTable>
    </Content>
  );
};
