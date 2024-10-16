import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useName } from '../../../redux/hooks';
import { FileFinder, CopyValue } from '../../../Components';
import { NameTree } from '../../../redux/features/name/nameSlice';
import { maxLength, capitalize } from '../../../utils';
import { breakpoints } from '../../../consts';

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 5px;
  @media ${breakpoints.down('sm')} {
    font-size: 0.75rem;
  }
`;
const Info = styled.div<{ copy: boolean }>`
  display: ${({ copy }) => (copy ? 'flex' : 'inherit')};
  font-size: 0.875rem;
  padding: 5px 10px;
  @media ${breakpoints.down('sm')} {
    font-size: 0.625rem;
  }
`;

const Left = styled.div``;

const Right = styled.div`
  text-align: right;
  margin-left: auto;
  @media ${breakpoints.down('md')} {
    margin: 0;
    text-align: left;
  }
`;

interface KeySearch {
  key: string;
  tree: NameTree[];
}

export const NameTreeFileFinder = () => {
  const { nameTree, getNameTree } = useName();
  const [currentLabel, setCurrentLabel] = useState('pb');

  let keyToDisplay = <>No data was found</>;

  const getKeyInfo = ({ key, tree }: KeySearch) => {
    tree.forEach((item) => {
      if (key === item.fullName) {
        keyToDisplay = (
          <>
            <Left>
              <Title>Name</Title>
              <Info copy>
                {maxLength(item.fullName, 10, '4')}
                <CopyValue value={item.fullName} />
              </Info>
              <Title>Owner</Title>
              <Info copy>
                <a href={`/accounts/${item.owner}`}>{maxLength(item.owner, 10, '4')}</a>
                <CopyValue value={item.owner} />
              </Info>
            </Left>
            <Right>
              <Title>Restricted</Title>
              <Info copy={false}>{capitalize(String(item.restricted))}</Info>
              <Title>Children</Title>
              <Info copy={false}>{item.children.length}</Info>
            </Right>
          </>
        );
        return;
      } else if (item.children.length > 0) {
        getKeyInfo({ key, tree: item.children });
      }
    });
  };

  getKeyInfo({ key: currentLabel, tree: nameTree });

  const getSearchList = (data: NameTree[], listOfNames: string[]) => {
    data.forEach((item) => {
      listOfNames.push(item.name);
      if (item.children.length > 0) {
        getSearchList(item.children, listOfNames);
      }
    });
    return listOfNames;
  };

  // Pull name tree data
  useEffect(() => {
    getNameTree();
  }, [getNameTree]);

  return (
    <FileFinder
      data={nameTree}
      inputPlaceHolderText="Search Name Tree"
      showSearch
      showResetButton
      info={keyToDisplay}
      currentLabel={currentLabel}
      setCurrentLabel={setCurrentLabel}
      searchList={getSearchList(nameTree, []).sort()}
    />
  );
};
