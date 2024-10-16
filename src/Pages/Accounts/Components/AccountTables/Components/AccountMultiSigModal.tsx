import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from '../../../../../Components';
import { AccountInfo } from '../../../../../redux/features/account/accountSlice';

const Title = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 30px 0 20px 0;
`;

const Description = styled.li`
  color: ${({ theme }) => theme.FONT_TITLE_INFO};
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

interface MultiSigModalProps {
  modalOpen: boolean;
  onClose: Function;
  data: AccountInfo['publicKey']['sigList'];
}

export const AccountMultiSigModal = ({ modalOpen, onClose, data }: MultiSigModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(modalOpen);
  }, [modalOpen]);

  const handleModalClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <>
        <Title>The following accounts form this multi-sig account</Title>
        <ol>
          {data.map((account) => (
            <Description key={account.idx}>
              <Link to={`/accounts/${account.address}`} onClick={handleModalClose}>
                {account.address}
              </Link>
            </Description>
          ))}
        </ol>
      </>
    </Modal>
  );
};
