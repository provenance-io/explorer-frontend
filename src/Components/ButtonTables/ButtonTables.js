import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Table, Button as BaseButton } from 'Components';
import PropTypes from 'prop-types';
import { isEmpty } from 'utils';
import ManageStakingModal from '../../Pages/Validators/Components/ManageStakingModal';

const Button = styled(BaseButton)`
  width: 100%;
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '50px')};
  margin-top: 20px;
  font-weight: bold;
  border-radius: 0px;
  display: ${({ show }) => (show ? 'inherit' : 'none')};
`;

const ListContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  display: ${({ show }) => (show ? 'inherit' : 'none')};
`;

const ButtonTables = ({
  buttonTitle, // string for main button title (required)
  buttonStartContent, // React node for additional button content
  buttonEndContent, // React node passed to Button component
  buttonMinHeight, // string for setting button min height
  buttonProps, // additional button properties
  show, // bool to control when button appears
  size, // string for size of button and content
  spinIcon, // bool to insert a spinning icon
  tableProps, // object pass through to Table component (required)
  stakingProps, // object pass through to staking component
}) => {
  const [showContent, setShowContent] = useState(false);
  const [spinCaret, setSpinCaret] = useState(-90);

  const handleButtonClick = () => {
    setShowContent(!showContent); // Show/hide content
    if (spinCaret === -90) {
      setSpinCaret(90);
    } else {
      setSpinCaret(-90);
    }
  };

  // Set spinning icon props
  if (spinIcon) {
    buttonProps = {
      ...buttonProps,
      icon: 'CHEVRON',
      iconEnd: true,
      iconOptions: {
        ...buttonProps.iconOptions,
        animate: true,
        spin: spinCaret,
      },
    };
  }

  return (
    <>
      <Button
        onClick={handleButtonClick}
        show={show}
        size={size}
        endContent={buttonEndContent}
        minHeight={buttonMinHeight}
        {...buttonProps}
      >
        {buttonTitle}
        <br />
        {buttonStartContent}
      </Button>
      {showContent && (
        <ListContainer show={showContent} size={size}>
          <Fragment>
            <Table {...tableProps} />
          </Fragment>
          {!isEmpty(stakingProps) && <ManageStakingModal {...stakingProps} />}
        </ListContainer>
      )}
    </>
  );
};

ButtonTables.propTypes = {
  buttonTitle: PropTypes.node.isRequired,
  buttonStartContent: PropTypes.node,
  buttonEndContent: PropTypes.node,
  buttonMinHeight: PropTypes.string,
  show: PropTypes.bool,
  size: PropTypes.string,
  spinIcon: PropTypes.bool,
  buttonProps: PropTypes.object,
  tableProps: PropTypes.object.isRequired,
  stakingProps: PropTypes.object,
};

ButtonTables.defaultProps = {
  show: true,
  buttonStartContent: null,
  buttonEndContent: null,
  buttonMinHeight: '',
  size: '',
  spinIcon: false,
  buttonProps: {},
  stakingProps: {},
};

export default ButtonTables;
