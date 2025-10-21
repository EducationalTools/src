<script lang="ts">
	import { page } from '$app/state';

	import { api } from '$convex/_generated/api';
	import ProfilePage from '../profile-page.svelte';

	import { useQuery } from 'convex-svelte';

	const profile = useQuery(api.profiles.get, { userId: page.params.id || '' });
</script>

<ProfilePage
	bio={profile?.data?.bio}
	picture={profile?.data?.picture}
	name={profile?.data?.name}
	pronouns={profile?.data?.pronouns}
	loading={profile?.isLoading ?? false}
/>
