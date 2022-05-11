import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Sprite as BaseSprite } from 'Components';
import { breakpoints } from 'consts';

const DataCardContainer = styled.div`
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
    font-size: 1.2rem;
  }
`;
const Sprite = styled(BaseSprite)`
  margin-right: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  margin: ${({ titleMargin }) => (titleMargin ? titleMargin : '0 0 30px 0')};
`;
const Title = styled.div`
  font-size: ${({ titleSize }) => (titleSize ? titleSize : '1.4rem')};
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
    font-size: 1.8rem;
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

const DataCard = ({
  className,
  icon,
  title,
  children,
  width,
  handleClose,
  iconColor,
  titleMargin,
  titleSize,
}) => (
  <DataCardContainer className={className} width={width}>
    <DataContent>
      <TitleRow titleMargin={titleMargin}>
        {icon && <Sprite icon={icon} size="1.8rem" color={iconColor} />}
        <Title titleSize={titleSize}>{title}</Title>
        {handleClose && (
          <CloseIcon icon="CLOSE" onClick={handleClose} size="1.4rem" color="ICON_WHITE" />
        )}
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

DataCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  width: PropTypes.string,
  handleClose: PropTypes.func,
  titleMargin: PropTypes.string,
  titleSize: PropTypes.string,
};
DataCard.defaultProps = {
  className: '',
  icon: '',
  iconColor: '',
  width: '',
  handleClose: null,
  titleMargin: '',
  titleSize: '',
};

export default DataCard;
