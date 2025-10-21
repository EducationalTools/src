<script lang="ts">
	import { api } from '$convex/_generated/api';
	import ProfilePage from './profile-page.svelte';

	import { useQuery } from 'convex-svelte';

	const profile = useQuery(api.profiles.getCurrent, {});
</script>

<ProfilePage
	bio={profile?.data?.bio}
	picture={profile?.data?.picture}
	name={profile?.data?.name}
	pronouns={profile?.data?.pronouns}
	loading={profile?.isLoading ?? false}
/>
