<script lang="ts">
	import { api } from '$convex/_generated/api';
	import Profile from '$lib/components/profile.svelte';

	import { useQuery } from 'convex-svelte';

	const profile = useQuery(api.profiles.getCurrent, {});
	const user = useQuery(api.auth.getCurrentUser, {});
</script>

<div class="mx-auto w-full max-w-2xl p-4">
	<div class="bg-card rounded-xl border p-4">
		<Profile
			id={user.data?._id}
			bio={profile?.data?.bio}
			picture={profile?.data?.picture}
			name={profile?.data?.name}
			loading={profile?.isLoading ?? false}
		/>
	</div>
</div>
