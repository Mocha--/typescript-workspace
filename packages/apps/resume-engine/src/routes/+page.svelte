<script lang="ts">
  import { assignInlineVars } from '@vanilla-extract/dynamic';
  import { StormSpirit } from '@/components/storm-spirit';
  import { stormSpiritRootPaddingVar } from '@/components/storm-spirit/vars.css';
  import { styles } from './page.css';

  let paddingRem = $state<number>(1);

  const stormSpiritStyle = $derived(
    assignInlineVars({
      [stormSpiritRootPaddingVar]: `${paddingRem}rem`,
    })
  );
</script>

<div class={styles.root}>
  <button onclick={() => paddingRem += 1}>
    Increase padding
  </button>

  <StormSpirit
    style={`${stormSpiritStyle}`}
    title="I am Storm Spirit"
  />
</div>
