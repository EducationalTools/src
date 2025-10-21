<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	const {
		picture,
		name,
		bio,
		pronouns,
		loading,
		id
	}: {
		picture: string | null | undefined;
		name: string | null | undefined;
		bio: string | undefined;
		pronouns: string | undefined;
		loading: boolean;
		id: string | null | undefined;
	} = $props();
</script>

{#if loading}{:else}
	<div class="mx-auto w-full max-w-2xl p-2">
		<div class="flex w-full flex-col gap-4 rounded-md border p-4">
			<div class="flex w-full flex-row gap-4">
				<Avatar.Root class="size-20">
					<Avatar.Image src={picture} />
					<Avatar.Fallback>{name?.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<h1 class="text-3xl">{name}</h1>
					<h2 class="text-xl">{pronouns}</h2>
				</div>
			</div>
			<p class="text-sm">{bio}</p>
		</div>
	</div>
{/if}
