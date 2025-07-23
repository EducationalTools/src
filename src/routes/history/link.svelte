<script lang="ts">
	const { children, ...rest } = $props();
</script>

<a {...rest}>{children}</a>
