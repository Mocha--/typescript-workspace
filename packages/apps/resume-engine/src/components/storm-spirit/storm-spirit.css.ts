import { style, createVar, createContainer } from '@vanilla-extract/css';
import { containerWidthGreaterThan } from '@/styles/container-queries';
import { stormSpiritVars } from './vars.css';

const rootContainer = createContainer();
const topBackgroundBlockSizeVar = createVar();
const mobileBreakpoint = 640;

const root = style({
  containerName: rootContainer,
  containerType: 'inline-size',
  position: 'relative',
  padding: stormSpiritVars.rootPadding,
  vars: {
    [stormSpiritVars.rootPadding]: '1rem',
    [stormSpiritVars.paragraphSpacing]: '1rem',
    [topBackgroundBlockSizeVar]: '12.5rem',
  },
});

const topBackground = style({
  position: 'absolute',
  inset: '0 0 auto 0',
  blockSize: topBackgroundBlockSizeVar,
  backgroundColor: '#b0aaab',
});

const outlinedBox = style({
  position: 'relative',
  border: '1px solid #333333',
});

const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  blockSize: `calc(${topBackgroundBlockSizeVar} - ${stormSpiritVars.rootPadding})`,
  fontSize: '2rem',
  fontWeight: '600'
});

const main = style({
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  padding: '1rem',
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      flexDirection: 'row',
    },
  },
});

const column = style({
  display: 'contents',
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      display: 'flex',
      flexDirection: 'column',
      gap: stormSpiritVars.paragraphSpacing,
    },
  },
});

const firstSection = style([column, {
  flex: '0 0 auto',
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      flex: '1 1 0%',
    },
  },
}]);

const secondSection = style([column, {
  flex: '0 0 auto',
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      flex: '0 0 15rem',
    },
  },
}]);

const summary = style({
  order: 2,
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      order: 'initial',
    },
  },
});

const experience = style({
  order: 3,
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      order: 'initial',
    },
  },
});

const contact = style({
  order: 1,
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      order: 'initial',
    },
  },
});

const skills = style({
  order: 4,
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      order: 'initial',
    },
  },
});

const education = style({
  order: 5,
  '@container': {
    [containerWidthGreaterThan({ width: mobileBreakpoint, containerName: rootContainer })]: {
      order: 'initial',
    },
  },
});

export const styles = {
  root,
  topBackground,
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
