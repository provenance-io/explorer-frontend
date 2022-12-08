import styled from 'styled-components';
// @ts-ignore
import useToggle from 'react-tiny-hooks/use-toggle';
import { Button, Wrapper } from 'Components';
import { DownloadCsvModal } from 'Pages/Dashboard/Components/TxHistory/Components';
import { TxByHour, TxDaysOfWeek, TxHeatmap, TxHistory, TxNodeLink } from './Components';

const Div = styled.div`
  display: flex;
`;

const DivEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 10px;
`;

const DivSize = styled.div<{ size?: string }>`
  width: ${({ size }) => size};
`;

export const TxDash = () => {
  // Modal controls
  const [modalOpen, deactivateModalOpen, activateModalOpen] = useToggle(false);
  return (
    <Wrapper>
        <TxNodeLink address={'tp1a3trn2dzgkss5lwjwayfmf0rdljr0ukg5knvtt'}/>
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
      <DownloadCsvModal modalOpen={modalOpen} onClose={deactivateModalOpen} />
    </Wrapper>
  );
};
