import React, { Fragment } from 'react';
import styled, { useTheme } from 'styled-components';
import { Table, Button as BaseButton, Sprite as BaseSprite } from 'Components';
import PropTypes from 'prop-types';
import { breakpoints } from 'consts';
import { isEmpty } from 'utils';
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
  tableProps, // object pass through to Table component (required)
  stakingProps, // object pass through to staking component
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
              <Table {...tableProps} />
            </Fragment>
          )}
          {!isEmpty(stakingProps) && <ManageStakingModal {...stakingProps} />}
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
  tableProps: PropTypes.object.isRequired,
  stakingProps: PropTypes.object,
};

ButtonTables.defaultProps = {
  stakingProps: {},
};

export default ButtonTables;
