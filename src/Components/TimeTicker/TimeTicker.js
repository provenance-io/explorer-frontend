import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useInterval } from 'redux/hooks';
import { getTimeSince } from 'utils';

const TimeContainer = styled.div``;

const TimeTicker = ({ timestamp, interval, text }) => {
  const [timeSinceValue, setTimeSinceValue] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  // Every 1s, set the latest time value
  useInterval(() => setTimeSinceValue(getTimeSince(timestamp)), 1000);

  // On initial load, set the latest time value
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setTimeSinceValue(getTimeSince(timestamp));
    }
  }, [initialLoad, timestamp]);

  return (
    <TimeContainer>
      {timeSinceValue} {text}
    </TimeContainer>
  );
};

TimeTicker.propTypes = {
  timestamp: PropTypes.string.isRequired,
  interval: PropTypes.number,
  text: PropTypes.string,
};

TimeTicker.defaultProps = {
  interval: 1000,
  text: 'ago',
};

export default TimeTicker;
