<script lang="ts">
  import { type SvelteHTMLElements } from 'svelte/elements';
  import { styles } from './template-storm-spirit.css';

  interface StormSpiritProps extends Pick<SvelteHTMLElements['div'], 'class' | 'style'> {
    title: string;
  }

  let {
    title,
    class: classValue,
    style,
   }: StormSpiritProps = $props();

</script>

<div
  class={[styles.root, classValue]}
  style={style}
>
  <div class={styles.headerBackground}></div>

  <article class={styles.outlinedBox}>
    <header class={styles.header}>
      {title}
    </header>

    <div class={styles.main}>
      <div class={styles.firstSection}>
        <section class={styles.summary}>
          <header>Summary</header>
        </section>

        <section class={styles.experience}>
          <header>Experience</header>
        </section>
      </div>

      <div class={styles.secondSection}>
        <section class={styles.contact}>
          <header>Contact</header>
        </section>

        <section class={styles.skills}>
          <header>Skills</header>
        </section>

        <section class={styles.education}>
          <header>Education</header>
        </section>
      </div>
    </div>
  </article>
</div>
