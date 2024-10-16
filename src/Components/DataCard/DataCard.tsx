import styled from 'styled-components';
import { Sprite as BaseSprite } from '../../Components';
import { breakpoints } from '../../consts';
import { BuildPopupNote } from '../../Components/PopupNote/BuildPopupNote';

const DataCardContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '50%')};
  @media ${breakpoints.down('sm')} {
    min-width: 100%;
  }
`;
const DataContent = styled.div`
  border: 1px solid ${({ theme }) => theme.BORDER_PRIMARY};
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  @media ${breakpoints.down('md')} {
    font-size: 0.75rem;
  }
`;
const Sprite = styled(BaseSprite)`
  margin-right: 8px;
`;

const TitleRow = styled.div<{ titleMargin?: string; titleSize?: string }>`
  display: flex;
  margin: ${({ titleMargin }) => (titleMargin ? titleMargin : '0 0 30px 0')};
`;
const Title = styled.div<{ titleSize?: string }>`
  font-size: ${({ titleSize }) => (titleSize ? titleSize : '0.875rem')};
`;
const DataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const DataItem = styled.div`
  flex-basis: 100%;
  margin-bottom: 10px;
  &:first-of-type {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT_NORMAL};
    font-size: 1.125rem;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;
const CloseIcon = styled(Sprite)`
  margin-left: auto;
  :hover {
    cursor: pointer;
  }
`;

interface DataCardProps {
  className?: string;
  icon?: string;
  title: string;
  children: any;
  width?: string;
  handleClose?: () => void;
  iconColor?: string;
  titleMargin?: string;
  titleSize?: string;
  popup?: any;
}

export const DataCard = ({
  className,
  icon,
  title,
  children,
  width,
  handleClose,
  iconColor,
  titleMargin,
  titleSize,
  popup,
}: DataCardProps) => (
  <DataCardContainer className={className} width={width}>
    <DataContent>
      <TitleRow titleMargin={titleMargin}>
        {icon && <Sprite icon={icon} size="1.125rem" color={iconColor} />}
        <Title titleSize={titleSize}>{title}</Title>
        {handleClose && (
          <CloseIcon icon="CLOSE" onClick={handleClose} size="0.875rem" color="ICON_WHITE" />
        )}
        {popup && BuildPopupNote(popup)}
      </TitleRow>
      <DataContainer>
        {Array.isArray(children) ? (
          children.map((child, index) => <DataItem key={index}>{child}</DataItem>)
        ) : (
          <DataItem>{children}</DataItem>
        )}
      </DataContainer>
    </DataContent>
  </DataCardContainer>
);
