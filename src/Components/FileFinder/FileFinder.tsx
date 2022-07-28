import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import TreeMenu, { ItemComponent } from 'react-simple-tree-menu';
import { Content, Button } from 'Components';

const Div = styled.div<{ info: boolean }>`
  display: ${({ info }) => (info ? 'grid' : 'inherit')};
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const Menu = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 50%;
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Sticky = styled.div`
  position: sticky;
  align-self: start;
  top: 220px;
  right: 0;
`;

const ItemWrapper = styled.div<{ theme: string }>`
  :child {
    float: left;
    width: 50%;
  }
  :last-child {
    border-bottom: none;
  }
  cursor: pointer;
  .rstm-toggle-icon {
    display: inline-block;
  }
  .rstm-toggle-icon-symbol {
    width: 2rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
  }

  .rstm-tree-item-group {
    list-style-type: none;
    padding-left: 0;
    border-top: ${({ theme }) => `1px solid ${theme.FONT_PRIMARY}`};
    text-align: left;
    width: 100%;
  }

  .rstm-tree-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.FONT_PRIMARY};
    background: none;
    border-bottom: ${({ theme }) => `1px solid ${theme.FONT_PRIMARY}`};
    box-shadow: none;
    z-index: unset;
    position: relative;
  }
  .rstm-tree-item--active {
    color: ${({ theme }) => theme.FONT_PRIMARY};
    background: ${({ theme }) => theme.BLUE_LIGHT};
    border-bottom: none;
  }
  .rstm-tree-item--focused {
    box-shadow: 0 0 5px 0 #222;
    z-index: 999;
  }

  .rstm-search {
    padding: 1rem 1.5rem;
    border: none;
    width: 100%;
  }
`;

interface FileFinderProps {
  data: any[];
  inputPlaceHolderText?: string;
  showContent?: boolean;
  showSearch?: boolean;
  showResetButton?: boolean;
  info?: JSX.Element;
  currentLabel?: string;
  setCurrentLabel?: (arg: string) => void;
  searchList?: string[]; // Will search a list provided
}

export const FileFinder = ({
  data,
  inputPlaceHolderText = '',
  showSearch = false,
  showResetButton = false,
  info,
  currentLabel = '',
  searchList,
  setCurrentLabel,
}: FileFinderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  return (
    <Div info={Boolean(info)}>
      <TreeMenu data={data} hasSearch={showSearch}>
        {({ search, items, resetOpenNodes }) => (
          <>
            {search && search(searchTerm)}
            {(showResetButton || showSearch) && (
              <Menu>
                {showResetButton && (
                  <Button
                    onClick={() => {
                      resetOpenNodes && resetOpenNodes();
                      setSearchTerm('');
                    }}
                  >
                    Reset
                  </Button>
                )}
                {showSearch && (
                  <>
                    <Input
                      placeholder={inputPlaceHolderText}
                      list={searchList && 'mylist'}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        search && search(searchTerm);
                      }}
                    />
                    {searchList && (
                      <datalist id="mylist">
                        {searchList.map((item, index) => (
                          <option key={index} value={item} />
                        ))}
                      </datalist>
                    )}
                  </>
                )}
              </Menu>
            )}
            <UL>
              {items.map(({ key, label, ...props }) => (
                <ItemWrapper
                  theme={theme}
                  key={key}
                  onClick={setCurrentLabel ? () => setCurrentLabel(label) : undefined}
                >
                  <ItemComponent
                    key={key}
                    label={label}
                    {...props}
                    onClick={() => null}
                    active={currentLabel === label}
                  />
                </ItemWrapper>
              ))}
            </UL>
          </>
        )}
      </TreeMenu>
      {info && (
        <Sticky>
          <Content>{info}</Content>
        </Sticky>
      )}
    </Div>
  );
};
