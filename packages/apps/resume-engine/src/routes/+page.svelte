<script lang="ts">
  import { assignInlineVars } from '@vanilla-extract/dynamic';
  import { StormSpirit } from '@/components/template-storm-spirit';
  import { rootPaddingVar } from '@/components/template-storm-spirit/vars.css';
  import { styles } from './page.css';

  let paddingRem = $state<number>(1);

  const stormSpiritStyle = $derived(`${assignInlineVars({
    [rootPaddingVar]: `${paddingRem}rem`
  })}`);
</script>

<div class={styles.root}>
  <button onclick={() => paddingRem += 1}>
    Increase padding
  </button>

  <StormSpirit
    style={stormSpiritStyle}
    title="I am Storm Spirit"
  />
</div>
