import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from 'consts';

const ProgressBar = styled.div`
  position: relative;
  margin-bottom: 8px;
  width: 100%;
  height: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) inset;
  background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
`;

const ProgressValue = styled.span`
  position: absolute;
  left: ${({ start = 0 }) => start}%;
  display: block;
  width: ${({ value }) => (value > 100 ? 100 : value)}%;
  height: ${({ height = 100 }) => height}%;
  text-indent: -9999px;
  background-color: ${({ color, theme }) => theme[color]};
`;

const KeyContainer = styled.div`
  margin: 10px 0 0;
  display: flex;
  width: 100%;
  gap: 1.6rem;
  flex-direction: column;

  @media ${breakpoints.up('md')} {
    flex-direction: row;
  }
`;

const Key = styled.div`
  display: flex;
  align-items: center;
  flex-basis: calc(25% - 1.6rem);
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 200;
  line-height: 1.75;
`;

const KeySquare = styled.span`
  height: 100%;
  max-height: 100%;
  min-height: ${({ minHeight }) => minHeight}px;
  width: 5px;
  background-color: ${({ color, theme }) => theme[color]};
`;

const Progress = ({ data, keySquareHeight, showKey }) => (
  <Fragment>
    <ProgressBar>
      {data.map((p) => (
        <ProgressValue
          key={p.color}
          color={p.color}
          height={p.height}
          start={p.start}
          value={p.value}
        />
      ))}
    </ProgressBar>

    {showKey && (
      <KeyContainer>
        {data.map((p) => (
          <Key key={p.color}>
            <KeySquare color={p.color} minHeight={keySquareHeight} />
            {typeof p.content === 'function' && p.content()}
          </Key>
        ))}
      </KeyContainer>
    )}
  </Fragment>
);

Progress.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      content: PropTypes.func,
      height: PropTypes.number,
      start: PropTypes.number,
      value: PropTypes.number,
    })
  ).isRequired,
  keySquareHeight: PropTypes.number,
  showKey: PropTypes.bool,
};

Progress.defaultProps = {
  keySquareHeight: 30,
  showKey: true,
};

export default Progress;
