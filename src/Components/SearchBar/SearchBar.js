import React, { useState } from 'react';
import styled from 'styled-components';
import { Sprite } from 'Components';
import { useHistory } from 'react-router-dom';
import { breakpoints } from 'consts';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  position: relative;
`;
const TextInputContainer = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;

  @media ${breakpoints.up('lg')} {
    min-width: 375px;
  }
`;
const TextInput = styled.input`
  background-color: ${({ theme }) => theme.INPUT_BG_DARK};
  color: ${({ theme }) => theme.INPUT_FONT_DARK};
  border: 1px solid ${({ theme }) => theme.INPUT_BORDER_DARK};
  border-radius: 4px;
  padding: 6px 40px 6px 90px;
  width: 100%;
  font-size: 1.4rem;
  line-height: 2.2rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_DARK};
  }
  &::placeholder {
    color: ${({ theme }) => theme.INPUT_PLACEHOLDER_DARK};
  }
`;
const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 6px;
  cursor: pointer;
`;
const SelectContainer = styled.div`
  position: absolute;
  left: 3px;
  min-width: 75px;
  margin: 0px;
  cursor: pointer;
`;
const SelectArrow = styled.div`
  position: absolute;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  right: 1px;
  bottom: 1px;
  border-left: none;
  border-radius: 0px 4px 4px 0px;
  pointer-events: none;
  width: 26px;
  height: 100%;
`;
const Select = styled.select`
  background: ${({ theme }) => theme.INPUT_BTN_DARK};
  padding: 0 8px;
  height: 30px;
  color: ${({ theme }) => theme.INPUT_BTN_DARK_TEXT};
  border: none;
  font-size: 1rem;
  position: relative;
  width: 100%;
  border-radius: 4px;
  line-height: 22px;
  appearance: none;
  outline: none;
  cursor: pointer;
`;

// This is a basic redirect search bar.  Enter a term and end up on the page for it - not an actual search.  See SearchBarOld.js for real results when they exist
const SearchBar = () => {
  const [searchTerms, setSearchTerms] = useState('');
  const [searchType, setSearchType] = useState('block');
  const history = useHistory();

  const enterSearchTerms = e => {
    const term = e?.target?.value;
    setSearchTerms(term);
  };

  const runSearch = () => {
    if (!searchTerms || !searchTerms.length) return;
    setSearchTerms('');
    switch (searchType) {
      case 'tx': {
        history.push(`/tx/${searchTerms}`);
        break;
      }
      case 'block': {
        history.push(`/block/${searchTerms}`);
        break;
      }
      case 'validator': {
        history.push(`/validator/${searchTerms}`);
        break;
      }
      case 'address': {
        history.push(`/accounts/${searchTerms}`);
        break;
      }
      case 'asset': {
        history.push(`/asset/${searchTerms}`);
        break;
      }
      case 'nft': {
        history.push(`/nft/${searchTerms}`);
        break;
      }
      default:
        break;
    }
  };

  return (
    <SearchContainer>
      <TextInputContainer>
        <TextInput
          id="SearchBar"
          onChange={enterSearchTerms}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              runSearch();
            }
          }}
          placeholder="Enter Search Value"
          value={searchTerms}
        />
      </TextInputContainer>
      <SelectContainer>
        <Select
          id="select"
          onChange={({ target }) => setSearchType(target.value)}
          label=""
          value={searchType}
        >
          <option value="block">Block</option>
          <option value="validator">Validator</option>
          <option value="tx">Tx</option>
          <option value="address">Address</option>
          <option value="asset">Asset</option>
          <option value="nft">NFT</option>
        </Select>
        <SelectArrow>
          <Sprite icon="CARET" size="0.9rem" color="ICON_WHITE" />
        </SelectArrow>
      </SelectContainer>
      <SearchIcon onClick={runSearch}>
        <Sprite icon="SEARCH" size="2.2rem" color="ICON_WHITE" />
      </SearchIcon>
    </SearchContainer>
  );
};

export default SearchBar;
