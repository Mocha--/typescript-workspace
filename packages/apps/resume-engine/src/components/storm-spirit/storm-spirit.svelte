<script lang="ts">
  import { type SvelteHTMLElements } from 'svelte/elements';
  import type { Resume } from '@/types/resume';
  import { Section } from './section';
  import { styles } from './storm-spirit.css';

  interface StormSpiritProps extends Pick<SvelteHTMLElements['div'], 'class' | 'style'> {
    resume: Resume;
  }

  let {
    resume,
    style,
    class: classValue,
   }: StormSpiritProps = $props();
</script>

<div
  class={[styles.root, classValue]}
  style={style}
>
  <div class={styles.topBackground}></div>

  <article class={styles.outlinedBox}>
    <header class={styles.header}>
      <div>{resume.name}</div>
    </header>

    <div class={styles.main}>
      <div class={styles.firstSection}>
        <Section
     class={styles.summary}
          header="Summary"
        >
          <p>{resume.summary}</p>
        </Section>

        <Section
     class={styles.experience}
          header="Experience"
        >
          {#each resume.experiences as experience}
            <div>
              <div>{experience.company} - ${experience.role}</div>
              <div>{experience.location}</div>
              <div>{experience.startDate.toLocaleDateString()} - {experience.endDate?.toLocaleDateString() ?? 'Current'}</div>
              {#each experience.achievements as achievement}
                <div>{achievement}</div>
              {/each}
            </div>
          {/each}
        </Section>
      </div>

      <div class={styles.secondSection}>
        <Section
     class={styles.contact}
          header="Contact"
        >
          <div>{resume.contact.email}</div>
          <div>{resume.contact.phone}</div>
          <div>{resume.contact.address}</div>
        </Section>

        <Section
     class={styles.skills}
          header="Skills"
        >
          {#each resume.skills as skill}
            <div>{skill}</div>
          {/each}
        </Section>

        <Section
     class={styles.education}
          header="Education"
        >
          {#each resume.educations as education}
            <div>{education.school}</div>
            <div>{education.degree}: {education.subject}</div>
            <div>{education.location}</div>
            <div>{education.startDate.toLocaleDateString()} - {education.endDate?.toLocaleDateString() ?? 'Current'}</div>
          {/each}
        </Section>
      </div>
    </div>
  </article>
</div>
