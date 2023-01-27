import { useEffect, useState, useRef, Ref } from 'react';
import { Formik, FormikProps } from 'formik';
import styled from 'styled-components';
import qs from 'query-string';
import { Button as Basebutton, Modal, Forms } from '../../../../../Components';
import {
  downloadData as data,
  downloadValidations as validations,
  maxLength,
} from '../../../../../utils';
import { ACCOUNT_INFO_V3_URL, TX_V3_URL } from '../../../../../consts';
import { GranularityProps } from '../../../../../redux/services';

const Button = styled(Basebutton)`
  margin-top: 10px;
  align-self: flex-end;
`;

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  margin: 20px 0;
`;
const Notice = styled.div<{ show?: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  margin: 1.6rem 0;
  padding: 20px;
  border: ${({ theme }) => theme.ORANGE_PRIMARY} 1px solid;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.ORANGE_PRIMARY};
  flex-direction: column;
  text-align: justify;
  line-height: 1.3;
`;

interface DownloadCsvProps {
  modalOpen: boolean;
  onClose: Function;
  address?: string; // If address is provided, this will download the CSV for a specific address
}

interface CsvOptions {
  fromDate: string;
  toDate: string;
  granularity: 'DAY' | 'HOUR' | 'MONTH';
  advancedMetrics: boolean;
}

export const DownloadCsvModal = ({ modalOpen, onClose, address }: DownloadCsvProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
    onClose();
    // @ts-ignore
    formikRef.current.resetForm();
  };

  useEffect(() => {
    setIsOpen(modalOpen);
  }, [modalOpen]);

  // Set a ref so we can access resetForm outside of formik
  const formikRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} largeModal={true}>
      <Formik
        innerRef={
          formikRef as unknown as Ref<
            FormikProps<{
              fromDate: string;
              toDate: string;
              granularity: GranularityProps;
              advancedMetrics: boolean;
            }>
          > | null
        }
        enableReinitialize
        initialValues={{
          fromDate: '',
          toDate: '',
          granularity: 'DAY' as GranularityProps,
          advancedMetrics: false,
        }}
        validationSchema={validations()}
        onSubmit={(
          { fromDate, toDate, granularity, advancedMetrics }: CsvOptions,
          { resetForm }
        ) => {
          const a = document.createElement('a');
          a.href = `${
            address ? `${ACCOUNT_INFO_V3_URL}/${address}/tx_history` : `${TX_V3_URL}/history`
          }/download?${qs.stringify({
            fromDate,
            toDate,
            granularity,
            advancedMetrics,
          })}`;
          a.download = 'true';
          document.body.append(a);
          a.click();
          document.body.removeChild(a);
          // Clear the form
          resetForm();
          handleModalClose();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Title>
              Generate a CSV of {address ? maxLength(address, 12, '4') : ''} Transaction Information
            </Title>
            <Forms config={data()} formik={formik} />
            <Notice show={formik.values.advancedMetrics}>
              Toggling on advanced metrics will include transaction and fee type metrics in the CSV
            </Notice>
            <Button type="submit">Download</Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
