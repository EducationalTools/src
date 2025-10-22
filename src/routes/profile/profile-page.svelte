<script lang="ts">
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Share } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

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

<div class="mx-auto w-full max-w-2xl p-4">
	<div class="bg-card flex w-full flex-col gap-4 rounded-xl border p-4">
		{#if loading}
			<div class="flex w-full flex-row gap-4">
				<Skeleton class="size-20 rounded-full" />
				<div class="flex flex-col gap-2">
					<Skeleton class="h-8 w-[150px]" />
					<Skeleton class="h-6 w-[75px]" />
				</div>
			</div>
			<Skeleton class="h-8 w-full" />
			<Skeleton class="h-8 w-full" />
		{:else}
			<div class="flex w-full flex-row gap-4">
				<Avatar.Root class="size-20">
					<Avatar.Image src={picture} />
					<Avatar.Fallback>{name?.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col justify-center">
					<h1 class="text-3xl">{name}</h1>
					<h2 class="text-sm">{pronouns}</h2>
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
			<p class="text-md whitespace-pre-wrap">{bio}</p>
		{/if}
	</div>
</div>
