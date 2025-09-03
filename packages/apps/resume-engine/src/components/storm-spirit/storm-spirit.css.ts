import { style, createVar } from '@vanilla-extract/css';
import { stormSpiritVars } from './vars.css';

const topBackgroundBlockSizeVar = createVar();

const root = style({
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
});

const main = style({
  display: 'flex',
  gap: '1rem',
});

const firstSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: stormSpiritVars.paragraphSpacing,
});

const secondSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: stormSpiritVars.paragraphSpacing,
});

const summary = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const TitledSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const experience = style([TitledSection, {

}]);

const contact = style([TitledSection, {
}]);

const skills = style([TitledSection, {
}]);

const education = style([TitledSection, {
}]);

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
