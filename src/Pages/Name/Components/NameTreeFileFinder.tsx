import { useEffect, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
import { useName } from 'redux/hooks';
import { Content as BaseContent, SearchBar, Summary } from 'Components';
import { Colors } from 'theme/Colors';
import { NameTree } from 'redux/features/name/nameSlice';
import { maxLength } from 'utils';

const Div = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const ShowJSON = styled.div`
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ItemWrapper = styled.div`
  border-bottom: 1px solid ${Colors.BACKGROUND_NAV};
  :child {
    float: left;
    width: 50%;
  }
  :last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;

const Content = styled(BaseContent)`
  max-height: 200px;
  margin-left: 10px;
  text-align: center;
  display: flex;
`;

interface KeySearch {
  key: string;
  tree: NameTree[];
};

export const NameTreeFileFinder = () => {
  const { nameTree, nameTreeLoading, getNameTree } = useName();
  const [myLabel, setMyLabel] = useState('pb');
  const [searchTerm, setSearchTerm] = useState('');

  let keyToDisplay = <>No data was found</>;

  const getKeyInfo = ({ key, tree }:KeySearch) => {
    tree.forEach(item => {
      if (key === item.fullName) {
        keyToDisplay = <Summary data={[
          {title: 'Name', value: item.segmentName},
          {
            title: 'Owner', 
            value: maxLength(item.owner, 8, '4'),
            link: `/accounts/${item.owner}`,
          },
          {title: 'Restricted', value: String(item.restricted)},
          {title: 'Children', value: item.children.length},
        ]} />;
      }
      else if (item.children.length > 0) {
        getKeyInfo({key, tree: item.children})
      }
    });
  };

  getKeyInfo({key: myLabel, tree: nameTree });

  // Pull name tree data
  useEffect(() => {
    getNameTree();
  }, [getNameTree]);

  console.log(nameTree);

  const testData = [
    {
      key: 'test1',
      label: 'test1',
      nodes: [
        {
          key: 'test2',
          label: 'test2',
        },
      ],
    },
  ];

  return (
    <Div>
      <TreeMenu data={nameTree} hasSearch>
        {({ search, items, resetOpenNodes }) => (
          <>
            <button onClick={resetOpenNodes as unknown as MouseEventHandler<HTMLButtonElement>}>
              Reset
            </button>
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
                search && search(searchTerm);
              }}
            >
            </input>
            <UL>
              {items.map(({key, label, ...props}) => (
                <ItemWrapper key={key} onClick={() => setMyLabel(label)}>
                  <ItemComponent key={key} label={label} {...props} onClick={() => null}/>
                </ItemWrapper>
              ))}
            </UL>
          </>
        )}
      </TreeMenu>
      <Content>
        <ShowJSON>
          {keyToDisplay}
        </ShowJSON>
      </Content>
    </Div>
  )
};