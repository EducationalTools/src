import { httpRouter } from 'convex/server';
import { authComponent, createAuth } from './auth';
import { httpAction } from './_generated/server';

const http = httpRouter();

authComponent.registerRoutes(http, createAuth, { cors: { allowedOrigins: ['*'] } });

http.route({
	method: 'GET',
	path: '/auth',
	handler: httpAction(async (ctx, request) => {
		const url = new URL(request.url);
		const queryParams = new URLSearchParams(url.search);
		const redirectUrl = queryParams.get('redirect');
		if (!redirectUrl) {
			throw new Error('Missing redirect parameter');
		}
		const redirectUrlObj = new URL(redirectUrl);
		const host = redirectUrlObj.hostname;
		const sanitizedHost = host.replace(/[^a-zA-Z0-9.-]/g, '');

		const { auth, headers } = await authComponent.getAuth(createAuth, ctx);

		const session = await auth.api.getSession({ headers: request.headers });

		return new Response(
			`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting...</title>
  <style>
    :root {
      --radius: 0.65rem;
      --background: oklch(1 0 0);
      --foreground: oklch(0.145 0 0);
      --card: oklch(1 0 0);
      --card-foreground: oklch(0.145 0 0);
      --popover: oklch(1 0 0);
      --popover-foreground: oklch(0.145 0 0);
      --primary: oklch(0.205 0 0);
      --primary-foreground: oklch(0.985 0 0);
      --secondary: oklch(0.97 0 0);
      --secondary-foreground: oklch(0.205 0 0);
      --muted: oklch(0.97 0 0);
      --muted-foreground: oklch(0.556 0 0);
      --accent: oklch(0.97 0 0);
      --accent-foreground: oklch(0.205 0 0);
      --destructive: oklch(0.577 0.245 27.325);
      --border: oklch(0.922 0 0);
      --input: oklch(0.922 0 0);
      --ring: oklch(0.708 0 0);
      --chart-1: oklch(0.646 0.222 41.116);
      --chart-2: oklch(0.6 0.118 184.704);
      --chart-3: oklch(0.398 0.07 227.392);
      --chart-4: oklch(0.828 0.189 84.429);
      --chart-5: oklch(0.769 0.188 70.08);
      --radius: 0.625rem;
      --sidebar: oklch(0.985 0 0);
      --sidebar-foreground: oklch(0.145 0 0);
      --sidebar-primary: oklch(0.205 0 0);
      --sidebar-primary-foreground: oklch(0.985 0 0);
      --sidebar-accent: oklch(0.97 0 0);
      --sidebar-accent-foreground: oklch(0.205 0 0);
      --sidebar-border: oklch(0.922 0 0);
      --sidebar-ring: oklch(0.708 0 0);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --background: oklch(0.145 0 0);
        --foreground: oklch(0.985 0 0);
        --card: oklch(0.205 0 0);
        --card-foreground: oklch(0.985 0 0);
        --popover: oklch(0.205 0 0);
        --popover-foreground: oklch(0.985 0 0);
        --primary: oklch(0.922 0 0);
        --primary-foreground: oklch(0.205 0 0);
        --secondary: oklch(0.269 0 0);
        --secondary-foreground: oklch(0.985 0 0);
        --muted: oklch(0.269 0 0);
        --muted-foreground: oklch(0.708 0 0);
        --accent: oklch(0.269 0 0);
        --accent-foreground: oklch(0.985 0 0);
        --destructive: oklch(0.704 0.191 22.216);
        --border: oklch(1 0 0 / 10%);
        --input: oklch(1 0 0 / 15%);
        --ring: oklch(0.556 0 0);
        --chart-1: oklch(0.488 0.243 264.376);
        --chart-2: oklch(0.696 0.17 162.48);
        --chart-3: oklch(0.769 0.188 70.08);
        --chart-4: oklch(0.627 0.265 303.9);
        --chart-5: oklch(0.645 0.246 16.439);
        --sidebar: oklch(0.205 0 0);
        --sidebar-foreground: oklch(0.985 0 0);
        --sidebar-primary: oklch(0.488 0.243 264.376);
        --sidebar-primary-foreground: oklch(0.985 0 0);
        --sidebar-accent: oklch(0.269 0 0);
        --sidebar-accent-foreground: oklch(0.985 0 0);
        --sidebar-border: oklch(1 0 0 / 10%);
        --sidebar-ring: oklch(0.556 0 0);
      }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      background: var(--background);
      color: var(--foreground);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }

    .card {
      background: var(--card);
      color: var(--card-foreground);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }

    .text-sm {
      font-size: 0.875rem;
      color: var(--muted-foreground);
      margin-bottom: 0.75rem;
    }

    .url {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      word-break: break-all;
      color: var(--foreground);
    }

    .warning {
      font-size: 0.875rem;
      color: var(--muted-foreground);
      margin-bottom: 1.5rem;
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
    }

    button {
      flex: 1;
      padding: 0.625rem 1rem;
      border-radius: var(--radius);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--primary-foreground);
    }

    .btn-primary:hover {
      opacity: 0.9;
    }

    .btn-secondary {
      background: var(--secondary);
      color: var(--secondary-foreground);
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: var(--accent);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="text-sm">Logging into</div>
    <div class="url" id="redirectUrl">${sanitizedHost} ${session?.user.name}</div>
    <div class="warning">Make sure you trust the person hosting this mirror. If you are not sure, cancel.</div>
    <div class="button-group">
      <button class="btn-secondary" onclick="handleCancel()">
        Cancel
      </button>
      <button class="btn-primary" onclick="handleContinue()">
        Continue
      </button>
    </div>
  </div>

  <script>
    function handleContinue() {
    }

    function handleCancel() {
    }
  </script>
</body>
</html>
`,
			{
				headers: { 'Content-Type': 'text/html' }
			}
		);
	})
});

export default http;
