// import original module declarations
import 'styled-components';
import { string } from 'yup/lib/locale';
import { Colors, COLORS_VALUE } from './Colors';
import { Font } from './Font';
import { DefaultThemeKeys } from './Themes';

// and extend them!
declare module 'styled-components' {
  interface DefaultTheme {
    [key in DefaultThemeKeys]?: COLORS_VALUE;
  }
}
