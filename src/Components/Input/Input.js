import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const Element = styled(NumberFormat)`
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  border-radius: 4px;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  font-size: 1.4rem;
  line-height: 2.2rem;
  background-color: ${({ theme }) => theme.INPUT_BG_LIGHT};

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_LIGHT};
  }

  &::placeholder {
    color: ${({ theme }) => theme.INPUT_PLACEHOLDER_LIGHT};
  }
`;

const Input = (inputProps) => <Element isNumericString {...inputProps} />;

Input.propTypes = {
  inputProps: PropTypes.object,
};

Input.defaultProps = {
  inputProps: {},
};

export default Input;
