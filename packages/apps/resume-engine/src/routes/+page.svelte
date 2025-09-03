<script lang="ts">
  import { assignInlineVars } from '@vanilla-extract/dynamic';
  import { StormSpirit } from '@/components/storm-spirit';
  import { stormSpiritVars } from '@/components/storm-spirit/vars.css';
  import { styles } from './page.css';

  let paddingRem = $state<number>(1);

  const stormSpiritStyle = $derived(
    assignInlineVars({
      [stormSpiritVars.padding]: `${paddingRem}rem`,
    })
  );
</script>

<div class={styles.root}>
  <StormSpirit
    class={styles.stormSpirit}
    style={`${stormSpiritStyle}`}
    title="I am Storm Spirit"
  />

  <button
    style:position="absolute"
    style:inset="0 auto auto 0"
    onclick={() => paddingRem += 1}
  >
    Increase padding
  </button>
</div>
