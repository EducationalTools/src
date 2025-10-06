<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { api } from '$convex/_generated/api';
	import { useQuery } from 'convex-svelte';
	import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { LogIn, LogOut, Plus, UserPlus } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { signInFormSchema, signUpFormSchema } from './schema.js';

	const id = $props.id();

	let authDialogOpen = $state(true);
	let authMode = $state('login') as 'login' | 'createaccount';
	let loading = $state(false);

	// Auth state store
	const auth = useAuth();
	const isLoading = $derived(auth.isLoading);
	const isAuthenticated = $derived(auth.isAuthenticated);

	const currentUserResponse = useQuery(api.auth.getCurrentUser, {});
	let user = $derived(currentUserResponse.data);

	async function signOut() {
		const result = await authClient.signOut();
		if (result.error) {
			console.error('Sign out error:', result.error);
			toast.error('Something went wrong');
		}
	}

	async function handleSignIn(event: SubmitEvent) {
		loading = true;
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const fields = Object.fromEntries(data.entries());
		let formData = signInFormSchema.safeParse(fields);
		if (!formData.success) {
			toast.error(formData.error.issues[0].message);
		} else {
			const { email, password } = formData.data;
			toast.promise(
				() =>
					new Promise((resolve, reject) => {
						authClient.signIn
							.email(
								{ email, password },
								{
									onError: (ctx) => {
										reject(ctx.error.message);
									}
								}
							)
							.then(resolve)
							.catch(reject)
							.finally(() => {
								loading = false;
							});
					}),
				{
					loading: 'Signing in...',
					success: 'Signed in successfully',
					error: (error) => `${error}`
				}
			);
		}
	}

	async function handleSignUp(event: SubmitEvent) {
		loading = true;
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const fields = Object.fromEntries(data.entries());
		let formData = signUpFormSchema.safeParse(fields);
		if (!formData.success) {
			toast.error(formData.error.issues[0].message);
		} else {
			const { email, password, displayName } = formData.data;
			toast.promise(
				() =>
					new Promise((resolve, reject) => {
						authClient.signUp
							.email(
								{ email, password, name: displayName },
								{
									onError: (ctx) => {
										reject(ctx.error.message);
									}
								}
							)
							.then(resolve)
							.catch(reject)
							.finally(() => {
								loading = false;
							});
					}),
				{
					loading: 'Signing in...',
					success: 'Signed in successfully',
					error: (error) => `${error}`
				}
			);
		}
	}
</script>

{#if isLoading}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton class="flex flex-row">
			<Skeleton class="aspect-square h-full" />
			<Skeleton class="h-full grow" />
		</Sidebar.MenuButton>
		<Sidebar.MenuButton class="flex flex-row">
			<Skeleton class="h-full grow" />
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else if isAuthenticated}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton>
			{user?.email}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>

	<Sidebar.MenuItem>
		<Sidebar.MenuButton onclick={signOut}>
			<LogOut />
			Log out
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			onclick={() => {
				authMode = 'login';
				authDialogOpen = true;
			}}
		>
			<LogIn />
			Log in
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			onclick={() => {
				authMode = 'createaccount';
				authDialogOpen = true;
			}}
		>
			<Plus />
			Create account
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>

	<Dialog.Root bind:open={authDialogOpen}>
		<Dialog.Content>
			<Tabs.Root bind:value={authMode}>
				<Dialog.Header>
					<Tabs.List>
						<Tabs.Trigger value="login">Log in</Tabs.Trigger>
						<Tabs.Trigger value="createaccount">Create account</Tabs.Trigger>
					</Tabs.List>
				</Dialog.Header>
				<Tabs.Content value="login">
					<form onsubmit={handleSignIn}>
						<div class="grid gap-4 py-4">
							<div class="flex w-full flex-col gap-1.5">
								<Input type="email" id="email-{id}" name="email" placeholder="Email" required />
							</div>
							<div class="flex w-full flex-col gap-1.5">
								<Input
									type="password"
									id="password-{id}"
									name="password"
									placeholder="Password"
									required
								/>
							</div>
						</div>
						<Dialog.Footer>
							<Button type="submit">Log in</Button>
						</Dialog.Footer>
					</form>
				</Tabs.Content>
				<Tabs.Content value="createaccount">
					<form onsubmit={handleSignUp}>
						<div class="grid gap-4 py-4">
							<div class="flex w-full flex-col gap-1.5">
								<Input
									type="text"
									id="name-{id}"
									name="displayName"
									placeholder="Display name"
									required
								/>
								<p class="text-muted-foreground text-sm">This is how you will appear on EduTools</p>
							</div>
							<div class="flex w-full flex-col gap-1.5">
								<Input type="email" id="email-{id}" name="email" placeholder="Email" required />
								<p class="text-muted-foreground text-sm">This is what you will use to log in</p>
							</div>
							<div class="flex w-full flex-col gap-1.5">
								<Input
									minlength={6}
									type="password"
									id="password-{id}"
									name="password"
									placeholder="Password"
									required
								/>
							</div>
						</div>
						<Dialog.Footer>
							<Button type="submit">Create account</Button>
						</Dialog.Footer>
					</form>
				</Tabs.Content>
			</Tabs.Root>
		</Dialog.Content>
	</Dialog.Root>
{/if}
