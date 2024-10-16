import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 3px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  border-radius: 4px;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  font-size: 0.875rem;
  line-height: 1.375rem;
  background-color: ${({ theme }) => theme.INPUT_BG_LIGHT};

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_LIGHT};
  }

  &::placeholder {
    color: ${({ theme }) => theme.INPUT_PLACEHOLDER_LIGHT};
  }
`;

interface TextInputProps {
  title: string;
  action: (value: string) => void;
  list?: string[];
  value?: string;
  type?: string;
  min?: string;
  max?: string;
}

const TextInput = ({
  title,
  action,
  list = [],
  value = '',
  type = 'text',
  min = '',
  max = '',
}: TextInputProps) => {
  if (list.length > 0) {
    return (
      <>
        <Input
          name={title}
          type={type}
          onChange={(e) => action(e.target.value)}
          list="mylist"
          value={value}
        />
        <datalist id="mylist">
          {list.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </>
    );
  }
  return (
    <Input
      name={title}
      type={type}
      min={min}
      max={max}
      onChange={(e) => action(e.target.value)}
      // value={value}
    />
  );
};

export default TextInput;
