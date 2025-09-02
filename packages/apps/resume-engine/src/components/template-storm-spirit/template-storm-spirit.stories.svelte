<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TemplateStormSpirit from './template-storm-spirit.svelte';

  const { Story } = defineMeta({
    title: 'Components/Templates/Storm Spirit',
    component: TemplateStormSpirit,
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'A modern resume template with a clean, professional design featuring a two-column layout. The template includes sections for summary, experience, contact information, skills, and education.'
        }
      }
    },
  })
</script>

<Story name="Default" />
