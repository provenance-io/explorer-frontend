import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { breakpoints } from 'consts';
import { useColorScheme } from 'redux/hooks';
import PopupNote from '../PopupNote';
import Sprite from '../Sprite';
import CopyValue from '../CopyValue';

const SummaryRow = styled.div`
  display: flex;
  flex-basis: 100%;
  margin: 10px 0;
  word-break: ${({ nobreak }) => (nobreak ? 'normal' : 'break-all')};
  align-items: flex-start;

  @media ${breakpoints.up('md')} {
    flex-basis: 50%;
  }
`;
const SummaryTitle = styled.div`
  min-width: ${({ size }) => (size ? size : '200px')};
  color: ${({ color, theme }) => (color ? color : theme.FONT_TITLE_INFO)};
`;
const SummaryValue = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  display: flex;
`;
const SummaryChange = styled.div`
  color: ${({ negative, theme }) => (negative ? theme.RED_DARK : theme.GREEN_PRIMARY)};
`;
const NoteContainer = styled.div`
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
const NoteTitle = styled.div`
  min-width: 100px;
`;
const NoteValue = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  display: flex;
  min-width: 100px;
`;

const buildPopupNote = (popupData) => {
  const {
    visibility = { visible: false, setVisible: () => {} },
    icon = { name: 'HELP_OUTLINE', size: '1.7rem' },
    method = ['click'],
    fontColor = 'FONT_WHITE',
    data = [],
    position = 'above',
  } = popupData;
  const showOnHover = method.includes('hover');
  const showOnClick = method.includes('click');
  const { visible, setVisible } = visibility;

  const buildPopupRow = ({ title, value }) => (
    <NoteRow key={title}>
      <NoteTitle>{title}</NoteTitle>
      <NoteValue>{value}</NoteValue>
    </NoteRow>
  );

  return (
    <NoteContainer
      onMouseEnter={showOnHover ? () => setVisible(true) : null}
      onMouseLeave={showOnHover ? () => setVisible(false) : null}
      fontColor={fontColor}
    >
      <PopupNote show={visible} position={position}>
        {data.map((rowData) => buildPopupRow(rowData))}
      </PopupNote>
      <Sprite
        icon={icon.name}
        size={icon.size}
        onClick={showOnClick ? () => setVisible(!visible) : null}
      />
    </NoteContainer>
  );
};

const getChangeValue = (change, children) => (
  <Fragment>
    {children} (<SummaryChange negative={change[0] === '-'}>{change}</SummaryChange>)
  </Fragment>
);
const getPopupValue = (popupNote, children) => (
  <Fragment>
    {children} {buildPopupNote(popupNote)}
  </Fragment>
);
const getExternalLinkValue = (externalLink, children) => (
  <a href={externalLink} target="_blank" rel="noreferrer">
    {children}
  </a>
);
const getInternalLinkValue = (internalLink, children) => <Link to={internalLink}>{children}</Link>;
const getCopyValue = (copyValue, title, children) => (
  <Fragment>
    {children} <CopyValue value={copyValue} title={`Copy ${title}`} />
  </Fragment>
);

const buildSummaryValue = (rowData, theme) => {
  const { value, link, change, externalLink, popupNote, copy, title, isJson } = rowData;
  let finalValue = value;
  if (change) {
    finalValue = getChangeValue(change, finalValue);
  }
  if (popupNote) {
    finalValue = getPopupValue(popupNote, finalValue);
  }
  if (externalLink) {
    finalValue = getExternalLinkValue(externalLink, finalValue);
  }
  if (link) {
    finalValue = getInternalLinkValue(link, finalValue);
  }
  if (copy) {
    finalValue = getCopyValue(copy, title, finalValue);
  }
  if (isJson) {
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

const buildSummaryRow = (rowData, theme) => {
  const { title, value } = rowData;
  const valueMissing = value === undefined || value === null || value === '';

  return (
    <SummaryRow key={title}>
      <SummaryTitle>{title}:</SummaryTitle>
      <SummaryValue>{valueMissing ? '--' : buildSummaryValue(rowData, theme)}</SummaryValue>
    </SummaryRow>
  );
};

const Summary = ({ data }) => {
  const { themeName } = useColorScheme();
  return data.map((rowData) => buildSummaryRow(rowData, themeName));
};

Summary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.node,
      link: PropTypes.string,
      change: PropTypes.string,
      externalLink: PropTypes.string,
      copy: PropTypes.node,
      popupNote: PropTypes.shape({
        visibility: PropTypes.shape({
          visible: PropTypes.bool,
          setVisible: PropTypes.func,
        }),
        icon: PropTypes.shape({
          name: PropTypes.string,
          size: PropTypes.string,
        }),
        method: PropTypes.arrayOf(PropTypes.string),
        fontColor: PropTypes.string,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.node,
          })
        ),
      }),
    })
  ).isRequired,
};

export default Summary;
