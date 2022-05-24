// Every possible color in the app based on the generic name of the color
// Each generic name will have 7 possible variations: lightest, lighter, light, primary, dark, darker, and darkest.
// Note: Not every variant will be getting used and these are mainly a guideline, we shouldn't need more than 7 of each generic color

export const allColors = {
  // White
  WHITE: '#FFFFFF',
  // Black
  BLACK: '#000000',
  BLACK30: '#00000076',
  // Gray
  GRAY_LIGHTEST: '#EEEEEE',
  GRAY_LIGHTER: '#D2D2D2',
  GRAY_LIGHT: '#A7A7A7',
  GRAY_PRIMARY: '#7E7E7E',
  GRAY_DARK: '#575757',
  GRAY_DARKER: '#333333',
  GRAY_DARKEST: '#222222',
  // Red
  RED_LIGHTEST: '#FFAFAF',
  RED_LIGHTER: '#FF9F72',
  RED_LIGHT: '#FF7F56',
  RED_PRIMARY: '#FF5E3B',
  RED_DARK: '#FD3A1F',
  RED_DARKER: '#D90000',
  RED_DARKEST: '#A90000',
  // Green
  GREEN_LIGHTEST: '#B2E8A6',
  GREEN_LIGHTER: '#89BE7E',
  GREEN_LIGHT: '#63975A',
  GREEN_PRIMARY: '#3F7237',
  GREEN_DARK: '#1A4E17',
  GREEN_DARKER: '#002D00',
  GREEN_DARKEST: '#001D00',
  // Blue
  BLUE_LIGHTEST: '#C3D9FF',
  BLUE_LIGHTER: '#A1C0F7',
  BLUE_LIGHT: '#6B9BF1',
  BLUE_PRIMARY: '#3F80F3',
  BLUE_DARK: '#5273ad',
  BLUE_DARKER: '#4b5f81',
  BLUE_DARKEST: '#404959',
  BLUE_GRAY: '#BFD7ED',
  // Teal
  TEAL_LIGHTEST: '#B9D7DC',
  TEAL_LIGHTER: '#7EB4BE',
  TEAL_LIGHT: '#598F98',
  TEAL_PRIMARY: '#356B74',
  TEAL_DARK: '#0A4952',
  TEAL_DARKER: '#002A32',
  TEAL_DARKEST: '#00191E',
  // Yellow
  YELLOW_LIGHTEST: '#FFF67A',
  YELLOW_LIGHTER: '#F4F27D',
  YELLOW_LIGHT: '#BDBE4B',
  YELLOW_PRIMARY: '#898C15',
  YELLOW_DARK: '#565D00',
  YELLOW_DARKER: '#2E3200',
  YELLOW_DARKEST: '#1A2100',
  // Orange
  ORANGE_LIGHTEST: '#FEDF9B',
  ORANGE_LIGHTER: '#FAC653',
  ORANGE_LIGHT: '#C89A24',
  ORANGE_PRIMARY: '#976F00',
  ORANGE_DARK: '#694800',
  ORANGE_DARKER: '#4E4637',
  ORANGE_DARKEST: '#432300',
  // Purple
  PURPLE_LIGHTEST: '#E8C5FF',
  PURPLE_LIGHTER: '#D491FF',
  PURPLE_LIGHT: '#AC6CD6',
  PURPLE_PRIMARY: '#8548AF',
  PURPLE_DARK: '#5F2489',
  PURPLE_DARKER: '#3A0065',
  PURPLE_DARKEST: '#2A0045',
  // IRIS
  IRIS_PRIMARY: '#5A4FCF',
  // RED/GREEN
  RED_NEGATIVE_PRIMARY: '#FF0000',
  GREEN_POSITIVE_PRIMARY: '#4ED22C',
} as const;

export type ALL_COLORS_TYPE = typeof allColors;
export type ALL_COLORS_VALUE = ALL_COLORS_TYPE[keyof ALL_COLORS_TYPE];
