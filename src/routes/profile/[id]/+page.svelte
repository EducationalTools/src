<script lang="ts">
	import { page } from '$app/state';

	import { api } from '$convex/_generated/api';
	import Profile from '$lib/components/profile.svelte';

	import { useQuery } from 'convex-svelte';

	const profile = useQuery(api.profiles.get, { userId: page.params.id || '' });
</script>

<div class="mx-auto w-full max-w-2xl p-4">
	<div class="bg-card rounded-xl border p-4">
		<Profile
			id={page.params.id}
			bio={profile?.data?.bio}
			picture={profile?.data?.picture}
			name={profile?.data?.name}
			pronouns={profile?.data?.pronouns}
			loading={profile?.isLoading ?? false}
		/>
	</div>
</div>
