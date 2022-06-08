export const Font = {
  // Font family
  PRIMARY_FONT: "'Montserrat', sans-serif",
  HEADER_FONT: "'Montserrat', sans-serif",
  CODE_FONT: 'monospace, serif',
  // Font styling overrides
  FONT_WEIGHT_THINEST: '200',
  FONT_WEIGHT_THIN: '300',
  FONT_WEIGHT_NORMAL: '500',
  FONT_WEIGHT_BOLD: '700',
  FONT_WEIGHT_BOLDEST: '900',
} as const;

export type FONT_TYPE = typeof Font;
export type FONT_VALUE = FONT_TYPE[keyof FONT_TYPE];
