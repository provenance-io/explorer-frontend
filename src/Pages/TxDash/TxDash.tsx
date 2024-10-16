// import { useEffect, useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { Button, /*Loading*/ Wrapper } from '../../Components';
// import { useTxs } from 'redux/hooks';
import { DownloadCsvModal } from '../../Pages/Dashboard/Components/TxHistory/Components';
import { TxByHour, TxDaysOfWeek, TxHeatmap, TxHistory /*TxNodeLink*/ } from './Components';

const MainTitle = styled.div`
  text-align: center;
  font-size: 2.25rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
`;

// const Title = styled.div`
//   text-align: center;
//   font-size: 1.6rem;
//   font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
// `;

// const TextInput = styled.input`
//   background-color: ${({ theme }) => theme.INPUT_BG_DARK};
//   color: ${({ theme }) => theme.INPUT_FONT_DARK};
//   border: 1px solid ${({ theme }) => theme.INPUT_BORDER_DARK};
//   border-radius: 4px;
//   padding: 6px 6px 6px 6px;
//   margin-right: 10px;
//   width: 350px;
//   font-size: 0.875rem;
//   line-height: 1.375rem;
//   &:focus {
//     outline: none;
//     box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_DARK};
//   }
//   &::placeholder {
//     color: ${({ theme }) => theme.INPUT_PLACEHOLDER_DARK};
//   }
// `;

const Div = styled.div`
  display: flex;
`;

// const SearchBarDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

const DivEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 10px;
`;

const DivSize = styled.div<{ size?: string }>`
  width: ${({ size }) => size};
`;

// const Divider = styled.hr`
//   color: ${({ theme }) => theme.FONT_PRIMARY};
//   margin: 20px 0px 40px 0px;
// `;

export const TxDash = () => {
  // Modal controls
  const [modalOpen, deactivateModalOpen, activateModalOpen] = useToggle(false);
  // Grab a single transaction and use the address to initiate the search
  // const { getTxsRecent, txs } = useTxs();
  // useEffect(() => {
  //   getTxsRecent({
  //     count: 1,
  //     page: 1,
  //     type: '',
  //     status: '',
  //     fromDate: '',
  //     toDate: '',
  //   });
  // }, [getTxsRecent]);
  // const startAddress = txs[0]?.signers[0]?.address;
  // Search address state
  // const [address, setAddress] = useState(startAddress);
  // Placeholder for address changes
  // const [tempAddr, setTempAddr] = useState(startAddress);
  return (
    <Wrapper>
      <MainTitle>Provenance Explorer Txs Dashboard</MainTitle>
      <DivEnd>
        <Button onClick={activateModalOpen}>Generate Tx Data CSV</Button>
      </DivEnd>
      <Div>
        <TxByHour />
        <TxHeatmap />
      </Div>
      <Div>
        <DivSize size="30%">
          <TxDaysOfWeek />
        </DivSize>
        <DivSize size="70%">
          <TxHistory />
        </DivSize>
      </Div>
      {/* <Divider /> */}
      {/* {startAddress ? (
        <>
          <SearchBarDiv>
            <Title>Account Transactions Node Link Chart</Title>
            <Div>
              <TextInput
                id="SearchBar"
                onChange={(e: any) => setTempAddr(e.target.value)}
                onKeyPress={(e: any) => {
                  if (e.key === 'Enter') {
                    setAddress(tempAddr);
                  }
                }}
                placeholder="Enter Search Value"
                defaultValue={address}
              />
              <Button onClick={() => setAddress(tempAddr)}>Search</Button>
            </Div>
          </SearchBarDiv>
          <TxNodeLink address={address || startAddress} setAddress={setAddress} />
        </>
      ) : (
        <Loading />
      )} */}
      <DownloadCsvModal modalOpen={modalOpen} onClose={deactivateModalOpen} />
    </Wrapper>
  );
};
