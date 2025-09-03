import { style } from '@vanilla-extract/css';
import { stormSpiritVars } from './vars.css';

const root = style({
  position: 'relative',
  padding: stormSpiritVars.padding,
  vars: {
    [stormSpiritVars.padding]: '1rem',
  },
});

const headerBackground = style({
  position: 'absolute',
  inset: '0 0 auto 0',
  blockSize: '12.5rem',
  backgroundColor: '#b0aaab',
});

const outlinedBox = style({
  position: 'relative',
});

const header = style({
});

const main = style({

});

const firstSection = style({
});

const secondSection = style({
});

const summary = style({
});

const experience = style({
});

const contact = style({
});

const skills = style({
});

const education = style({
});

export const styles = {
  root,
  headerBackground,
  outlinedBox,
  main,
  header,
  summary,
  experience,
  contact,
  skills,
  education,
  firstSection,
  secondSection,
};
