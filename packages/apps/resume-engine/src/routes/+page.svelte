<script lang="ts">
  interface Person {
    name: string;
    age: number;
  }

  let primitiveValue = $state(1);
  const aaa = $state<Person>({name: 'John', age: 20});
  const isOver5 = $derived(aaa.age > 5);
  const title = $derived(`My title is ${aaa.name}`);

  let buttonElm: HTMLButtonElement | null = null;

  $effect.pre(() => {
    if (buttonElm) {
      buttonElm.style.backgroundColor = 'blue';
    } else {
      console.info('in pre effect, buttonElm is null');
    }
  });

  $effect(() => {
    console.info('aaa', aaa);
  });

  $effect(() => {
    if (buttonElm) {
      buttonElm.style.backgroundColor = 'green';
    } else {
      console.info('buttonElm is null');
    }
    console.info('aaa', aaa);
  });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
  <button onclick={() => aaa.age += 1}>click me</button>
  <div>aaa.age is {aaa.age}</div>
  <div>title is {title}</div>
  <div>isOver5 is {isOver5}</div>
</div>

<div>
  <button bind:this={buttonElm} onclick={() => primitiveValue += 1}>click me</button>
  <div>title is {title}</div>
</div>
