<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { Bubble, parser } from '$lib/utils';
	import { CHAPTER_TITLE } from '$lib/enum';
	import Pagination from '$lib/Pagination.svelte';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ url, params, fetch }) => {
		const id = params.id;
		const title = CHAPTER_TITLE.analects[id];
		const path = url.pathname;

		const res = await fetch(`/data/analects/${id}.txt`);

		if (res.ok) {
			const text = await res.text();
			const data = parser(text.replace(/\n/g, ''));

			return {
				props: {
					id,
					title,
					path,
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
	export let path = '';
	export let data: Bubble[] = [];
</script>

<h1>論語 {id} {title}</h1>

<article>
	<ol class="list">
		{#each data as item}
			<li
				class="bubble"
				class:left={item.type === 'left'}
				class:right={item.type === 'right'}
				class:center={item.type === 'center'}
			>
				<strong class="person">{item.person}</strong>
				<p class="message">
					{item.message}
				</p>
			</li>
		{/each}
	</ol>
</article>
<Pagination {path} />

<style>
	.list {
		display: flex;
		flex-direction: column;
		list-style-type: none;
	}

	.left {
		align-self: flex-start;
	}

	.center {
		align-self: center;
	}

	.right {
		align-self: flex-end;
	}

	.bubble {
		align-items: stretch;
		border: 1px solid;
		border-radius: 4px;
		padding: 0.5rem;
		margin: 0.25rem;
	}

	.person {
		font-size: 0.8rem;
	}

	.message {
		margin: 0;
	}
</style>
