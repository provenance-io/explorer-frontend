import React, { Fragment } from 'react';
import { Field as BaseField, ErrorMessage, FormikProps } from "formik";
import styled from 'styled-components';
import { capitalize } from 'utils';

const Option = styled.option`
  background: ${({ theme }) => theme.INPUT_BG_LIGHT};
  font-weight: initial;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.FONT_THEME};
  }
`;

const Error = styled.div`
  margin-top: 5px;
  color: red;
`;

const Field = styled(BaseField)<{ $issub: boolean }>`
  margin-top: ${({ $issub }) => $issub ? '5px' : '10px'};
  padding: ${({ $issub }) => $issub ? '5px' : '10px'};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  border-radius: 4px;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  font-size: ${({ $issub }) => $issub ? '1.2rem' : '1.4rem'};
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

const TextArea = styled.textarea<{ $issub: boolean }>`
  margin-top: ${({ $issub }) => $issub ? '5px' : '10px'};
  padding: ${({ $issub }) => $issub ? '5px' : '10px'};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  border-radius: 4px;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  font-size: ${({ $issub }) => $issub ? '1.2rem' : '1.4rem'};
  line-height: 2.2rem;
  background-color: ${({ theme }) => theme.INPUT_BG_LIGHT};

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_LIGHT};
  }

  &::placeholder {
    color: ${({ theme }) => theme.INPUT_PLACEHOLDER_LIGHT};
  }
  height: 200px;
  text-align: top;
`;

const ThisField = styled.div<{ grid: boolean }>`
  padding: 1.6rem 0 1.6rem 0;
  display: ${({ grid }) => grid && 'grid'};
  grid-template-columns: ${({ grid }) => grid && ' 3fr 0.75fr'};
  border-bottom: ${({ grid, theme }) => grid && `1px solid ${theme.INPUT_BG_LIGHT}`};
`;

const Label = styled.label<{ $issub: boolean, grid: boolean }>`
  margin-top: ${({ grid }) => grid && '10px'};
  font-size: ${({ $issub }) => $issub ? '1.4rem' : '1.6rem'};
  font-weight: ${({ theme, $issub }) => !$issub && theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
  align-self: center;
`;

interface ProposalProps {
  dropdown: string;
}

interface FormProps {
  name: string;
  label: string;
  type: string;
  dropdown?: { [key: string]: string};
  formik: FormikProps<ProposalProps>;
  issub?: boolean;
  grid?: boolean;
}

const FormBuilder = ({ 
  name,
  label,
  type,
  dropdown,
  formik,
  issub = false,
  grid = false,
}: FormProps) => {

  const builder = (
    name: string, 
    label: string, 
    type: string, 
    dropdown?: { [key: string]: string}) => {
    switch (type) {
      case 'text':
        return (
          <Fragment key={name}>
            <ThisField grid={grid}>
              <Label htmlFor={name} $issub={issub} grid={grid}>{capitalize(label)}</Label>
              <Field
                $issub={issub}
                name={name}
                type="text"
                placeholder={`Enter ${label}`}
                value={formik.getFieldProps(name).value || ''}
              />
              <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
            </ThisField>
          </Fragment>
          );
      case 'textarea':
        return (
          <Fragment key={name}>
            <ThisField grid={grid}>
              <Label htmlFor={name} $issub={issub} grid={grid}>{capitalize(label)}</Label>
              <TextArea
                $issub={issub}
                id={name}
                placeholder={`Enter ${label}`}
                {...formik.getFieldProps(`${name}`)}
              />
              <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
            </ThisField>
          </Fragment>
          );
      case 'number':
        return (
          <Fragment key={name}>
            <ThisField grid={grid}>
              <Label htmlFor={name} $issub={issub} grid={grid}>{capitalize(label)}</Label>
              <Field
                $issub={issub}
                name={name}
                type="number"
                placeholder={'0'}
                value={formik.getFieldProps(name).value || ''}
              />
              <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
            </ThisField>
          </Fragment>
        )
      case 'dropdown':
        return (
          <Fragment key={name}>
            <ThisField grid={grid}>
              <Label htmlFor={name} $issub={issub} grid={grid}>{capitalize(label)}</Label>
              <Field 
                $issub={issub}
                as="select"
                {...formik.getFieldProps(`${name}`)}
              >
                {dropdown && Object.keys(dropdown).map((key) => {
                  const myDropdown = dropdown[key];
                  return (
                    <Option key={myDropdown} value={myDropdown}>{capitalize(myDropdown)}</Option>
                  )
                })}
              </Field>
            </ThisField>
          </Fragment>
        );
      default:
        return <ThisField grid={grid}>Unsupported field</ThisField>
    }
  }

  return (
    <>
      {builder(name, label, type, dropdown)}
    </>
  );
};

export default FormBuilder;