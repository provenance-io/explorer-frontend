import React, { Fragment } from 'react';
import styled, { useTheme } from 'styled-components';
import { Table, Button as BaseButton, Sprite as BaseSprite } from 'Components';
import PropTypes from 'prop-types';
import { breakpoints } from 'consts';
import ManageStakingModal from '../../../../Validators/Components/ManageStakingModal';

const Button = styled(BaseButton)`
  width: 49%;
  @media ${breakpoints.down('md')} {
    width: 100%;
  }
  min-height: 50px;
  max-height: 50px;
  font-weight: bold;
  display: ${({ show }) => (show ? 'inherit' : 'none')};
`;

const Sprite = styled(BaseSprite)`
  position: absolute;
  display: flex;
  margin: -16px 0 0 35%;
  @media ${breakpoints.down('md')} {
    margin: -16px 0 0 85%;
  }
  @media ${breakpoints.down('sm')} {
    margin: -16px 0 0 80%;
  }
`;

const ListContainer = styled.div`
  width: 49%;
  @media ${breakpoints.down('md')} {
    width: 100%;
  }
  display: ${({ show }) => (show ? 'inherit' : 'none')};
`;

const ButtonTables = ({
  buttonTitle, // string for main button title (required)
  handleButtonClick, // function for handling button clicks (required)
  showButton, // bool to control showing button (required)
  showContent, // bool to control showing content (required)
  hasLength, // bool to ensure ready to render (required)
  setTableCurrentPage, // function to set current page
  tableCurrentPage, // number for current page
  isLoading, // bool (required)
  manageStakingBtn, // bool to determine if useStaking needed
  tableData, // array of table data (required)
  tableHeaders, // array of table headers (required)
  tableTitle, // string of table title (required)
  totalPages, // number of total pages in the table (required)
  addButtonTitle, // string of table button title (required)
  isDelegate, // bool to determine if delegate only
  isLoggedIn, // bool to determine if logged in
  modalOpen, // bool to determine if modal should be open
  onClose, // function to set modalOpen to false
  handleStaking, // function to handle staking
  validator, // object for selected validator
}) => {
  const theme = useTheme();

  return (
    <>
      {showButton && (
        <Button show={showButton} onClick={handleButtonClick}>
          {buttonTitle}
          <Sprite icon="CARET" size="1.8rem" color={theme.WHITE} />
        </Button>
      )}
      {showContent && (
        <ListContainer show={showContent}>
          {hasLength && (
            <Fragment>
              <Table
                changePage={setTableCurrentPage}
                currentPage={tableCurrentPage}
                isLoading={isLoading}
                ManageStakingBtn={manageStakingBtn}
                tableData={tableData}
                tableHeaders={tableHeaders}
                title={tableTitle}
                totalPages={totalPages}
                addButton={addButtonTitle}
                onButtonClick={handleButtonClick}
              />
            </Fragment>
          )}
          {manageStakingBtn && (
            <ManageStakingModal
              isDelegate={isDelegate}
              isLoggedIn={isLoggedIn}
              modalOpen={modalOpen}
              onClose={onClose}
              onStaking={handleStaking}
              validator={validator || {}}
            />
          )}
        </ListContainer>
      )}
    </>
  );
};

ButtonTables.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired,
  showContent: PropTypes.bool.isRequired,
  hasLength: PropTypes.bool.isRequired,
  setTableCurrentPage: PropTypes.func,
  tableCurrentPage: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  manageStakingBtn: PropTypes.func,
  tableData: PropTypes.array.isRequired,
  tableHeaders: PropTypes.array.isRequired,
  tableTitle: PropTypes.string,
  totalPages: PropTypes.number,
  addButtonTitle: PropTypes.string.isRequired,
  isDelegate: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handleStaking: PropTypes.func,
  validator: PropTypes.object,
};

ButtonTables.defaultProps = {
  setTableCurrentPage: null,
  tableCurrentPage: 1,
  manageStakingBtn: null,
  tableTitle: '',
  totalPages: 1,
  isDelegate: false,
  isLoggedIn: false,
  onClose: null,
  modalOpen: false,
  handleStaking: null,
  validator: {},
};

export default ButtonTables;
