<script lang="ts">
	let { id } = $props();

	import { currentProfileId } from '$lib/state.svelte';
	import { useQuery } from 'convex-svelte';
	import { api } from '$convex/_generated/api';
	import Profile from '../profile.svelte';

	const profile = useQuery(api.profiles.get, { userId: id });
</script>

<Profile
	id={currentProfileId.current}
	bio={profile?.data?.bio}
	picture={profile?.data?.picture}
	name={profile?.data?.name}
	loading={profile?.isLoading ?? false}
/>
