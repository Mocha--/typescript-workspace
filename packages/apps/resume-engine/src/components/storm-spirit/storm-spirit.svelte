<script lang="ts">
  import { type SvelteHTMLElements } from 'svelte/elements';
  import type { Resume } from '@/types/resume';
  import { styles } from './storm-spirit.css';

  interface StormSpiritProps extends Pick<SvelteHTMLElements['div'], 'class' | 'style'> {
    resume: Resume;
  }

  const {
    resume,
    class: classValue,
    style,
   }: StormSpiritProps = $props();

   const { name, summary, contact, skills, experiences, educations } = resume;
</script>

<div
  class={[styles.root, classValue]}
  style={style}
>
  <div class={styles.topBackground}></div>

  <article class={styles.outlinedBox}>
    <header class={styles.header}>
      {name}
    </header>

    <div class={styles.main}>
      <div class={styles.firstSection}>
        <section class={styles.summary}>
          <header>Summary</header>
          <p>{summary}</p>
        </section>

        <section class={styles.experience}>
          <header>Experience</header>
          {#each experiences as experience}
            <div>
              <div>{experience.company} - ${experience.role}</div>
              <div>{experience.location}</div>
              <div>{experience.startDate.toLocaleDateString()} - {experience.endDate?.toLocaleDateString() ?? 'Current'}</div>
              {#each experience.achievements as achievement}
                <div>{achievement}</div>
              {/each}
            </div>
          {/each}
        </section>
      </div>

      <div class={styles.secondSection}>
        <section class={styles.contact}>
          <header>Contact</header>
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
          <div>{contact.address}</div>
        </section>

        <section class={styles.skills}>
          <header>Skills</header>
          {#each skills as skill}
            <div>{skill}</div>
          {/each}
        </section>

        <section class={styles.education}>
          <header>Education</header>
          {#each educations as education}
            <div>{education.school}</div>
            <div>{education.degree}: {education.subject}</div>
            <div>{education.location}</div>
            <div>{education.startDate.toLocaleDateString()} - {education.endDate?.toLocaleDateString() ?? 'Current'}</div>
          {/each}
        </section>
      </div>
    </div>
  </article>
</div>
