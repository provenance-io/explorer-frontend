import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';
import { breakpoints } from 'consts';
import useOnEscape from 'react-tiny-hooks/use-on-escape';
import useOnClickOutside from 'react-tiny-hooks/use-on-click-outside';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.16);
`;

const Dialog = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0.5rem;
  width: auto;

  @media ${breakpoints.up('sm')} {
    margin: 1.75rem auto;
    max-width: 500px;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  border-radius: 4px;
  color: black;
  background-color: white;
`;

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useOnClickOutside(onClose);
  useOnEscape(onClose);

  return (
    <Wrapper>
      <Overlay />
      <Dialog>
        <Content ref={modalRef}>
          this is the stuff this is the stuff this is the stuff this is the stuff this is the stuff this is the stuff
        </Content>
      </Dialog>
    </Wrapper>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;
