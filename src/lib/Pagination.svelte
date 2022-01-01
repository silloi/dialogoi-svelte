<script lang="ts">
	export let path = '';

	$: page = parseInt(path.split('/').pop()) || 0;
	$: basePath = path.slice(0, path.length - page);

	$: prevLink = `${basePath}${page - 1}`;
	$: nextLink = `${basePath}${page + 1}`;
</script>

<div class="wrapper">
	<nav class="pagination">
		<a href={prevLink}>&lt;</a>
		<span>{page}</span>
		<a href={nextLink}>&gt;</a>
	</nav>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
	}

	.pagination {
		display: flex;
		justify-content: space-between;
		width: 160px;
	}
</style>
