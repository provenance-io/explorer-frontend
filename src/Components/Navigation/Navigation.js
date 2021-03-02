import styled from 'styled-components';
import { useMediaQuery } from 'redux/hooks';
import { breakpoints } from 'consts';
import { NavStandard, NavMini } from './Components';

const NavigationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 100vw;
  z-index: 200;
`;

const Navigation = () => {
  const { matches: useMini } = useMediaQuery(breakpoints.down('md'));

  return <NavigationWrapper>{useMini ? <NavMini /> : <NavStandard />}</NavigationWrapper>;
};

export default Navigation;
