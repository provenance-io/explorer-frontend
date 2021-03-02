import { Wrapper, Section, Header } from 'Components';
import { useValidators, useApp } from 'redux/hooks';
import { ValidatorList } from './Components';

const Validators = () => {
  const { validatorsPages, validators } = useValidators();
  const { validatorCount } = useApp();
  // Do we have more than one page?  If so, calculate the total
  const validatorsTotal = validatorsPages > 1 ? validatorsPages * validatorCount : validators.length;

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
