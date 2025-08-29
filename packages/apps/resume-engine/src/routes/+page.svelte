<script lang="ts">
  interface Person {
    name: string;
    age: number;
  }

  const aaa = $state<Person>({name: 'John', age: 20});
  const isOver5 = $derived(aaa.age > 5);
  const title = $derived(`My title is ${aaa.name}`);

  $effect(() => {
    console.info('aaa', aaa);
  });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<button onclick={() => aaa.age += 1}>click me</button>
<div>aaa is {aaa}</div>
<div>isOver5 is {isOver5}</div>
