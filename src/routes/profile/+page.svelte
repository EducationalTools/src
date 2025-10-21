<script lang="ts">
	import { api } from '$convex/_generated/api';
	import ProfilePage from './profile-page.svelte';

	import { useQuery } from 'convex-svelte';

	const profile = useQuery(api.profiles.getCurrent, {});
	const user = useQuery(api.auth.getCurrentUser, {});
</script>

<ProfilePage
	id={user.data?._id}
	bio={profile?.data?.bio}
	picture={profile?.data?.picture}
	name={profile?.data?.name}
	pronouns={profile?.data?.pronouns}
	loading={profile?.isLoading ?? false}
/>
