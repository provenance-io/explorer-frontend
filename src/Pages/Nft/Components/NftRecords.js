import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useNft } from '../../../redux/hooks';
import { Accordion, Content, Loading, Summary } from '../../../Components';
import { capitalize } from '../../../utils';

const AccordionHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Divider = styled.div`
  height: 0;
  margin: 20px 0;
  border-bottom: ${({ theme, noBorder }) => (noBorder ? 'transparent' : theme.BORDER_COLOR)} 1px
    solid;
`;

const NftRecords = () => {
  const { addr } = useParams();
  const { getNftRecords, nftRecords, nftRecordsLoading } = useNft();

  useEffect(() => {
    if (addr) {
      getNftRecords(addr);
    }
  }, [addr, getNftRecords]);

  const getRecordItems = (record) => {
    if (!record.record) return [];

    const { lastModified, recordAddr, recordSpecAddr, responsibleParties } = record.record;

    return [
      { title: 'Record Address', value: recordAddr },
      { title: 'Record Spec Address', value: recordSpecAddr },
      { title: 'Last Modified', value: lastModified },
      ...responsibleParties.reduce(
        (acc, curr, ind) => [
          ...acc,
          { title: `Responsible Party [${ind}]`, value: curr.party },
          { title: `Responsible Party Role [${ind}]`, value: capitalize(curr.role) },
        ],
        []
      ),
    ];
  };

  const getSpecListItems = (item) => {
    const { contractSpecAddr, recordSpecAddr, responsibleParties } = item;

    return [
      { title: 'Contract Spec Address', value: contractSpecAddr },
      { title: 'Record Spec Address', value: recordSpecAddr },
      ...responsibleParties.map((p, ind) => ({ title: `Responsible Party [${ind}]`, value: p })),
    ];
  };

  return (
    <Content title="NFT Records">
      {nftRecordsLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {nftRecords.map((record) => (
            <Accordion
              key={record.recordName}
              showChevron
              title={
                <AccordionHeader>
                  <span>{capitalize(record.recordName)}</span>
                  <span>{capitalize(record.status)}</span>
                </AccordionHeader>
              }
            >
              <Summary
                data={[
                  { title: 'Name', value: capitalize(record.recordName) },
                  { title: 'Status', value: capitalize(record.status) },
                ]}
              />

              {record.record && (
                <Fragment>
                  <Divider />
                  <Summary data={getRecordItems(record)} />
                </Fragment>
              )}

              {record.specList && (
                <Fragment>
                  <Divider />
                  {record.specList.map((item) => (
                    <Fragment key={item.contractSpecAddr}>
                      <Summary data={getSpecListItems(item)} />
                      <Divider noBorder />
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Accordion>
          ))}
        </Fragment>
      )}
    </Content>
  );
};

export default NftRecords;
