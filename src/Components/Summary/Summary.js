import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PopupNote from '../PopupNote';
import Sprite from '../Sprite';
import CopyValue from '../CopyValue';

const SummaryRow = styled.div`
  display: flex;
  flex-basis: 100%;
  margin: 10px 0;
  word-break: ${({ nobreak }) => (nobreak ? 'normal' : 'break-all')};
  align-items: flex-start;
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
    icon = { name: 'HELP', size: '1.7rem' },
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
      <Sprite icon={icon.name} size={icon.size} onClick={showOnClick ? () => setVisible(!visible) : null} />
    </NoteContainer>
  );
};

const getChangeValue = (change, children) => (
  <>
    {children} (<SummaryChange negative={change[0] === '-'}>{change}</SummaryChange>)
  </>
);
const getPopupValue = (popupNote, children) => (
  <>
    {children} {buildPopupNote(popupNote)}
  </>
);
const getExternalLinkValue = (externalLink, children) => (
  <a href={externalLink} target="_blank" rel="noreferrer">
    {children}
  </a>
);
const getInternalLinkValue = (internalLink, children) => <Link to={internalLink}>{children}</Link>;
const getCopyValue = (copyValue, title, children) => (
  <>
    {children} <CopyValue value={copyValue} title={`Copy ${title}`} />
  </>
);

const buildSummaryValue = (rowData) => {
  const { value, link, change, externalLink, popupNote, copy, title } = rowData;
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

  return finalValue;
};

const buildSummaryRow = (rowData) => {
  const { title, value } = rowData;
  const valueMissing = value === undefined || value === null || value === '';

  return (
    <SummaryRow key={title}>
      <SummaryTitle>{title}:</SummaryTitle>
      <SummaryValue>{valueMissing ? '[N/A]' : buildSummaryValue(rowData)}</SummaryValue>
    </SummaryRow>
  );
};

const Summary = ({ data }) => data.map((rowData) => buildSummaryRow(rowData));

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
