import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  margin: 1rem 0;
  padding: 20px;
  border: ${({ theme }) => theme.POSITIVE_CHANGE}
    1px solid;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.POSITIVE_CHANGE};
  flex-direction: column;
  text-align: justify;
`;
const Title = styled.div`
  text-align: center;
  margin: 10px;
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLD};
  line-height: 1.75;
`;
const Timer = styled.div`
  color: ${({ theme }) => theme.NEGATIVE_CHANGE};
  text-align: center;
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT_BOLDEST};
  margin: 20px;
`;

interface CountdownProps {
  onClick: () => void;
  hours?: number;
  minutes?: number;
  seconds?: number;
  message: string | React.ReactElement;
  title: string;
}

const Countdown = ({
  onClick,
  hours = 0,
  minutes = 0,
  seconds = 0,
  message,
  title,
}: CountdownProps) => {
  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

  const tick = () => {
    if (over) return;
    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
      window.location.reload();
      onClick();
    }
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    }
    else if (s === 0) {
      setTime([h, m-1, 59]);
    }
    else {
      setTime([h, m, s - 1]);
    };
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
      <Section>
        <Title>
          <Label>{title}</Label>
        </Title>
        {message}
        <Timer>
          {`${h.toString().padStart(2, '0')}:
          ${m.toString().padStart(2, '0')}:
          ${s.toString().padStart(2, '0')}`}
        </Timer>
      </Section>
  );
}

export default Countdown;