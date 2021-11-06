import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useNft } from 'redux/hooks';
import { Accordion, Content, Loading, Summary } from 'Components';
import { capitalize } from 'utils';

const AccordionHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const NftRecords = () => {
  const { addr } = useParams();
  const { getNftRecords, nftRecords, nftRecordsLoading } = useNft();

  useEffect(() => {
    if (addr) {
      getNftRecords(addr);
    }
  }, [addr, getNftRecords]);

  console.log(nftRecords);

  return (
    <Content title="NFT Records">
      {nftRecordsLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {nftRecords.map(record => (
            <Accordion
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
                  { title: 'Name', value: record.recordName },
                  { title: 'Status', value: record.status },
                ]}
              />
            </Accordion>
          ))}
        </Fragment>
      )}
    </Content>
  );
};

export default NftRecords;
