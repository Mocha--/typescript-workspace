import { style } from '@vanilla-extract/css';
import { stormSpiritRootPaddingVar } from '@/components/template-storm-spirit/vars.css';

const root = style({
  vars: {
    [stormSpiritRootPaddingVar]: '2rem',
  },
});

export const styles = {
  root,
};
