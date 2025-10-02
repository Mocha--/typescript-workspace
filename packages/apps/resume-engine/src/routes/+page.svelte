<script lang="ts">
  import { StormSpirit } from '@/components/storm-spirit';
  import type { Resume } from '@/types/resume';
  import { styles } from './page.css';

  let resume = $state<Resume>({
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
      }, {
        company: 'Company 2',
        role: 'Role 2',
        location: 'Location 2',
        startDate: new Date(),
        endDate: new Date(),
        achievements: ['Achievement 4', 'Achievement 5', 'Achievement 6'],
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
      }, {
        school: 'School 2',
        degree: 'Degree 2',
        subject: 'Subject 2',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Location 2',
      },
    ],
  });
</script>

<div class={styles.root}>
  <StormSpirit
    class={styles.stormSpirit}
    resume={resume}
  />

  <button
    style:position="absolute"
    style:inset="0 auto auto 0"
    onclick={() => {}}
  >
    Increase padding
  </button>
</div>
