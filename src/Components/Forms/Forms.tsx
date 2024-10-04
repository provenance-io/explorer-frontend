import React, { Fragment } from 'react';
import { FormikProps, FieldArray } from 'formik';
import styled from 'styled-components';
import { Button as BaseButton } from '../../Components';
import { capitalize, MyFieldsProps } from '../../utils';
import { FormBuilder } from './Components';

const ThisField = styled.div`
  padding-top: 1.6rem;
`;

const Label = styled.label<{ $issub: boolean }>`
  font-size: ${({ $issub }) => ($issub ? '1.4rem' : '1.6rem')};
  font-weight: ${({ theme, $issub }) => !$issub && theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;

const Button = styled(BaseButton)`
  margin-top: 10px;
`;

const RemoveButton = styled(BaseButton)`
  margin-top: 10px;
  justify-content: flex-end;
`;

const SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
`;

const SubSection = styled.div`
  margin-top: 5px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.FONT_PRIMARY};
  border-radius: 5px;
`;

interface FormProps {
  config: MyFieldsProps[];
  formik: FormikProps<any>;
  issub?: boolean;
  grid?: boolean;
  blockNumber?: number;
}

const Forms = ({ config, formik, issub = false, grid = false, blockNumber }: FormProps) => {
  const builder = (individualConfig: MyFieldsProps) => {
    switch (individualConfig.type) {
      case 'text': // fallthrough
      case 'date': // fallthrough
      case 'textarea': // fallthrough
      case 'checkbox': // fallthrough
      case 'number': // fallthrough
      case 'file': // fallthrough
        return (
          <FormBuilder
            key={individualConfig.field}
            name={individualConfig.field}
            label={individualConfig.label}
            type={individualConfig.type}
            formik={formik}
            grid={grid}
            blockNumber={blockNumber}
          />
        );
      case 'dropdown':
        return (
          <FormBuilder
            key={individualConfig.field}
            name={individualConfig.field}
            label={individualConfig.label}
            type={individualConfig.type}
            dropdown={individualConfig.dropdown}
            formik={formik}
            grid={grid}
          />
        );
      case 'repeating':
        return (
          <Fragment key={individualConfig.field}>
            <ThisField>
              <Label htmlFor={individualConfig.field} $issub={issub}>{`${capitalize(
                individualConfig.label
              )}s:`}</Label>
              <FieldArray
                name={individualConfig.field}
                render={(arrayHelpers) => (
                  <div>
                    {formik.getFieldProps(individualConfig.field).value &&
                      formik.getFieldProps(individualConfig.field).value.length > 0 &&
                      formik
                        .getFieldProps(individualConfig.field)
                        .value.map((value: string, index: number) => (
                          <SubSection key={index}>
                            <SubTitle>
                              {`${capitalize(individualConfig.label)} ${index + 1}:`}
                            </SubTitle>
                            {individualConfig.subFields &&
                              individualConfig.subFields.map(
                                ({ type, label, field: name, dropdown }) => (
                                  <FormBuilder
                                    key={`${individualConfig.field}.${index}.${name}`}
                                    name={`${individualConfig.field}.${index}.${name}`}
                                    label={label}
                                    type={type}
                                    dropdown={dropdown}
                                    formik={formik}
                                    issub
                                    grid={grid}
                                  />
                                )
                              )}
                            <RemoveButton type="button" onClick={() => arrayHelpers.remove(index)}>
                              {`Remove ${capitalize(individualConfig.label)} ${index + 1}`}
                            </RemoveButton>
                          </SubSection>
                        ))}
                    <Button type="button" onClick={() => arrayHelpers.push({})}>
                      Add {individualConfig.label}
                    </Button>
                  </div>
                )}
              />
            </ThisField>
          </Fragment>
        );
      default:
        return <ThisField>Unsupported field</ThisField>;
    }
  };

  return <>{config.map((c: MyFieldsProps) => builder(c))}</>;
};

export default Forms;
