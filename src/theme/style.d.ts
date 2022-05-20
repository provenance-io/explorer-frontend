// import original module declarations
import 'styled-components';
import { string } from 'yup/lib/locale';
import { Colors, COLORS_VALUE } from './Colors';
import { Font } from './Font';
import { DefaultThemeKeys } from './Themes';

// and extend them!
declare module 'styled-components' {
  interface DefaultTheme {
    WHITE: string;
    BLACK: string;
    BLACK30: string;
    GRAY_LIGHTEST: string;
    GRAY_LIGHTER: string;
    GRAY_LIGHT: string;
    GRAY_PRIMARY: string;
    GRAY_DARK: string;
    GRAY_DARKER: string;
    GRAY_DARKEST: string;
    RED_LIGHTEST: string;
    RED_LIGHTER: string;
    RED_LIGHT: string;
    RED_PRIMARY: string;
    RED_DARK: string;
    RED_DARKER: string;
    RED_DARKEST: string;
    GREEN_LIGHTEST: string;
    GREEN_LIGHTER: string;
    GREEN_LIGHT: string;
    GREEN_PRIMARY: string;
    GREEN_DARK: string;
    GREEN_DARKER: string;
    GREEN_DARKEST: string;
    BLUE_LIGHTEST: string;
    BLUE_LIGHTER: string;
    BLUE_LIGHT: string;
    BLUE_PRIMARY: string;
    BLUE_DARK: string;
    BLUE_DARKER: string;
    BLUE_DARKEST: string;
    TEAL_LIGHTEST: string;
    TEAL_LIGHTER: string;
    TEAL_LIGHT: string;
    TEAL_PRIMARY: string;
    TEAL_DARK: string;
    TEAL_DARKER: string;
    TEAL_DARKEST: string;
    YELLOW_LIGHTEST: string;
    YELLOW_LIGHTER: string;
    YELLOW_LIGHT: string;
    YELLOW_PRIMARY: string;
    YELLOW_DARK: string;
    YELLOW_DARKER: string;
    YELLOW_DARKEST: string;
    ORANGE_LIGHTEST: string;
    ORANGE_LIGHTER: string;
    ORANGE_LIGHT: string;
    ORANGE_PRIMARY: string;
    ORANGE_DARK: string;
    ORANGE_DARKER: string;
    ORANGE_DARKEST: string;
    PURPLE_LIGHTEST: string;
    PURPLE_LIGHTER: string;
    PURPLE_LIGHT: string;
    PURPLE_PRIMARY: string;
    PURPLE_DARK: string;
    PURPLE_DARKER: string;
    PURPLE_DARKEST: string;
    IRIS_PRIMARY: string;
    RED_NEGATIVE_PRIMARY: string;
    GREEN_POSITIVE_PRIMARY: string;
    FONT_LINK: string;
    FONT_LINK_VISITED: string;
    FONT_NAV: string;
    FONT_NAV_VISITED: string;
    FONT_PRIMARY: string;
    FONT_SECONDARY: string;
    FONT_TITLE_INFO: string;
    FONT_THEME: string;
    FONT_WHITE: string;
    FONT_BLACK: string;
    FONT_ERROR: string;
    FONT_WARNING: string;
    FONT_SUCCESS: string;
    FONT_DISABLED: string;
    BACKGROUND_WHITE: string;
    BACKGROUND_BLACK: string;
    BACKGROUND_THEME: string;
    BACKGROUND_CONTENT: string;
    BACKGROUND_DARK: string;
    BACKGROUND_LIGHT: string;
    BACKGROUND_NAV: string;
    BACKGROUND_HEADER: string;
    BOX_SHADOW: string;
    BUTTON_PRIMARY: string;
    BUTTON_PRIMARY_HOVER: string;
    BUTTON_PRIMARY_ACTIVE: string;
    BUTTON_PRIMARY_FOCUS: string;
    BUTTON_PRIMARY_OUTLINE: string;
    BUTTON_PRIMARY_FONT: string;
    BUTTON_SECONDARY: string;
    BUTTON_SECONDARY_HOVER: string;
    BUTTON_SECONDARY_ACTIVE: string;
    BUTTON_SECONDARY_FOCUS: string;
    BUTTON_SECONDARY_OUTLINE: string;
    BUTTON_SECONDARY_FONT: string;
    BUTTON_DISABLED: string;
    BORDER_PRIMARY: string;
    BORDER_SECONDARY: string;
    BORDER_THEME: string;
    BORDER_DISABLED: string;
    CHIP_ACTIVE: string;
    CHIP_CANDIDATE: string;
    CHIP_JAILED: string;
    ICON_WHITE: string;
    ICON_BLACK: string;
    ICON_PRIMARY: string;
    ICON_SECONDARY: string;
    ICON_DISABLED: string;
    INPUT_BG_LIGHT: string;
    INPUT_BORDER_LIGHT: string;
    INPUT_OUTLINE_LIGHT: string;
    INPUT_FONT_LIGHT: string;
    INPUT_BTN_LIGHT: string;
    INPUT_BTN_LIGHT_TEXT: string;
    INPUT_BG_DARK: string;
    INPUT_BORDER_DARK: string;
    INPUT_OUTLINE_DARK: string;
    INPUT_FONT_DARK: string;
    INPUT_PLACEHOLDER_DARK: string;
    INPUT_BTN_DARK: string;
    INPUT_BTN_DARK_TEXT: string;
    INPUT_BG_THEME: string;
    INPUT_FONT_THEME: string;
    INPUT_DISABLED: string;
    CHART_PIE_A: string;
    CHART_PIE_B: string;
    CHART_PIE_C: string;
    CHART_PIE_D: string;
    CHART_PIE_E: string;
    CHART_PIE_F: string;
    CHART_PIE_G: string;
    CHART_PIE_H: string;
    CHART_PIE_I: string;
    CHART_PIE_J: string;
    CHART_PIE_K: string;
    CHART_PIE_L: string;
    CHART_PIE_M: string;
    CHART_PIE_N: string;
    CHART_PIE_YES: string;
    CHART_PIE_NO: string;
    CHART_PIE_NOWITHVETO: string;
    CHART_PIE_ABSTAIN: string;
    CHART_LINE_MAIN: string;
    CHART_LINE_GRADIENT_START: string;
    CHART_LINE_GRADIENT_END: string;
    TOGGLE_BACKGROUND: string;
    TOGGLE_BORDER: string;
    TOGGLE_NOTCH: string;
    WARNING_BORDER: string;
    WARNING_BORDER_LIGHTER: string;
    POSITIVE_CHANGE: string;
    NEGATIVE_CHANGE: string;
    PRIMARY_FONT: string;
    HEADER_FONT: string;
    CODE_FONT: string;
    FONT_WEIGHT_THINEST: string;
    FONT_WEIGHT_THIN: string;
    FONT_WEIGHT_NORMAL: string;
    FONT_WEIGHT_BOLD: string;
    FONT_WEIGHT_BOLDEST: string;
    [key: string]: string;
  }
}
