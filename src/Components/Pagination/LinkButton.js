import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Element = styled.button.attrs(({ type }) => ({ type }))`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: ${({ theme }) => theme.FONT_LINK};
  text-transform: uppercase;
  font-size: 12px;
`;

const LinkButton = (props) => <Element {...props} />;

LinkButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};

LinkButton.defaultProps = {
  onClick: null,
  type: 'button',
};

export default LinkButton;
