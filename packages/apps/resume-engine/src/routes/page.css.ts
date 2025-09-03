import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

const stormSpirit = style({
  inlineSize: '60rem',
  maxInlineSize: '100%',
});

export const styles = {
  root,
  stormSpirit,
};
