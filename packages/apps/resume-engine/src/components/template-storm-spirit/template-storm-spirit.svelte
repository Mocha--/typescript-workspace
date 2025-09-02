<script lang="ts">
  import { styles } from './template-storm-spirit.css';
</script>

<div class={styles.root}>
  <div class={styles.headerBackground}></div>

  <article class={styles.outlinedBox}>
    <header class={styles.header}>
      Storm Spirit
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
