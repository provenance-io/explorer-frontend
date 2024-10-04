import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { Content, Loading } from '../../../Components';
import { useTxs } from '../../../redux/hooks';

const FullTxInfoContainer = styled.div`
  color: ${({ theme }) => theme.FONT_LINK};
  margin-top: 20px;
  font-style: italic;
  cursor: pointer;
  font-size: 1.2rem;
`;
const FullJSONWrapper = styled.div`
  padding: 18px;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  width: 100%;
  font-size: 1.2rem;
`;
const FullJSON = styled.div`
  color: ${({ theme }) => theme.FONT_PRIMARY};
  font-family: ${({ theme }) => theme.CODE_FONT};
  font-style: normal;
  width: 100%;
  max-width: 100%;
  max-height: 700px;
  overflow: scroll;
`;
const RetryJSON = styled.div`
  color: ${({ theme }) => theme.FONT_LINK};
  margin-top: 10px;
  font-style: italic;
  cursor: pointer;
`;

const TxJSON = () => {
  const [showFullJSON, setShowFullJSON] = useState(false);
  const { txFullJSONLoading, txFullJSON, getTxFullJSON } = useTxs();
  const { txHash } = useParams();

  const fetchFullJSON = () => {
    getTxFullJSON(txHash);
  };

  const toggleShowFullJSON = () => {
    // If previously hidden and no JSON data exists
    if ((!showFullJSON && !txFullJSON) || txHash !== txFullJSON?.txhash) {
      fetchFullJSON();
    }
    setShowFullJSON(!showFullJSON);
  };

  return (
    <Content title="Full JSON" icon="DATA_OBJECT">
      <FullTxInfoContainer onClick={toggleShowFullJSON}>
        {showFullJSON ? 'Hide' : 'Show'} full transaction JSON
      </FullTxInfoContainer>
      {showFullJSON && (
        <FullJSONWrapper>
          {txFullJSONLoading && <Loading />}
          {!txFullJSONLoading &&
            (txFullJSON ? (
              <FullJSON>
                <ReactJson src={txFullJSON} theme="ocean" />
              </FullJSON>
            ) : (
              <FullJSON>
                <div>Unable to load JSON data...</div>
                <RetryJSON onClick={fetchFullJSON}>Retry</RetryJSON>
              </FullJSON>
            ))}
        </FullJSONWrapper>
      )}
    </Content>
  );
};

export default TxJSON;
