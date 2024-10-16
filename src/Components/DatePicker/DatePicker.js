import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// Components
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { breakpoints } from '../../consts';

/* prettier-ignore */
const inputStyling = css `
  background: ${({ theme }) => theme.INPUT_BG_LIGHT};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  outline-color: ${({ theme }) => theme.INPUT_OUTLINE_LIGHT};
  padding: 6px 10px;
  max-width: 100%;
  width: 140px;
  @media ${breakpoints.between('sm', 'md')} {
    width: 100px;
  }
  @media ${breakpoints.down('sm')} {
    width: 115px;
  }
`;

const DatepickContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  justify-content: space-between;
  /* Unfortunatly, need to finetune datepicker due to rem sizing */
  .react-datepicker {
    font-size: 0.938;
    .react-datepicker__header {
      background: ${({ theme }) => theme.BACKGROUND_THEME};
    }
    .react-datepicker__month-container {
      background: ${({ theme }) => theme.BACKGROUND_CONTENT};
    }
    .react-datepicker__day,
    .react-datepicker__day-name {
      width: 1.688rem;
      line-height: 1.688rem;
      color: ${({ theme }) => theme.FONT_PRIMARY};
    }
    .react-datepicker__day-name {
      color: ${({ theme }) => theme.FONT_PRIMARY};
    }
    .react-datepicker__current-month {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.FONT_PRIMARY};
    }
    .react-datepicker__day--selected {
      background: ${({ theme }) => theme.BACKGROUND_THEME};
    }
    .react-datepicker__day--disabled {
      color: ${({ theme }) => theme.FONT_DISABLED};
    }
  }
`;
const StyledLabel = styled.label`
  font-size: 0.938rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  color: ${({ theme }) => theme.FONT_PRIMARY};
  margin-right: 8px;
  white-space: nowrap;
`;
const StyledDatePicker = styled(ReactDatePicker)`
  ${inputStyling}
`;

const DatePicker = ({
  label,
  maxDate,
  selected,
  onChange,
  minDate,
  placeholderText,
  dateFormat,
  className,
  ...rest
}) => (
  <DatepickContainer className={className} {...rest}>
    {label && <StyledLabel>{label}</StyledLabel>}
    <StyledDatePicker
      selected={selected}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      placeholderText={placeholderText}
      dateFormat={dateFormat}
    />
  </DatepickContainer>
);

DatePicker.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.instanceOf(Date).isRequired, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  placeholderText: PropTypes.string,
  dateFormat: PropTypes.string,
  className: PropTypes.string,
};

DatePicker.defaultProps = {
  dateFormat: 'yyyy-MM-dd',
  selected: '',
  className: '',
  placeholderText: '',
  minDate: null,
  maxDate: null,
  label: '',
};

export default DatePicker;
