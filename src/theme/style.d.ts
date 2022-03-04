// import original module declarations
import 'styled-components';
import { string } from 'yup/lib/locale';
import { Colors } from './Colors';
import { Font } from './Font';

// and extend them!
declare module 'styled-components' {
  interface DefaultTheme {
    // To-Do: Update to populate intellisense. This
    // just populates a list
    [key: keyof Colors]: keyof typeof Colors,
    [key: keyof Font]: keyof typeof Font,
  }
}
