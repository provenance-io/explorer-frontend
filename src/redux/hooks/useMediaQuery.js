import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window?.matchMedia(query).matches);
  useEffect(() => {
    const media = window?.matchMedia(query);
    const listener = () => {
      setMatches(media.matches);
    };

    if (media.matches !== matches) setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.addEventListener('change', listener);
  }, [matches, query]);

  return { matches };
};
