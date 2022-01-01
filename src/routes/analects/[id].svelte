<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { parser } from '$lib/utils';
  import { BOOK_TITLE } from '$lib/enum';

  // see https://kit.svelte.dev/docs#loading
  export const load: Load = async ({ params, fetch }) => {
  const id = params.id;
  const title = BOOK_TITLE[id];

  const res = await fetch(`/data/${id}.txt`);

  if (res.ok) {
      const text = await res.text();
      const data = parser(text.replace('\n', ''));

      return {
        props: {
          id,
          title,
          data
        }
      };
    }

    const { message } = await res.json();

    return {
      error: new Error(message)
    };
  };
</script>

<script lang="ts">
  export let id = 0;
  export let title = '';
  export let data: string;
</script>

<h1>Analects {id} {title}</h1>
<p>{JSON.stringify(data)}</p>
