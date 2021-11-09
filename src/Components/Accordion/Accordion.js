import { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { Sprite } from 'Components';
import { ICON_NAMES } from 'consts';

const Wrapper = styled.div`
  width: 100%;
  margin: ${({ isOpen }) => isOpen && '16px 0'};
  border-top: ${({ theme, isOpen }) => !isOpen && `${theme.BORDER_PRIMARY} 1px solid`};
  box-shadow: ${({ theme, isOpen }) =>
    isOpen &&
    `${theme.BOX_SHADOW} 0px 2px 1px -1px ${theme.BOX_SHADOW} 0px 1px 1px 0px ${theme.BOX_SHADOW} 0px 1px 3px 0px`};
  background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
  transition: margin 300ms cubic-bezier(0.165, 0.84, 0.44, 1);

  &:first-of-type {
    margin: ${({ isOpen }) => isOpen && '0 0 16px'};
    border-top: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-of-type {
    margin: ${({ isOpen }) => isOpen && '16px 0 0'};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const AccordionHeader = styled.header`
  display: grid;
  grid-template-columns: ${({ showChevron }) => (showChevron ? '2fr 1fr' : '1fr')};
  align-items: center;
  padding: 20px;
  cursor: pointer;
  user-select: none;
`;

const AccordionBody = styled.div`
  padding: ${({ isOpen }) => isOpen && '0 20px 20px'};
  height: ${({ isOpen }) => (isOpen ? 'auto' : 0)}px;
  min-height: 0;
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: height min-height 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  visibility: ${({ isOpen }) => !isOpen && 'hidden'};
`;

const Accordion = ({ children, showChevron, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleState = () => setIsOpen(open => !open);

  return (
    <Wrapper isOpen={isOpen}>
      <AccordionHeader onClick={toggleState} isOpen={isOpen} showChevron={showChevron}>
        {title}
        {showChevron && (
          <Sprite
            animate
            flipX
            color={theme.FONT_PRIMARY}
            icon={ICON_NAMES.CHEVRON}
            size="1.6rem"
            spin={isOpen ? -90 : null}
            style={{ justifySelf: 'end' }}
          />
        )}
      </AccordionHeader>
      <AccordionBody isOpen={isOpen}>{children}</AccordionBody>
    </Wrapper>
  );
};

Accordion.propTypes = {
  children: PropTypes.any.isRequired,
  showChevron: PropTypes.bool,
  title: PropTypes.any.isRequired,
};

Accordion.defaultProps = {
  showChevron: false,
};

export default Accordion;
