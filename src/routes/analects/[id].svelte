<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ params, fetch }) => {
		const res = await fetch(`/data/${params.id}.txt`);

		if (res.ok) {
			const data = await res.text();

			return {
				props: { data }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	export let name = 'gakuji';
	export let data: string;
</script>

<h1>Analects {name}</h1>
<p>{data}</p>
