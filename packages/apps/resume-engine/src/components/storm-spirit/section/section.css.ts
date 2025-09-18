import { style } from "@vanilla-extract/css";

const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const sectionHeader = style({
  fontSize: '1rem',
  fontWeight: '600'
})

export const styles = {
  root,
  sectionHeader,
}
