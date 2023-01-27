import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils';
import { Sprite } from '..';

const SelectInput = styled.div`
  padding: 6px 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.INPUT_BG_LIGHT};
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  position: relative;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
    border: 1px solid transparent;
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.INPUT_BG_THEME};
  }
`;
const SelectInputValueContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SelectInputValue = styled.div`
  margin-right: 20px;
`;
const Caret = styled(Sprite)`
  position: absolute;
  top: -14px;
  left: 14px;
`;
const SelectFoldersContainer = styled.div`
  position: absolute;
  align-items: center;
  flex-wrap: wrap;
  max-height: 216px;
  top: 150%;
  left: 0;
  z-index: 100;
`;
const OptionsContainer = styled.div`
  max-height: ${({ maxHeight }) => maxHeight};
  overflow: ${({ maxHeight }) => !!maxHeight && `scroll`};
`;
const OptionBlock = styled.div`
  padding: 10px 20px;
  background: ${({ theme }) => theme.INPUT_BG_LIGHT};
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  min-width: 150px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.INPUT_FONT_THEME};
  }
`;
const OptionFolder = styled.div``;
const OptionFolderTitle = styled.div`
  white-space: nowrap;
  ${({ active, theme }) => active && `font-weight: bold; color:${theme.FONT_THEME};`}
`;
const OptionFolderItems = styled.div`
  background: ${({ theme }) => theme.BACKGROUND_WHITE};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 150px;
  top: 0;
  display: ${({ open }) => (open ? 'block' : 'none')};
  max-height: 216px;
  overflow-y: auto;
  z-index: 10;
`;
const OptionItem = styled.div`
  background: ${({ theme }) => theme.INPUT_BG_LIGHT};
  font-weight: initial;
  white-space: nowrap;
  ${({ active, theme }) => active && `font-weight: bold; color:${theme.FONT_THEME};`}
  &:hover {
    color: ${({ theme }) => theme.FONT_THEME};
  }
`;

// Look through each option value and find the first one with a 'default: true' value
const findDefaultOption = (options = {}) => {
  const keys = Object.keys(options);
  // Normally would use forEach, but I want to break the chain/loop once we find a default (save resources)
  for (let i = 0; i < keys.length; i += 1) {
    const option = options[keys[i]];
    if (option.isDefault) {
      return keys[i];
    }
  }
  return null;
};

// Look at the default option, if it's a folder, it needs one of the options inside of it as a default as well
const findDefaultFolder = (defaultOption = {}) => {
  const { options } = defaultOption;
  // If there are no options then it's not a folder
  if (!options) return null;
  const optionKeys = Object.keys(options);
  // Normally would use forEach, but I want to break the chain/loop once we find a default (save resources)
  for (let i = 0; i < optionKeys.length; i += 1) {
    const option = options[optionKeys[i]];
    if (option.isDefault) {
      return option;
    }
  }
  // If no option is selected as the default, just pick the first one in the folder...
  return options[optionKeys][0];
};

const SelectFolders = ({ allOptions, action, maxHeight, setDefaults }) => {
  const defaultOption = findDefaultOption(allOptions);
  const defaultFolder = findDefaultFolder(allOptions[defaultOption]);
  const [activeFilter, setActiveFilter] = useState(defaultOption);
  const [activeFolder, setActiveFolder] = useState(defaultFolder);
  const [hoverFolder, setHoverFolder] = useState(null);
  const [activeFilterTitle, setActiveFilterTitle] = useState(allOptions[defaultOption].title);
  const [menuOpen, setMenuOpen] = useState(false);

  // Set defaults if provided
  useEffect(() => {
    if (!isEmpty(setDefaults)) {
      if (setDefaults.Filter) {
        setActiveFilter(setDefaults.Filter);
      }
      if (setDefaults.Folder) {
        setActiveFolder(setDefaults.Folder);
      }
      if (setDefaults.FilterTitle) {
        setActiveFilterTitle(setDefaults.FilterTitle);
      }
    }
    // eslint-disable-next-line
  }, []);

  const toggleMenu = (e) => {
    // Don't let this event bubble
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const buildOptions = (options, isChild) => {
    const optionKeys = Object.keys(options);
    // Loop through all first layer of options
    return optionKeys.map((optionItemKey) => {
      // Shape with up to 3 keys: title, options, and default
      const optionItem = options[optionItemKey];
      const { title, options: folderOptions } = optionItem;

      // Check for options, if they exist, it means this is a folder and needs to be rendered as a folder
      return (
        <OptionBlock key={`${optionItemKey}_${title}`}>
          {folderOptions ? (
            <OptionFolder onMouseEnter={() => setHoverFolder(optionItemKey)}>
              <OptionFolderTitle
                active={activeFolder === optionItemKey}
              >{`${title} >`}</OptionFolderTitle>
              <OptionFolderItems open={hoverFolder === optionItemKey}>
                {buildOptions(folderOptions, true)}
              </OptionFolderItems>
            </OptionFolder>
          ) : (
            <OptionItem
              // If top-layer item (non-child), need to close already open folder
              onMouseEnter={() => (!isChild ? setHoverFolder(null) : null)}
              active={activeFilter === optionItemKey}
              onClick={(e) => {
                // Don't let this event bubble
                e.stopPropagation();
                // Close the menu since an option was selected
                setMenuOpen(false);
                setActiveFilter(optionItemKey);
                setActiveFilterTitle(title);
                // Only children will have activated a hoverFolder
                if (hoverFolder) {
                  setActiveFolder(hoverFolder);
                } else {
                  // Top layer item will reset open folders
                  setActiveFolder(null);
                }
                // Kick off the action
                action(optionItemKey);
              }}
            >
              {title}
            </OptionItem>
          )}
        </OptionBlock>
      );
    });
  };

  return (
    <SelectInput onClick={() => setMenuOpen(true)} onBlur={() => setMenuOpen(false)} tabIndex="0">
      <SelectInputValueContainer>
        <SelectInputValue>{activeFilterTitle}</SelectInputValue>
        <Sprite
          icon="CHEVRON"
          size="1.0rem"
          color="ICON_PRIMARY"
          spin={menuOpen ? '90' : '-90'}
          onClick={toggleMenu}
        />
      </SelectInputValueContainer>
      {menuOpen && (
        <SelectFoldersContainer>
          <Caret icon="CARET" size="1.8rem" flipY color="INPUT_BG_LIGHT" />
          <OptionsContainer maxHeight={maxHeight}>{buildOptions(allOptions)}</OptionsContainer>
        </SelectFoldersContainer>
      )}
    </SelectInput>
  );
};

SelectFolders.propTypes = {
  allOptions: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
  setDefaults: PropTypes.object,
};

SelectFolders.defaultProps = {
  maxHeight: null,
  setDefaults: {},
};

export default SelectFolders;
