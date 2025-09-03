<script lang="ts">
  import { assignInlineVars } from '@vanilla-extract/dynamic';
  import { StormSpirit } from '@/components/storm-spirit';
  import { stormSpiritVars } from '@/components/storm-spirit/vars.css';
  import type { Resume } from '@/types/resume';
  import { styles } from './page.css';

  let paddingRem = $state<number>(1);
  const resume: Resume = {
    name: 'Storm Spirit',
    summary: 'I am Storm Spirit',
    contact: {
      email: 'stormspirit@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
    },
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    experiences: [
      {
        company: 'Company 1',
        role: 'Role 1',
        location: 'Location 1',
        startDate: new Date(),
        endDate: new Date(),
        achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
      },
    ],
    educations: [
      {
        school: 'School 1',
        degree: 'Degree 1',
        subject: 'Subject 1',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Location 1',
      },
    ],
  };
  const stormSpiritStyle = $derived(
    assignInlineVars({
      [stormSpiritVars.rootPadding]: `${paddingRem}rem`,
    })
  );
</script>

<div class={styles.root}>
  <StormSpirit
    class={styles.stormSpirit}
    style={`${stormSpiritStyle}`}
    resume={resume}
  />

  <button
    style:position="absolute"
    style:inset="0 auto auto 0"
    onclick={() => paddingRem += 1}
  >
    Increase padding
  </button>
</div>
