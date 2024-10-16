import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PopupNote, Sprite } from '../../Components';

const NoteContainer = styled.div<{ fontColor: string }>`
  position: relative;
  margin-left: 6px;
  display: flex;
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
const NoteValue = styled.div<{ noteMinWidth: string; column?: string }>`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
  display: flex;
  gap: 10px;
  flex-direction: ${({ column }) => column && 'column'};
  min-width: ${({ noteMinWidth }) => (noteMinWidth ? noteMinWidth : '100px')};
`;

interface PopupDataProps {
  visibility: {
    visible: boolean;
    setVisible: (arg: boolean) => React.MouseEventHandler<HTMLDivElement>;
  };
  icon: {
    name: string;
    size: string;
  };
  method: string[];
  fontColor: string;
  data: [];
  position: 'above' | 'below' | 'left' | 'right';
  titleMinWidth: string;
  noteMinWidth: string;
}

export const BuildPopupNote = (popupData: PopupDataProps) => {
  const {
    visibility = { visible: false, setVisible: () => {} },
    icon = { name: 'HELP_OUTLINE', size: '1.063rem' },
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
    externalLink?: string;
    link?: string; // The link embedded in the popup note
    linkValue?: string; // the value displayed that holds the link
  }

  const buildPopupRow = ({
    title,
    value,
    hideTitle = false,
    externalLink,
    link,
    linkValue,
  }: BuildPopupRowProps) => (
    <NoteRow key={title}>
      {!hideTitle && <NoteTitle titleMinWidth={titleMinWidth}>{title}</NoteTitle>}
      {
        <NoteValue noteMinWidth={noteMinWidth} column={(link || externalLink) && linkValue}>
          {externalLink ? (
            <>
              {value}
              <a href={externalLink} target="_blank" rel="noreferrer">
                {linkValue}
              </a>
            </>
          ) : link ? (
            <>
              {value} <Link to={link}>{linkValue}</Link>
            </>
          ) : (
            value
          )}
        </NoteValue>
      }
    </NoteRow>
  );

  return (
    <NoteContainer
      onMouseEnter={showOnHover ? () => setVisible(true) : undefined}
      onMouseLeave={showOnHover ? () => setVisible(false) : undefined}
      fontColor={fontColor}
    >
      <PopupNote show={visible} position={position} zIndex="1000">
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
