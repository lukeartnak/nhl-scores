import React from 'react';

import { css } from 'styled-components';

export const teams = {
  ANA: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  ARI: {
    common: css`
      background-size: 175%;
    `,
    away: css`
      background-position: 100% 25%;
    `,
    home: css`
      background-position: 100% 25%;
      transform: scaleX(-1);
    `
  },
  BOS: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  BUF: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 0 40%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 40%;
    `
  },
  CAR: {
    common: css`
      background-size: 175%;
    `,
    away: css`
      background-position: 100% 30%;
    `,
    home: css`
      background-position: 100% 30%;
      transform: scaleX(-1);
    `
  },
  CBJ: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  CGY: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  CHI: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 0 50%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  COL: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  DAL: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  DET: {
    common: css`
      background-size: 160%;
    `,
    away: css`
      background-position: 0 60%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 60%;
    `
  },
  EDM: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  FLA: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 0 40%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 40%;
    `
  },
  LAK: {
    common: css`
      background-size: 100%;
    `,
    away: css`
      background-position: 100% 25%;
    `,
    home: css`
      background-position: 0 25%;
    `
  },
  MIN: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 0 50%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  MTL: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  NJD: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  NSH: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  NYI: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 40%;
    `,
    home: css`
      background-position: 0 40%;
    `
  },
  NYR: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  OTT: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  PHI: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  PIT: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 0 20%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 20%;
    `
  },
  SJS: {
    common: css`
      background-size: 150%;
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  STL: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  TBL: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  TOR: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 0 75%;
    `
  },
  VAN: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  VGK: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  WPG: {
    common: css`
      background-size: 125%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  WSH: {
    common: css`
      background-size: 110%;
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  }
};

export function Logo({ team, className }) {
  return (
    <img
      className={className}
      src={`logos/logo_${team.toLowerCase()}.svg`}
      alt={`${team} Logo`}
    />
  );
}
