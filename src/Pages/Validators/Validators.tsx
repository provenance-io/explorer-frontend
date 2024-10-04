import React from 'react';
import { Wrapper, Section, Header } from '../../Components';
import { useValidators } from '../../redux/hooks';
import { ValidatorList } from './Components';

const Validators = () => {
  const { validatorsTotal } = useValidators();

  return (
    <Wrapper>
      <Header title="Validators List" value={`${validatorsTotal} total`} />
      <Section header>
        <ValidatorList />
      </Section>
    </Wrapper>
  );
};

export default Validators;
