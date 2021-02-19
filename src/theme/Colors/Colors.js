import { allColors } from './allColors';

// Colors with a purpose.  These colors will corrospond to specific css and layout targets.
// Note: There will likely be lots of duplicates, this is expected (the same color can/will be used for multiple elements)

export const Colors = {
  // Font
  FONT_LINK: allColors.BLUE_LIGHT,
  FONT_LINK_VISITED: allColors.BLUE_LIGHT,
  FONT_NAV: allColors.WHITE,
  FONT_NAV_VISITED: allColors.WHITE,
  FONT_PRIMARY: allColors.GRAY_DARKEST,
  FONT_SECONDARY: allColors.GRAY_LIGHT,
  FONT_TITLE_INFO: allColors.GRAY_PRIMARY,
  FONT_THEME: allColors.BLUE_PRIMARY,
  FONT_WHITE: allColors.WHITE,
  FONT_BLACK: allColors.BLACK,
  FONT_ERROR: allColors.RED_DARKER,
  FONT_DISABLED: allColors.GRAY_LIGHTER,
  // Background
  BACKGROUND_WHITE: allColors.WHITE, // Pure White
  BACKGROUND_BLACK: allColors.BLACK, // Pure Black
  BACKGROUND_THEME: allColors.BLUE_PRIMARY, // Whatever the current theme's main color is
  BACKGROUND_CONTENT: allColors.WHITE,
  BACKGROUND_DARK: allColors.GRAY_DARKEST,
  BACKGROUND_LIGHT: allColors.GRAY_LIGHTEST,
  BACKGROUND_NAV: allColors.BLUE_DARKEST,
  BACKGROUND_HEADER: allColors.WHITE,
  // Box Shadow
  BOX_SHADOW: allColors.BLACK30,
  // Button
  BUTTON_PRIMARY: allColors.BLUE_PRIMARY,
  BUTTON_PRIMARY_HOVER: allColors.BLUE_DARKER,
  BUTTON_PRIMARY_ACTIVE: allColors.BLUE_DARK,
  BUTTON_PRIMARY_FOCUS: allColors.BLUE_DARK,
  BUTTON_PRIMARY_OUTLINE: allColors.BLUE_LIGHTEST,
  BUTTON_PRIMARY_FONT: allColors.WHITE,
  BUTTON_SECONDARY: allColors.TEAL_PRIMARY,
  BUTTON_SECONDARY_HOVER: allColors.TEAL_DARKER,
  BUTTON_SECONDARY_ACTIVE: allColors.TEAL_DARK,
  BUTTON_SECONDARY_FOCUS: allColors.TEAL_DARK,
  BUTTON_SECONDARY_OUTLINE: allColors.TEAL_LIGHTEST,
  BUTTON_SECONDARY_FONT: allColors.WHITE,
  BUTTON_DISABLED: allColors.GRAY_DARK,
  // Border
  BORDER_PRIMARY: allColors.GRAY_LIGHTER,
  BORDER_SECONDARY: allColors.GRAY_PRIMARY,
  BORDER_THEME: allColors.BLUE_PRIMARY,
  BORDER_DISABLED: allColors.BLACK,
  // Icon
  ICON_WHITE: allColors.WHITE,
  ICON_BLACK: allColors.BLACK,
  ICON_PRIMARY: allColors.BLUE_PRIMARY,
  ICON_SECONDARY: allColors.TEAL_PRIMARY,
  ICON_DISABLED: allColors.GRAY_PRIMARY,
  // Input
  INPUT_BG_LIGHT: allColors.WHITE,
  INPUT_BORDER_LIGHT: allColors.GRAY_LIGHTER,
  INPUT_OUTLINE_LIGHT: allColors.GRAY_LIGHTER,
  INPUT_FONT_LIGHT: allColors.GRAY_DARK,
  INPUT_BTN_LIGHT: allColors.GRAY_LIGHTEST,
  INPUT_BTN_LIGHT_TEXT: allColors.GRAY_DARKER,
  INPUT_BG_DARK: allColors.BLUE_DARKER,
  INPUT_BORDER_DARK: allColors.BLUE_DARK,
  INPUT_OUTLINE_DARK: allColors.BLUE_LIGHTER,
  INPUT_FONT_DARK: allColors.WHITE,
  INPUT_PLACEHOLDER_DARK: allColors.GRAY_LIGHT,
  INPUT_BTN_DARK: allColors.BLUE_DARKEST,
  INPUT_BTN_DARK_TEXT: allColors.WHITE,
  INPUT_BG_THEME: allColors.BLUE_PRIMARY,
  INPUT_FONT_THEME: allColors.BLUE_PRIMARY,
  INPUT_DISABLED: allColors.GRAY_LIGHTEST,
  // Pie-chart (colors for a top-10 split)
  CHART_PIE_A: allColors.BLUE_LIGHTEST,
  CHART_PIE_B: allColors.BLUE_LIGHTER,
  CHART_PIE_C: allColors.BLUE_LIGHT,
  CHART_PIE_D: allColors.BLUE_PRIMARY,
  CHART_PIE_E: allColors.BLUE_DARK,
  CHART_PIE_F: allColors.TEAL_LIGHTEST,
  CHART_PIE_G: allColors.TEAL_LIGHTER,
  CHART_PIE_H: allColors.TEAL_LIGHT,
  CHART_PIE_I: allColors.TEAL_PRIMARY,
  CHART_PIE_J: allColors.TEAL_DARK,
  // Line-chart (colors for a line graph)
  CHART_LINE_MAIN: allColors.BLUE_PRIMARY,
  CHART_LINE_GRADIENT_START: allColors.BLUE_LIGHTER,
  CHART_LINE_GRADIENT_END: allColors.WHITE,
  // Toggle
  TOGGLE_BACKGROUND: allColors.GRAY_DARK,
  TOGGLE_BORDER: allColors.GRAY_PRIMARY,
  TOGGLE_NOTCH: allColors.WHITE,
  // All other colors
  ...allColors,
};
