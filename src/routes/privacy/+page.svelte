<script lang="ts">

	let lastUpdated = '02-09-2025';
</script>

<div class="container mx-auto flex max-w-4xl flex-col gap-6 p-6">
	<h1 class="text-4xl font-bold">Privacy Policy</h1>
	<p class="text-muted-foreground">Last updated: {lastUpdated}</p>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Overview</h2>
		<p>
			EduTools ("we", "our", or "us") provides educational tools and games to help users learn and
			practice various skills. This privacy policy explains how we collect, use, and protect your
			information when you use our platform.
		</p>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Information We Collect</h2>

		<h3 class="text-xl font-medium">Analytics Data (PostHog)</h3>
		<p>
			We use PostHog analytics to improve our service and understand how users interact with our
			platform. This includes:
		</p>
		<ul class="list-disc space-y-2 pl-6">
			<li><strong>Usage Analytics:</strong> Pages visited, features used, time spent on tools</li>
			<li>
				<strong>Interaction Events:</strong> Button clicks, form submissions, tool usage patterns
			</li>
			<li><strong>Error Tracking:</strong> Technical errors and exceptions to help us fix bugs</li>
			<li><strong>Device Information:</strong> Browser type, device type, screen resolution</li>
			<li>
				<strong>Performance Data:</strong> Page load times and application performance metrics
			</li>
		</ul>
		<p class="text-muted-foreground text-sm">
			PostHog data is processed with person profiles enabled and stored on US servers
			(us.i.posthog.com).
		</p>

		<h3 class="text-xl font-medium">Account Data (Clerk Authentication)</h3>
		<p>When you create an account (available only on edutools.ingo.au), we collect:</p>
		<ul class="list-disc space-y-2 pl-6">
			<li><strong>Profile Information:</strong> Username, email address, profile picture</li>
			<li><strong>Authentication Data:</strong> Encrypted login credentials and session tokens</li>
			<li><strong>Account Preferences:</strong> Settings and customizations you choose</li>
		</ul>

		<h3 class="text-xl font-medium">User Content (Convex Database)</h3>
		<p>We store user-generated content to provide our services:</p>
		<ul class="list-disc space-y-2 pl-6">
			<li><strong>Backups:</strong> Save data for tools and games you choose to backup</li>
			<li><strong>Comments:</strong> Comments you leave on games (when available)</li>
			<li><strong>Progress Data:</strong> Game progress and tool preferences</li>
		</ul>

		<h3 class="text-xl font-medium">Local Storage</h3>
		<p>Some data is stored locally in your browser:</p>
		<ul class="list-disc space-y-2 pl-6">
			<li><strong>Preferences:</strong> Theme settings, experimental features, UI preferences</li>
			<li><strong>Usage History:</strong> Recently used tools and games (stored locally)</li>
			<li><strong>Temporary Data:</strong> Calculator history, timer settings, form inputs</li>
		</ul>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">How We Use Your Information</h2>
		<ul class="list-disc space-y-2 pl-6">
			<li><strong>Service Provision:</strong> To operate and maintain our educational tools</li>
			<li><strong>Improvement:</strong> To analyze usage patterns and improve user experience</li>
			<li><strong>Bug Fixes:</strong> To identify and resolve technical issues</li>
			<li><strong>Feature Development:</strong> To understand which tools are most valuable</li>
			<li><strong>Communication:</strong> To respond to support requests (if you contact us)</li>
		</ul>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Data Sharing and Third Parties</h2>
		<p>We work with the following third-party services:</p>

		<div class="space-y-3">
			<div class="rounded-lg border p-4">
				<h4 class="font-medium">PostHog (Analytics)</h4>
				<p class="text-muted-foreground text-sm">
					Usage analytics and error tracking. Data is processed in the United States.
					<a
						href="https://posthog.com/privacy"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener">PostHog Privacy Policy</a
					>
				</p>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="font-medium">Clerk (Authentication)</h4>
				<p class="text-muted-foreground text-sm">
					User authentication and account management services.
					<a
						href="https://clerk.com/privacy"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener">Clerk Privacy Policy</a
					>
				</p>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="font-medium">Convex (Database)</h4>
				<p class="text-muted-foreground text-sm">
					Database hosting for user backups and content.
					<a
						href="https://www.convex.dev/legal/privacy/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener">Convex Privacy Policy</a
					>
				</p>
			</div>
		</div>

		<p class="font-medium">
			We do not sell, rent, or share your personal information with other third parties for
			marketing purposes.
		</p>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Your Choices and Rights</h2>
		<ul class="list-disc space-y-2 pl-6">
			<li>
				<strong>Analytics Opt-out:</strong> You can disable analytics by using a tracker blocker or ad
				blocker
			</li>
			<li>
				<strong>Account Data:</strong> You can delete your account through Clerk's user interface
			</li>
			<li>
				<strong>Local Data:</strong> You can clear local storage through your browser settings
			</li>
			<li><strong>Data Access:</strong> Contact us to request a copy of your data</li>
			<li><strong>Data Deletion:</strong> Contact us to request deletion of your account data</li>
		</ul>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Data Security</h2>
		<p>We implement security measures to protect your data:</p>
		<ul class="list-disc space-y-2 pl-6">
			<li>HTTPS encryption for all data transmission</li>
			<li>JWT-based authentication with industry-standard encryption</li>
			<li>Regular security updates and monitoring</li>
		</ul>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Children's Privacy</h2>
		<p>
			Our service is designed for educational use and may be used by children. We do not knowingly
			collect personal information from children under 13 without parental consent. If you believe a
			child has provided us with personal information, please contact us immediately.
		</p>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Changes to This Policy</h2>
		<p>
			We may update this privacy policy from time to time. When we make changes, we will update the
			"Last updated" date at the top of this page. For significant changes, we may provide
			additional notice through our platform.
		</p>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Contact Us</h2>
		<p>If you have questions about this privacy policy or our data practices, please contact us:</p>
		<ul class="list-disc space-y-2 pl-6">
			<li>
				Email: <a href="mailto:me@ingo.au" class="text-blue-600 hover:underline">me@ingo.au</a>
			</li>
			<li>
				GitHub: <a
					href="https://github.com/EducationalTools/src/security/advisories/new"
					class="text-blue-600 hover:underline"
					target="_blank"
					rel="noopener">Security Advisory</a
				> (for reporting vulnerabilities)
			</li>
		</ul>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Legal Basis</h2>
		<p>
			We process your data based on legitimate interests in providing and improving our educational
			services, with your consent for analytics tracking, and as necessary to fulfill our
			contractual obligations when you use our platform.
		</p>
	</section>
</div>
