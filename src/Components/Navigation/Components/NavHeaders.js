import React from 'react';
import styled from 'styled-components';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { Links, breakpoints } from 'consts';
import { useMediaQuery } from 'redux/hooks';
// Direct import to prevent import order issues
import Sprite from '../../Sprite';

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10% 0 9%;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  @media ${breakpoints.down('lg')} {
    padding: 0 4% 0 2%;
  }
`;

const NavSectionUL = styled.ul`
  list-style: none;
  display: flex;
`;

const NavSectionLI = styled.li`
  position: relative;
  width: 100%;
  text-align: left;
`;

const DropdownUL = styled.ul`
  position: absolute;
  max-height: 0;
  overflow: hidden;
  white-space: nowrap;
  transition-delay: 300ms;
  flex-direction: column;
  list-style: none;
  margin-left: -55px;
  padding: 10px 0 0 0;
  ${NavSectionLI}:hover & {
    max-height: 150px;
    transition-delay: 500ms;
  }
`;

const Link = styled(BaseLink)`
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_NAV};
  font-size: 1.4rem;
  opacity: 1;
  border-bottom: ${({ theme }) => `2px solid ${theme.BACKGROUND_NAV};`};
  :visited {
    color: ${({ theme }) => theme.FONT_NAV_VISITED};
  }
  ${({ $active, theme, $subDrop }) =>
    $active &&
    `
    opacity: 1;
    font-weight: ${theme.FONT_WEIGHT_BOLDEST};
    border-bottom: ${$subDrop ? '0px' : `2px solid ${theme.FONT_NAV}`};
    `}
  :first-child {
    margin: 0 10px 0 0;
  }
  &&& {
    color: ${({ theme }) => theme.FONT_NAV};
    ${({ $subDrop, theme }) =>
      $subDrop &&
      `
      :hover {
        color: ${theme.FONT_LINK};
      }
    `}
  }
  padding: ${({ $subDrop }) => $subDrop && '3px 7px 3px 7px;'};
`;

const DropSprite = styled(Sprite)`
  position: absolute;
  display: flex;
  margin: -19px 0 0 47%;
  transition-delay: 300ms;
  transition-duration: 300ms;
  ${NavSectionLI}:hover & {
    transition-delay: 300ms;
    transition-duration: 300ms;
    transform: rotate(450deg);
  }
`;

const NavHeaders = () => {
  const { pathname } = useLocation();
  const { matches: isLg } = useMediaQuery(breakpoints.up('lg'));

  const buildLink = (linkName, { url, title, subMenu = {} }, subDrop) => {
    const active = pathname === url;
    const isSubMenu = Links[linkName]?.subMenu || undefined;
    return (
      <NavSectionUL key={url}>
        <NavSectionLI $subDrop={subDrop} isLg={isLg}>
          <Link
            key={url}
            to={isSubMenu ? '#' : url}
            $active={active}
            $subDrop={subDrop}
            data-testid={`${title.toLowerCase()}-navlink`}
          >
            {title}
          </Link>
          {isSubMenu && (
            <>
              <DropSprite icon="CHEVRON" height="10px" spin={270} />
              <DropdownUL>
                {Object.keys(subMenu).map(subName =>
                  buildLink(subName, Links[linkName].subMenu[subName], true)
                )}
              </DropdownUL>
            </>
          )}
        </NavSectionLI>
      </NavSectionUL>
    );
  };

  const buildLinks = () =>
    Object.keys(Links).map(linkName => buildLink(linkName, Links[linkName], false));

  return <NavigationWrapper>{buildLinks()}</NavigationWrapper>;
};

export default NavHeaders;
