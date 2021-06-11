import { Themes } from 'theme';
import { useApp, useMediaQuery } from '.';

const useColorScheme = () => {
  const { theme } = useApp();
  // Support OS theme settings if the user hasn't clicked the switch at the top
  const { matches: dark } = useMediaQuery('(prefers-color-scheme: dark)');
  const themeName = theme ? theme : dark ? 'night' : 'default';
  const activeTheme = Themes[themeName];

  return { activeTheme, themeName };
};

export default useColorScheme;
