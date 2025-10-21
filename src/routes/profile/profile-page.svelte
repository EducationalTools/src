<script lang="ts">
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Share } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

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
		<div class="bg-card flex w-full flex-col gap-4 rounded-md border p-4">
			<div class="flex w-full flex-row gap-4">
				<Avatar.Root class="size-20">
					<Avatar.Image src={picture} />
					<Avatar.Fallback>{name?.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<h1 class="text-3xl">{name}</h1>
					<h2 class="text-xl">{pronouns}</h2>
				</div>
				<div class="grow"></div>
				<Button
					size="icon"
					variant="ghost"
					onclick={() => {
						toast.promise(
							navigator.clipboard.writeText(
								page.url.protocol + '://' + page.url.host + '/profile/' + id || ''
							),
							{
								success: 'Copied!',
								error: 'Failed to copy'
							}
						);
					}}
				>
					<Share />
				</Button>
			</div>
			<p class="text-md">{bio}</p>
		</div>
	</div>
{/if}
