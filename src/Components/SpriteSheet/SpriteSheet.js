import React from 'react';
import styled from 'styled-components';
import { ICON_NAMES } from 'consts';

const Svg = styled.svg`
  display: none;
`;

/**
 * Inject *SpriteSheet* into the root of your application or *Sprite* component won't render anything.
 *
 * `fill` and `stroke` must be set to `"currentColor"` otherwise it won't inherit `color` prop from *Sprite*.
 */
const SpriteSheet = () => (
  <Svg xmlns="http://www.w3.org/2000/svg">
    <g id={ICON_NAMES.ACCOUNT}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    </g>
    <g id={ICON_NAMES.ADMIN}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M8.5 7.5V4.5H11.5V7.5H8.5Z" stroke="currentColor" />
        <path d="M4.5 15.5V12.5H7.5V15.5H4.5Z" stroke="currentColor" />
        <path d="M12.5 15.5V12.5H15.5V15.5H12.5Z" stroke="currentColor" />
        <path d="M6 12.5V10H14V12.5" stroke="currentColor" />
        <path d="M10 7.5V10" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.APPS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M4.5 12.6667V7.33333L10 5.04167L15.5 7.33334V12.6667L10 14.9583L4.5 12.6667Z"
          stroke="currentColor"
        />
        <path d="M4.5 7.5L10 9.5L15.5 7.5" stroke="currentColor" />
        <path d="M10 9.5V14.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.BACK_ARROW}>
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M28 5L13 20L28 35" stroke="currentColor" strokeWidth="10%" />
      </svg>
    </g>
    <g id={ICON_NAMES.CALENDAR}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </svg>
    </g>
    <g id={ICON_NAMES.CALL_MADE}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />
      </svg>
    </g>
    <g id={ICON_NAMES.CARET}>
      <svg viewBox="0 0 9 5" fill="currentColor">
        <path d="M9 -1.43051e-06L4.68 4.5L3.93403e-07 -2.21732e-06L9 -1.43051e-06Z" />
      </svg>
    </g>
    <g id={ICON_NAMES.CHECK}>
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.CHEVRON}>
      <svg viewBox="0 0 7 10" fill="none" stroke="currentColor">
        <path d="M5.81818 1L2 5L5.81818 9" strokeWidth="2" />
      </svg>
    </g>
    <g id={ICON_NAMES.CLEAR}>
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.CLOSE}>
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8.99984 1L5.09375 5L8.99984 9" />
        <path d="M1.00016 1L4.90625 5L1.00016 9" />
      </svg>
    </g>
    <g id={ICON_NAMES.CUBES}>
      <svg viewBox="0 0 38 33" fill="none">
        <path d="M19 1L10 6V14L19 19L28 14V6L19 1Z" stroke="currentColor" />
        <path d="M19 11L10 6" stroke="currentColor" />
        <path d="M28 6L19 11V18.5" stroke="currentColor" />
        <path d="M10 14L1 19V27L10 32L19 27V19L10 14Z" stroke="currentColor" />
        <path d="M10 24L1 19" stroke="currentColor" />
        <path d="M19 19L10 24V31.5" stroke="currentColor" />
        <path d="M28 14L19 19V27L28 32L37 27V19L28 14Z" stroke="currentColor" />
        <path d="M28 24L19 19" stroke="currentColor" />
        <path d="M37 19L28 24V31.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.DATA_OBJECT}>
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <path d="M4 7v2c0 .55-.45 1-1 1H2v4h1c.55 0 1 .45 1 1v2c0 1.65 1.35 3 3 3h3v-2H7c-.55 0-1-.45-1-1v-2c0-1.3-.84-2.42-2-2.83v-.34C5.16 11.42 6 10.3 6 9V7c0-.55.45-1 1-1h3V4H7C5.35 4 4 5.35 4 7zm17 3c-.55 0-1-.45-1-1V7c0-1.65-1.35-3-3-3h-3v2h3c.55 0 1 .45 1 1v2c0 1.3.84 2.42 2 2.83v.34c-1.16.41-2 1.52-2 2.83v2c0 .55-.45 1-1 1h-3v2h3c1.65 0 3-1.35 3-3v-2c0-.55.45-1 1-1h1v-4h-1z"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.DISCORD}>
      <svg viewBox="0 0 245 240" fill="currentColor">
        <path d="M104 104c-5 0-10 5-10 11s5 11 10 11c6 0 11-5 11-11s-5-11-11-11zm37 0c-6 0-10 5-10 11s4 11 10 11 10-5 10-11-4-11-10-11z" />
        <path d="M190 20H56c-12 0-21 9-21 21v135c0 11 9 20 21 20h113l-5-18 12 12 13 11 21 19V41c0-12-9-21-20-21zm-39 131l-7-9c13-3 18-11 18-11l-11 5c-5 3-10 4-15 5a70 70 0 01-40-5c-3 0-5-2-8-3l-1-1-3-2c0 1 5 9 18 12l-7 9c-22-1-30-16-30-16 0-32 14-58 14-58 14-11 28-10 28-10l1 1c-18 5-26 13-26 13l6-3c10-5 19-6 22-6h2a85 85 0 0151 9s-8-8-25-13l1-1s14-1 28 10c0 0 14 26 14 58 1 0-8 15-30 16z" />
      </svg>
    </g>
    <g id={ICON_NAMES.FIGURE}>
      <svg fill="currentColor" viewBox="0 0 49 80">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H48.2403V15.9718H0V0ZM0 80V32.0084H48.2403V47.9802H16.0546V80H0Z"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.GITHUB}>
      <svg fill="none" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M512 0a512 512 0 00-162 998c26 4 35-11 35-25v-95c-129 24-162-31-173-60-5-15-30-60-52-72-18-10-44-34-1-34 41-1 69 37 79 52 46 78 120 56 149 42 5-33 18-55 33-68-114-13-233-57-233-253 0-56 20-102 52-137-5-13-23-66 5-136 0 0 43-14 141 52a475 475 0 01256 0c98-66 141-52 141-52 28 70 10 123 5 136 33 35 53 81 53 137 0 197-120 240-234 253 19 16 35 47 35 95l-1 140c0 14 10 30 35 25A513 513 0 00512 0z"
          clipRule="evenodd"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.HASH}>
      <svg viewBox="0 0 40 40" fill="none">
        <rect
          x="20"
          y="3.73654"
          width="23"
          height="23"
          transform="rotate(45 20 3.73654)"
          stroke="currentColor"
        ></rect>
        <path d="M27.7782 12.2218L13.9896 26.0104" stroke="currentColor"></path>
        <path d="M11.5147 11.5147L17.8787 17.8787" stroke="currentColor"></path>
        <path d="M20 20L28.4853 28.4853" stroke="currentColor"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.HELP}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    </g>
    <g id={ICON_NAMES.UPGRADE}>
      <svg viewBox="6 2 16 18" fill="currentColor">
        <path d="M16 18v2H8v-2h8zM11 7.99V16h2V7.99h3L12 4 8 7.99h3z"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.HELP_OUTLINE}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      </svg>
    </g>
    <g id={ICON_NAMES.IN_PROGRESS}>
      <svg viewBox="0 0 18 18" fill="none">
        <path
          d="M9 0.5C10.6811 0.5 12.3245 0.998516 13.7223 1.93251C15.1202 2.8665 16.2096 4.19402 16.853 5.74719C17.4963 7.30036 17.6646 9.00943 17.3367 10.6583C17.0087 12.3071 16.1992 13.8217 15.0104 15.0104C13.8217 16.1992 12.3071 17.0087 10.6583 17.3367C9.00943 17.6646 7.30036 17.4963 5.74719 16.853C4.19402 16.2096 2.8665 15.1202 1.93251 13.7223C0.998516 12.3245 0.5 10.6811 0.5 9"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.INVENTORY}>
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="4" y="5" width="1" height="1" fill="currentColor" />
        <rect x="6" y="5" width="10" height="1" fill="currentColor" />
        <rect x="4" y="8" width="1" height="1" fill="currentColor" />
        <rect x="6" y="8" width="10" height="1" fill="currentColor" />
        <rect x="4" y="11" width="1" height="1" fill="currentColor" />
        <rect x="6" y="11" width="10" height="1" fill="currentColor" />
        <rect x="4" y="14" width="1" height="1" fill="currentColor" />
        <rect x="6" y="14" width="10" height="1" fill="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.KEY}>
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    </g>
    <g id={ICON_NAMES.LINE_CHART}>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.LOGO}>
      <svg viewBox="0 0 187 32" fill="none">
        <path
          fill="var(--secondaryColor)"
          d="M49 18.9V21h-8.7V9.7H49v2.1h-6v2.4h5.3v2h-5.3V19h6.2zM66.4 21l-2.8-4-2.7 4h-3l4.2-5.7-4-5.6h3l2.6 3.7 2.6-3.7H69l-4 5.5 4.3 5.8h-3zm17-11.3c1 0 1.8.2 2.6.5.7.3 1.3.8 1.7 1.4.4.6.6 1.4.6 2.2a4 4 0 01-.6 2.2c-.4.6-1 1-1.7 1.4-.8.3-1.6.5-2.6.5H81V21h-2.6V9.7h4.9zm-.2 6c.8 0 1.4-.1 1.8-.4.4-.4.6-.9.6-1.5s-.2-1.1-.6-1.5c-.4-.3-1-.5-1.8-.5H81v4H83zm15-6h2.6v9.2h5.7V21h-8.3V9.7zm23.1 11.5c-1.1 0-2.2-.3-3.2-.8-.9-.5-1.6-1.2-2.2-2-.5-1-.8-2-.8-3a5.7 5.7 0 013-5.1c1-.5 2-.8 3.2-.8 1.2 0 2.3.3 3.2.8a5.7 5.7 0 013 5 5.7 5.7 0 01-3 5.1c-1 .5-2 .8-3.2.8zm0-2.2c.7 0 1.3-.2 1.8-.5.6-.3 1-.7 1.3-1.3.3-.5.5-1.2.5-1.9s-.2-1.3-.5-1.8c-.3-.6-.7-1-1.3-1.3-.5-.3-1.1-.5-1.8-.5a3.5 3.5 0 00-3 1.8c-.4.5-.5 1.1-.5 1.8s.1 1.4.4 2a3.4 3.4 0 003.1 1.7zm23.5 2l-2.2-3.1H140V21h-2.6V9.7h4.8c1 0 2 .2 2.6.5.8.3 1.4.8 1.8 1.4.4.6.6 1.4.6 2.2 0 .8-.3 1.6-.7 2.2-.4.6-1 1-1.7 1.4l2.6 3.6h-2.8zm0-7.2c0-.6-.3-1.1-.7-1.5-.4-.3-1-.5-1.8-.5h-2.1v4h2.1c.8 0 1.4-.2 1.8-.5.4-.4.6-.9.6-1.5zm21.5 5.1V21h-8.8V9.7h8.5v2.1H160v2.4h5.2v2H160V19h6.2zm17.3 2.1l-2.2-3.1H179V21h-2.6V9.7h4.9c1 0 1.9.2 2.6.5.7.3 1.3.8 1.7 1.4.4.6.6 1.4.6 2.2 0 .8-.2 1.6-.6 2.2-.4.6-1 1-1.7 1.4l2.5 3.6h-2.8zm0-7.2c0-.6-.2-1.1-.7-1.5-.4-.3-1-.5-1.7-.5h-2.2v4h2.2c.7 0 1.3-.2 1.7-.5.5-.4.7-.9.7-1.5z"
        />
        <svg viewBox="0 0 280 48" fill="none">
          <path
            fill="currentColor"
            d="M21.9214 -0.370018C21.3654 -0.689161 20.6858 -0.689161 20.1298 -0.370018L0.895803 10.7382C0.339786 11.0573 0 11.6493 0 12.2876V34.4937C0 35.1371 0.339786 35.7239 0.895803 36.0431L8.68516 40.5419V18.0218C8.68516 17.4041 9.00436 16.8276 9.53463 16.5033L14.8528 13.2244L20.0835 10.0021C20.6601 9.64692 21.386 9.64692 21.9626 10.0021L27.1933 13.2244L32.5114 16.5033C33.0417 16.8276 33.3609 17.4041 33.3609 18.0218V28.6925C33.3609 29.3153 33.0417 29.8919 32.5114 30.2161L27.1933 33.4899L21.9626 36.7122C21.4581 37.0211 20.9587 36.5115 20.9587 35.9247V31.6986C20.9587 31.1221 21.4684 30.6794 21.9626 30.3809L26.3438 27.6836C26.8689 27.3542 27.1933 26.7776 27.1933 26.16V21.8258C27.1933 21.203 26.8689 20.6264 26.3438 20.3022L21.9626 17.6049C21.386 17.2497 20.6601 17.2497 20.0835 17.6049L15.7023 20.3022C15.1772 20.6264 14.8528 21.203 14.8528 21.8258V24.9709C14.8528 24.9709 14.8477 24.9709 14.8477 24.976V38.205H14.8528C14.8528 38.205 14.8528 38.205 14.8528 38.2101V43.8569C14.8528 43.9393 14.8477 44.0165 14.8374 44.0937L20.1298 47.1513C20.6858 47.4704 21.3654 47.4704 21.9214 47.1513L41.1554 36.0431C41.7114 35.7239 42.0512 35.1371 42.0512 34.4937V12.2876C42.0512 11.6493 41.7114 11.0573 41.1554 10.7382L21.9214 -0.370018Z"
          />
        </svg>
      </svg>
    </g>
    <g id={ICON_NAMES.LOGOUT}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      </svg>
    </g>
    <g id={ICON_NAMES.MEGAPHONE}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.MENU}>
      <svg viewBox="0 0 20 11" fill="none">
        <rect width="20" height="1" fill="currentColor" />
        <rect y="5" width="20" height="1" fill="currentColor" />
        <rect y="10" width="20" height="1" fill="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.MOON}>
      <svg viewBox="-25 -20 170 170" fill="currentColor">
        <path d="M110 94a65 65 0 01-78 30c-3-1-11-3-19-9l-3-6 4-2c10 0 14-1 18-3 4-1 6-4 7-8l1-4c2-2 3-2 5-2 1 0 3 2 4 1l-2-1c-1-2-3-4-2-6l5-2c4-1 2-5-1-7-5-3-17-11-8-16l9-2 10-5C74 42 80 25 74 9c-1-2-4-6-2-8h3a64 64 0 019 4c32 17 43 57 26 89z" />
      </svg>
    </g>
    <g id={ICON_NAMES.PARTICIPATION}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="currentColor" />
        <path
          d="M15 16C15 14 12.7614 11.5 10 11.5C7.23858 11.5 5 13.5 5 16"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.PENDING}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" />
        <path d="M10 5.5V10L13.5 12.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.PRICE}>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.PROVENANCE}>
      <svg viewBox="0 0 43 48" fill="none">
        <path
          fill="currentColor"
          d="M21.9214 -0.370018C21.3654 -0.689161 20.6858 -0.689161 20.1298 -0.370018L0.895803 10.7382C0.339786 11.0573 0 11.6493 0 12.2876V34.4937C0 35.1371 0.339786 35.7239 0.895803 36.0431L8.68516 40.5419V18.0218C8.68516 17.4041 9.00436 16.8276 9.53463 16.5033L14.8528 13.2244L20.0835 10.0021C20.6601 9.64692 21.386 9.64692 21.9626 10.0021L27.1933 13.2244L32.5114 16.5033C33.0417 16.8276 33.3609 17.4041 33.3609 18.0218V28.6925C33.3609 29.3153 33.0417 29.8919 32.5114 30.2161L27.1933 33.4899L21.9626 36.7122C21.4581 37.0211 20.9587 36.5115 20.9587 35.9247V31.6986C20.9587 31.1221 21.4684 30.6794 21.9626 30.3809L26.3438 27.6836C26.8689 27.3542 27.1933 26.7776 27.1933 26.16V21.8258C27.1933 21.203 26.8689 20.6264 26.3438 20.3022L21.9626 17.6049C21.386 17.2497 20.6601 17.2497 20.0835 17.6049L15.7023 20.3022C15.1772 20.6264 14.8528 21.203 14.8528 21.8258V24.9709C14.8528 24.9709 14.8477 24.9709 14.8477 24.976V38.205H14.8528C14.8528 38.205 14.8528 38.205 14.8528 38.2101V43.8569C14.8528 43.9393 14.8477 44.0165 14.8374 44.0937L20.1298 47.1513C20.6858 47.4704 21.3654 47.4704 21.9214 47.1513L41.1554 36.0431C41.7114 35.7239 42.0512 35.1371 42.0512 34.4937V12.2876C42.0512 11.6493 41.7114 11.0573 41.1554 10.7382L21.9214 -0.370018Z"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.RAINBOW}>
      <svg viewBox="0 0 512 512" fill="none">
        <path
          fill="#FF5E3B"
          d="M256 128A256 256 0 000 376c0 4 4 8 8 8h25s100-206 223-206 223 206 223 206h25c4 0 8-4 8-8a256 256 0 00-256-248z"
        />
        <path
          fill="#FFF67A"
          d="M256 161A223 223 0 0033 384h33s85-174 190-174 190 174 190 174h33c0-123-100-223-223-223z"
        />
        <path
          fill="#B2E8A6"
          d="M256 194c-105 0-190 85-190 190h33s70-140 157-140 157 140 157 140h33c0-105-85-190-190-190z"
        />
        <path
          fill="#A1C0F7"
          d="M256 227c-87 0-157 70-157 157h33s56-107 124-107 124 107 124 107h33c0-87-70-157-157-157z"
        />
        <path
          fill="#D491FF"
          d="M256 260c-68 0-124 56-124 124h17l9-7c4-47 50-91 98-91s94 44 98 91l9 7h17c0-68-56-124-124-124z"
        />
        <path
          fill="#5F2489"
          d="M256 277c-59 0-107 48-107 107h8c4 0 8-3 8-7a91 91 0 01182 0c0 4 4 7 8 7h8c0-59-48-107-107-107z"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.REPORTS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M6 4H10.5L14.5 8V15.5H6V4Z" stroke="currentColor" />
        <path d="M10.5 4V8.5H14.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.SEARCH}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="9.02128" cy="9.02128" r="6.52128" stroke="currentColor" />
        <path d="M13.9362 13.9362L18.5 18.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.SETTINGS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M5.34315 9.17157C3.92894 10.5858 2.51472 12 3.22183 14.1213L13.1213 4.22183C11 3.51472 9.58579 4.92893 8.17158 6.34315L5.34315 9.17157Z"
          stroke="currentColor"
        />
        <path
          d="M6.05029 8.46447L14.5356 16.9497L15.9498 15.5355L7.81806 7.40381"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.SHARED_POOLS}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="13.5" cy="6.5" r="2" stroke="currentColor" />
        <circle cx="6.5" cy="10" r="2" stroke="currentColor" />
        <circle cx="13.5" cy="13.5" r="2" stroke="currentColor" />
        <path d="M8.22461 8.97343L11.7069 7.36621" stroke="currentColor" />
        <path d="M8.22456 11L11.8311 12.6645" stroke="currentColor" />
      </svg>
    </g>
    <g id={ICON_NAMES.SLACK}>
      <svg viewBox="0 0 2447.6 2452.5">
        <path
          d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
          fill="currentColor"
        />
        <path
          d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
          fill="currentColor"
        />
        <path
          d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
          fill="currentColor"
        />
        <path
          d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
          fill="currentColor"
        />
      </svg>
    </g>
    <g id={ICON_NAMES.SUN}>
      <svg viewBox="0 -10 150 150" fill="currentColor">
        <path d="M64 30a34 34 0 100 68 34 34 0 000-68zM57 24h14a2 2 0 002-3L66 2a2 2 0 00-4 0l-7 19v2l2 1zM97 41a2 2 0 002 1l2-2 8-19a2 2 0 00-2-2l-19 8a2 2 0 00-1 4l10 10zM126 62l-19-7h-2l-1 2v14a2 2 0 003 2l19-7 2-2-2-2zM101 88a2 2 0 00-4-1L87 97a2 2 0 001 4l19 8v1a2 2 0 002-3l-8-19zM71 104H57l-2 1v2l7 19 2 2 2-2 7-19a2 2 0 00-2-3zM31 87l-2-1-2 2-8 19v2a2 2 0 002 0l19-8a2 2 0 001-4L31 87zM22 73h1l1-2V57l-1-2h-2L2 62a2 2 0 000 4l19 7h1zM27 40a2 2 0 004 1l10-10a2 2 0 00-1-4l-19-8h-2v2l8 19z" />
      </svg>
    </g>
    <g id={ICON_NAMES.TRASH}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
      </svg>
    </g>
    <g id={ICON_NAMES.WARNING}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    </g>
  </Svg>
);

export default SpriteSheet;
