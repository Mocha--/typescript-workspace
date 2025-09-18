<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { styles } from './section.css';

  export interface SectionProps extends Pick<SvelteHTMLElements['div'], 'class' | 'style'> {
    header: string;
    children?: Snippet;
  }

  const {
    header,
    children,
    style,
    class: classValue,
  }: SectionProps = $props();
</script>

<div class={[styles.root, classValue]} style={style}>
  <header class={styles.sectionHeader}>{header}</header>
  {@render children?.()}
</div>
