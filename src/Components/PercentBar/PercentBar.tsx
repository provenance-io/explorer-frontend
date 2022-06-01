import React, { Fragment } from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) inset;
  background-color: ${({ theme }) => theme.BACKGROUND_LIGHT};
`;

const ProgressValue = styled.span<{ start: number, value: number, height: number, color: string}>`
  position: absolute;
  left: ${({ start = 0 }) => start}%;
  display: block;
  width: ${({ value }) => (value > 100 ? 100 : value)}%;
  height: ${({ height = 100 }) => height}%;
  text-indent: -9999px;
  background-color: ${({ color, theme }) => theme[color]};
`;

interface PercentBarProps {
  data: {
    color: string;
    value: number;
    height?: number;
  }[];
}

export const PercentBar = ({ data }: PercentBarProps) => {
  let startPoint = 0;
  let idx = 0;

  return (
    <Fragment>
      <ProgressBar>
        {data.map(p => {
          if (idx === 0) {
            idx++;
            return (
              <ProgressValue
                key={p.color}
                color={p.color}
                height={p.height || 100}
                start={0}
                value={p.value}
              />
            );
          }
          startPoint += data[idx - 1].value;
          idx++;
          return (
            <ProgressValue
              key={p.color}
              color={p.color}
              height={p.height || 100}
              start={startPoint}
              value={p.value}
            />
          );
        })}
      </ProgressBar>
    </Fragment>
  );
};