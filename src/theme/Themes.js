import { Colors } from './Colors';
import { allColors } from './Colors/allColors';
import { Font } from './Font';

const defaultTheme = {
  ...Colors,
  ...Font,
};

const night = {
  ...defaultTheme,
  // Font styling overrides
  FONT_WEIGHT_THINEST: '200',
  FONT_WEIGHT_THIN: '300',
  FONT_WEIGHT_NORMAL: '500',
  FONT_WEIGHT_BOLD: '500',
  FONT_WEIGHT_BOLDEST: '700',
  // Color Overrides
  // Backgrounds
  BACKGROUND_LIGHT: allColors.GRAY_DARKEST,
  BACKGROUND_CONTENT: allColors.GRAY_DARKER,
  BACKGROUND_NAV: allColors.BLACK,
  BACKGROUND_HEADER: allColors.GRAY_DARK,
  BACKGROUND_THEME: allColors.BLUE_DARK,
  // Border
  BORDER_PRIMARY: allColors.GRAY_DARK,
  // Button
  BUTTON_PRIMARY: allColors.BLUE_DARK,
  BUTTON_PRIMARY_HOVER: allColors.BLUE_DARKEST,
  BUTTON_PRIMARY_ACTIVE: allColors.BLUE_DARKER,
  BUTTON_PRIMARY_FOCUS: allColors.BLUE_DARKER,
  BUTTON_PRIMARY_OUTLINE: allColors.BLUE_LIGHT,
  BUTTON_PRIMARY_FONT: allColors.WHITE,
  // Font
  FONT_PRIMARY: allColors.WHITE,
  FONT_SECONDARY: allColors.GRAY_LIGHT,
  FONT_TITLE_INFO: allColors.GRAY_LIGHT,
  FONT_DISABLED: allColors.GRAY_DARK,
  // Input
  INPUT_BG_LIGHT: allColors.GRAY_DARK,
  INPUT_BORDER_LIGHT: allColors.GRAY_PRIMARY,
  INPUT_OUTLINE_LIGHT: allColors.GRAY_PRIMARY,
  INPUT_FONT_LIGHT: allColors.WHITE,
  INPUT_BG_DARK: allColors.GRAY_DARKER,
  INPUT_BORDER_DARK: allColors.GRAY_DARK,
  INPUT_OUTLINE_DARK: allColors.GRAY_DARK,
  INPUT_FONT_DARK: allColors.GRAY_LIGHTER,
  INPUT_BTN_DARK: allColors.GRAY_DARK,
  INPUT_BTN_DARK_TEXT: allColors.WHITE,
  // Line-chart (colors for a line graph)
  CHART_LINE_MAIN: allColors.BLUE_PRIMARY,
  CHART_LINE_GRADIENT_START: allColors.BLUE_DARKER,
  CHART_LINE_GRADIENT_END: allColors.BLUE_LIGHTER,
  // Pie-chart (colors for a top-10 split)
  CHART_PIE_A: allColors.BLUE_LIGHT,
  CHART_PIE_B: allColors.BLUE_PRIMARY,
  CHART_PIE_C: allColors.BLUE_DARK,
  CHART_PIE_D: allColors.BLUE_DARKER,
  CHART_PIE_E: allColors.BLUE_DARKEST,
  CHART_PIE_F: allColors.TEAL_LIGHT,
  CHART_PIE_G: allColors.TEAL_PRIMARY,
  CHART_PIE_H: allColors.TEAL_DARK,
  CHART_PIE_I: allColors.TEAL_DARKER,
  CHART_PIE_J: allColors.TEAL_DARKEST,
};

const rainbow = {
  ...defaultTheme,
  // Color Overrides
  // Backgrounds
  BACKGROUND_LIGHT: allColors.PURPLE_LIGHTER,
  BACKGROUND_CONTENT: allColors.YELLOW_LIGHTER,
  BACKGROUND_NAV: allColors.RED_PRIMARY,
  BACKGROUND_HEADER: allColors.GREEN_LIGHTEST,
  // Border
  BORDER_PRIMARY: allColors.GREEN_LIGHT,
  // Button
  BUTTON_PRIMARY: allColors.GREEN_LIGHTEST,
  BUTTON_PRIMARY_HOVER: allColors.GREEN_LIGHTER,
  BUTTON_PRIMARY_ACTIVE: allColors.GREEN_LIGHT,
  BUTTON_PRIMARY_FOCUS: allColors.GREEN_LIGHT,
  BUTTON_PRIMARY_OUTLINE: allColors.GREEN_DARK,
  BUTTON_PRIMARY_FONT: allColors.WHITE,
  // Font
  FONT_PRIMARY: allColors.RED_DARK,
  FONT_SECONDARY: allColors.GREEN_LIGHTEST,
  FONT_TITLE_INFO: allColors.GREEN_LIGHT,
  FONT_LINK: allColors.PURPLE_LIGHT,
  // Input
  INPUT_BG_LIGHT: allColors.ORANGE_LIGHTER,
  INPUT_BORDER_LIGHT: allColors.ORANGE_PRIMARY,
  INPUT_OUTLINE_LIGHT: allColors.ORANGE_LIGHTEST,
  INPUT_FONT_LIGHT: allColors.WHITE,
  INPUT_BG_DARK: allColors.PURPLE_LIGHTER,
  INPUT_BORDER_DARK: allColors.PURPLE_LIGHT,
  INPUT_OUTLINE_DARK: allColors.PURPLE_PRIMARY,
  INPUT_FONT_DARK: allColors.PURPLE_LIGHTEST,
  INPUT_BTN_DARK: allColors.PURPLE_PRIMARY,
  INPUT_PLACEHOLDER_DARK: allColors.PURPLE_DARKER,
  INPUT_BTN_DARK_TEXT: allColors.WHITE,
  // Line-chart (colors for a line graph)
  CHART_LINE_MAIN: allColors.ORANGE_LIGHTER,
  CHART_LINE_GRADIENT_START: allColors.PURPLE_LIGHTER,
  CHART_LINE_GRADIENT_END: allColors.RED_PRIMARY,
  // Pie-chart (colors for a top-10 split)
  CHART_PIE_A: allColors.RED_PRIMARY,
  CHART_PIE_B: allColors.GREEN_LIGHTER,
  CHART_PIE_C: allColors.BLUE_PRIMARY,
  CHART_PIE_D: allColors.TEAL_LIGHT,
  CHART_PIE_E: allColors.PURPLE_PRIMARY,
  CHART_PIE_F: allColors.YELLOW_LIGHTER,
  CHART_PIE_G: allColors.TEAL_PRIMARY,
  CHART_PIE_H: allColors.RED_LIGHT,
  CHART_PIE_I: allColors.PURPLE_LIGHT,
  CHART_PIE_J: allColors.ORANGE_LIGHT,
};

export const Themes = {
  default: defaultTheme,
  night,
  rainbow,
};
