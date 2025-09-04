import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useNft } from '../../../redux/hooks';
import { Accordion, Content, Loading, Summary } from '../../../Components';
import { camelToSentence, capitalize } from '../../../utils';

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

  const getValues = (dataFields, values, currentKey = 'Record Data') => {
    // Initialize the data field
    dataFields.push({ key: currentKey, values: [] });
    return values.forEach(([key, value]) => {
      switch (typeof value) {
        case 'object':
          if (Array.isArray(value)) {
            dataFields
              .find((v) => v.key === currentKey)
              ?.values.push({ title: camelToSentence(key), value: value.join(', ') });
          } else {
            return getValues(dataFields, Object.entries(value), key);
          }
          break;
        default:
          dataFields
            .find((v) => v.key === currentKey)
            .values.push({ title: camelToSentence(key), value });
          break;
      }
      return undefined;
    });
  };

  // Recursive formula to unwrap objects in the hash JSON
  const formatFields = (values) => {
    const dataFields = [];
    getValues(dataFields, values);
    return dataFields;
  };

  const recordOutputData = (record) => {
    if (!record?.record?.outputs) return [];

    const { outputs } = record.record;

    return [
      ...outputs
        .flatMap((output) => {
          try {
            const values = JSON.parse(output.hash);
            if (values && Object.keys(values).length > 0) {
              // Here, for every value, we want to write it to dataFields
              const fieldArray = formatFields(Object.entries(values));
              return fieldArray.map(({ key, values }) => (
                <div key={key} style={{ padding: '10px' }}>
                  {key !== 'Record Data' && (
                    <p style={{ color: 'gray', borderBottom: '1px solid gray', width: '75%' }}>
                      {camelToSentence(key)}
                    </p>
                  )}
                  <Summary data={values} />
                </div>
              ));
            }
            return <Summary data={[{ title: 'Data', value: output.hash }]} />;
          } catch (e) {
            console.error(e);
            return <Summary data={[{ title: 'Data', value: output.hash }]} />;
          }
        })
        .filter((o) => o),
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

              {record?.record?.outputs && (
                <Fragment>
                  <Divider />
                  Record Data
                  {recordOutputData(record)}
                  {/* Record Data
                  <Summary data={getRecordOutput(record)} />
                  <p style={{ color: 'gray', fontSize: '0.8rem', borderBottom: '1px solid black' }}>
                    Another Thing
                  </p> */}
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
