import React, { Fragment, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { breakpoints } from 'consts';
import { useColorScheme } from 'redux/hooks';
import { maxLength } from 'utils';
import PopupNote from '../PopupNote';
import Sprite from '../Sprite';
import CopyValue from '../CopyValue';
import DataRow, { DataTitle as SummaryTitle, DataValue as SummaryValue } from '../DataRow';

const SummaryRow = styled(DataRow)<{ nobreak: boolean; isJson: boolean }>`
  word-break: ${({ nobreak }) => (nobreak ? 'normal' : 'break-all')};
  @media ${breakpoints.up('md')} {
    flex-basis: ${({ isJson }) => (isJson ? 100 : 50)}%;
  }
`;
const SummaryChange = styled.div<{ negative: boolean }>`
  color: ${({ negative, theme }) => (negative ? theme.RED_DARK : theme.GREEN_PRIMARY)};
`;
const NoteContainer = styled.div<{ fontColor: string }>`
  position: relative;
  margin-left: 6px;
  ${({ fontColor }) => fontColor && `color: ${fontColor};`}
`;
const NoteRow = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  align-items: flex-start;
  word-break: normal;
`;
const NoteTitle = styled.div<{ titleMinWidth: string }>`
  min-width: ${({ titleMinWidth }) => (titleMinWidth ? titleMinWidth : '100px')};
`;
const NoteValue = styled.div<{ noteMinWidth: string }>`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  display: flex;
  min-width: ${({ noteMinWidth }) => (noteMinWidth ? noteMinWidth : '100px')};
`;
const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0px;
  line-height: 0px;
`;
const List = styled.li`
  line-height: 17px;
  margin-bottom: 5px;
`;

interface PopupDataProps {
  visibility: {
    visible: boolean;
    setVisible: (arg: boolean) => MouseEventHandler<HTMLDivElement>;
  };
  icon: {
    name: string;
    size: string;
  };
  method: string[];
  fontColor: string;
  data: [];
  position: string;
  titleMinWidth: string;
  noteMinWidth: string;
}

const buildPopupNote = (popupData: PopupDataProps) => {
  const {
    visibility = { visible: false, setVisible: () => {} },
    icon = { name: 'HELP_OUTLINE', size: '1.7rem' },
    method = ['click'],
    fontColor = 'FONT_WHITE',
    data = [],
    position = 'above',
    titleMinWidth = '',
    noteMinWidth = '',
  } = popupData;
  const showOnHover = method.includes('hover');
  const showOnClick = method.includes('click');
  const { visible, setVisible } = visibility;

  interface BuildPopupRowProps {
    title: string;
    value: string;
    hideTitle?: boolean;
  }

  const buildPopupRow = ({ title, value, hideTitle = false }: BuildPopupRowProps) => (
    <NoteRow key={title}>
      {!hideTitle && <NoteTitle titleMinWidth={titleMinWidth}>{title}</NoteTitle>}
      <NoteValue noteMinWidth={noteMinWidth}>{value}</NoteValue>
    </NoteRow>
  );

  return (
    <NoteContainer
      onMouseEnter={showOnHover ? () => setVisible(true) : undefined}
      onMouseLeave={showOnHover ? () => setVisible(false) : undefined}
      fontColor={fontColor}
    >
      <PopupNote show={visible} position={position}>
        {data.map((rowData) => buildPopupRow(rowData))}
      </PopupNote>
      <Sprite
        icon={icon.name}
        size={icon.size}
        onClick={showOnClick ? () => setVisible(!visible) : undefined}
      />
    </NoteContainer>
  );
};

const getChangeValue = (change: string, children: React.ReactNode) => (
  <Fragment>
    {children} (<SummaryChange negative={change[0] === '-'}>{change}</SummaryChange>)
  </Fragment>
);
const getPopupValue = (popupNote: PopupDataProps, children: React.ReactNode) => (
  <Fragment>
    {children} {buildPopupNote(popupNote)}
  </Fragment>
);
const getExternalLinkValue = (externalLink: string, children: React.ReactNode) => (
  <a href={externalLink} target="_blank" rel="noreferrer">
    {children}
  </a>
);
const getInternalLinkValue = (
  internalLink: string,
  children: React.ReactNode | string,
  splitOnSpace: boolean
) => {
  let num = '';
  if (splitOnSpace && children && typeof children === 'string') {
    const splitString = children.split(' ');
    num = splitString[0] + ' ';
    children = splitString[1];
  }
  return (
    <Fragment>
      {splitOnSpace && <SummaryValue>{num}&nbsp;</SummaryValue>}
      <Link to={internalLink}>{maxLength(children, 12, '6')}</Link>
    </Fragment>
  );
};
const getCopyValue = (copyValue: string, title: string, children: React.ReactNode) => (
  <Fragment>
    {children} <CopyValue value={copyValue} title={`Copy ${title}`} />
  </Fragment>
);

const getList = (list: string[], linkList?: string[], onClick?: (arg?: string) => void) => {
  let index = -1;
  const myList = list.map((element) => {
    index++;
    if (linkList) {
      return (
        <Link
          to={linkList[index]}
          key={index}
          onClick={onClick ? () => onClick(element) : undefined}
        >
          <List>{element}</List>
        </Link>
      );
    } else {
      return <List key={index}>{element}</List>;
    }
  });
  return myList;
};

interface RowDataProps {
  isJson?: boolean;
  nobreak?: boolean;
  title: string;
  value: React.ReactNode | string;
  hover?: string;
  link?: string;
  change?: string;
  externalLink?: string;
  popupNote?: PopupDataProps;
  copy?: string;
  splitOnSpace?: boolean;
  list?: string[];
  linkList?: string[];
  onClick?: (arg?: string) => void; // Something done on clicking a link
}

const buildSummaryValue = (rowData: RowDataProps, theme: string) => {
  const {
    value,
    link,
    change,
    externalLink,
    popupNote,
    copy,
    title,
    isJson,
    splitOnSpace = false,
    list,
    linkList,
    onClick,
  } = rowData;

  let finalValue = value;
  if (change) {
    finalValue = getChangeValue(change, finalValue);
  }
  if (externalLink) {
    finalValue = getExternalLinkValue(externalLink, finalValue);
  }
  if (link) {
    finalValue = getInternalLinkValue(link, finalValue, splitOnSpace);
  }
  if (copy) {
    finalValue = getCopyValue(copy, title, finalValue);
  }
  if (popupNote) {
    finalValue = getPopupValue(popupNote, finalValue);
  }
  if (list) {
    finalValue = <UL>{getList(list, linkList, onClick)}</UL>;
  }
  if (isJson && typeof finalValue === 'string') {
    finalValue = (
      <ReactJson
        src={JSON.parse(finalValue)}
        theme={theme === 'night' ? 'summerfruit' : 'summerfruit:inverted'}
        collapsed
      />
    );
  }

  return finalValue;
};

const buildSummaryRow = (rowData: RowDataProps, theme: string) => {
  const { isJson, nobreak = false, title, value, hover = '' } = rowData;
  const valueMissing = value === undefined || value === null || value === '';

  return (
    <SummaryRow key={title} isJson={isJson || false} nobreak={nobreak}>
      <SummaryTitle>{title}:</SummaryTitle>
      {hover ? (
        <SummaryValue title={hover}>
          {valueMissing ? '--' : buildSummaryValue(rowData, theme)}
        </SummaryValue>
      ) : (
        <SummaryValue>{valueMissing ? '--' : buildSummaryValue(rowData, theme)}</SummaryValue>
      )}
    </SummaryRow>
  );
};

interface DataProps {
  title: string;
  isJson?: boolean;
  hover?: string;
  value: React.ReactNode | string;
  link?: string;
  change?: string;
  externalLink?: string;
  copy?: string;
  splitOnSpace?: boolean;
  popupNote?: PopupDataProps;
}

export interface SummaryDataProps {
  data: DataProps[];
}

const Summary = ({ data }: SummaryDataProps) => {
  const { themeName } = useColorScheme();
  return <>{data.map((rowData) => buildSummaryRow(rowData, themeName))}</>;
};

export default Summary;
