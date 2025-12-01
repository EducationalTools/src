export function generateAuthPage(
  host: string,
  name: string,
  redirectUrl: string,
  continueUrl: string,
  trusted: boolean
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Authentication Required</title>
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
          --logo-color: oklch(0.145 0 0);
          --trusted-bg: oklch(0.9 0.05 240);
          --trusted-color: oklch(0.45 0.15 240);
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
            --logo-color: oklch(0.985 0 0);
            --trusted-bg: oklch(0.25 0.05 240);
            --trusted-color: oklch(0.65 0.15 240);
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1.25rem;
          gap: 1rem;
        }

        .logo {
          width: 56px;
          height: 56px;
          margin-bottom: 0.25rem;
        }

        .logo path {
          fill: var(--logo-color);
        }

        .card {
          background: var(--card);
          color: var(--card-foreground);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }

        .text-sm {
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin-bottom: 0.5rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .user-info {
          margin-bottom: 1.5rem;
        }

        .username {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.375rem;
          color: var(--foreground);
          line-height: 1.2;
        }

        .host-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .host {
          font-size: 1.125rem;
          color: var(--muted-foreground);
          font-weight: 500;
        }

        .trusted-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: var(--trusted-bg);
          color: var(--trusted-color);
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .trusted-chip svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .warning {
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: calc(var(--radius) - 2px);
          padding: 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .warning-title {
          font-weight: 600;
          margin-bottom: 0.375rem;
          display: block;
        }

        .button-group {
          display: flex;
          gap: 0.75rem;
        }

        button {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: var(--primary);
          color: var(--primary-foreground);
        }

        .btn-primary:not(:disabled):hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          background: rgba(255, 255, 255, 0.15);
          transition: width 3s linear;
        }

        .btn-primary.loading::before {
          width: 100%;
        }

        .btn-secondary {
          background: var(--secondary);
          color: var(--secondary-foreground);
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          background: var(--accent);
        }

        .footer-info {
          max-width: 480px;
          width: 100%;
          padding: 0 0.5rem;
        }

        .security-notice {
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.875rem;
          margin-bottom: 0.875rem;
        }

        .security-notice-title {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 0.375rem;
        }

        .security-notice-text {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          line-height: 1.5;
        }

        .redirect-info {
        }

        .redirect-label {
          font-size: 0.6875rem;
          color: var(--muted-foreground);
          margin-bottom: 0.25rem;
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .redirect-url {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          word-break: break-all;
          opacity: 0.7;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
        }

        .kbd-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-left: 0.5rem;
          font-size: 0.75rem;
          opacity: 0.7;
        }

        kbd {
          display: inline-block;
          padding: 0.125rem 0.375rem;
          font-size: 0.6875rem;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
          line-height: 1.5;
          color: var(--muted-foreground);
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: calc(var(--radius) - 4px);
          box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .card {
            padding: 1.75rem 1.25rem;
          }

          .username {
            font-size: 1.5rem;
          }

          .host {
            font-size: 1rem;
          }

          .button-group {
            flex-direction: column-reverse;
          }

          .host-container {
            flex-wrap: wrap;
          }
        }
      </style>
    </head>
    <body>
      <svg
        class="logo"
        viewBox="0 0 135.46666 135.46667"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 101.8955,18.094664 C 93.10164,18.20954 84.91762,21.931028 79.028782,27.819678 70.795215,36.053433 67.194271,48.783091 71.366562,61.37857 L 40.671733,92.073399 c -3.191233,3.191063 -4.690359,7.321303 -4.466525,11.124881 0.222765,3.80339 1.957297,7.17925 4.466525,9.68831 2.509039,2.50921 5.884901,4.24285 9.688309,4.46652 3.803559,0.22454 7.933629,-1.276 11.124861,-4.46652 L 92.179751,82.19174 c 12.595459,4.172292 25.325309,0.572063 33.558869,-7.662219 8.97349,-8.9735 12.9134,-23.287635 6.73194,-36.947937 a 4.7156582,4.7156582 0 0 0 -7.62532,-1.390582 l -17.74632,17.746512 -7.478113,-7.478117 0.01883,-0.0094 L 117.3676,28.71275 a 4.7156582,4.7156582 0 0 0 -1.39058,-7.625327 c -3.41507,-1.545081 -6.87451,-2.458419 -10.27764,-2.818056 -1.27618,-0.135026 -2.54719,-0.191391 -3.80358,-0.17495 z M 51.852016,19.26427 50.912671,19.2831 c -1.377569,0.08908 -2.741786,0.390465 -4.05218,0.884111 -0.486509,0.183613 -1.257288,0.53035 -1.73133,0.745997 L 6.4958801,38.493321 c -0.4740437,0.215647 -1.2492655,0.563156 -1.703705,0.819781 -2.7679847,1.566473 -4.44709689,4.413587 -4.75201696,7.275314 -0.05346436,0.51681 -0.05363385,1.360639 0,1.87871 0.30474305,2.861539 1.98385336,5.708652 4.75201696,7.275314 0.4526579,0.256625 1.2296613,0.594869 1.703705,0.810515 L 17.989114,61.793083 A 1.4665813,1.4665813 0 0 1 18.8456,63.12843 v 11.760369 c 0,0.520388 -0.0021,1.369377 0.03689,1.887806 0.204942,2.84282 1.324291,5.491405 2.965443,7.625328 0.317218,0.41344 0.879654,1.043958 1.243205,1.418208 1.845383,1.89564 4.076594,3.360891 6.538591,4.54029 0.468696,0.224554 1.248552,0.570104 1.731505,0.764357 0.124744,0.05348 0.256625,0.1032 0.386719,0.156684 0.484737,0.190694 1.0944,-0.01883 1.381321,-0.460502 0.641562,-0.965899 1.35726,-1.891723 2.164202,-2.772086 0.351078,-0.383158 0.957355,-0.986577 1.326253,-1.35369 l 2.191822,-2.191831 C 39.180454,84.134461 39.065502,83.736162 38.562949,83.600721 37.358238,83.276376 36.22588,82.91301 35.192252,82.504899 34.707517,82.314206 33.937107,81.974004 33.470193,81.740542 32.112219,81.063339 31.006236,80.320205 30.200719,79.594698 29.814,79.24719 29.253701,78.620589 28.966781,78.185755 c -0.310088,-0.466904 -0.500597,-0.915108 -0.598613,-1.399847 -0.106928,-0.51325 -0.09213,-1.366533 -0.09213,-1.887975 v -7.459586 a 0.60640068,0.60640068 0 0 1 0.856486,-0.552459 l 15.99665,7.293675 c 0.474041,0.215628 1.243032,0.56777 1.731329,0.745997 0.08908,0.03559 0.15593,0.0565 0.248603,0.09209 0.491876,0.178152 1.198475,-0.01695 1.565589,-0.386718 L 59.587869,63.736124 a 0.17124655,0.17124655 0 0 0 -0.193368,-0.27623 l -4.724392,2.136597 -0.865749,0.395983 c -1.589656,0.466904 -2.312131,0.466019 -3.011424,0.303856 -0.506132,-0.124669 -0.907821,-0.303856 -0.902472,-0.303856 L 10.345432,47.951371 C 9.8713886,47.735743 9.3707916,47.527762 9.4153446,47.527762 l 0.055253,-0.03691 39.5540974,-18.004211 0.86575,-0.386906 c 0.932057,-0.317208 0.971963,-0.331822 1.01296,-0.340729 0.507902,-0.106967 1.369377,-0.104519 1.87871,0 0.03559,0.0094 0.08418,0.01902 0.119772,0.03691 0.506132,0.124668 0.897124,0.313121 0.902473,0.313121 l 11.981345,5.451839 c 0.474041,0.215646 1.005126,0.0011 1.206497,-0.478844 0.983733,-2.346161 2.212152,-4.579329 3.674559,-6.64909 0.301163,-0.425926 0.17721,-0.935598 -0.304044,-1.151245 L 58.565644,20.91272 c -0.474042,-0.215647 -1.244821,-0.569747 -1.73133,-0.755092 -1.309867,-0.495435 -2.674611,-0.784132 -4.05218,-0.875015 -0.520388,-0.03559 -0.935429,-0.02128 -0.930099,-0.01883 z m 50.052754,8.205583 c 0.89426,-0.0094 1.80136,0.03653 2.71683,0.138039 l -0.009,-0.01883 c 0.14256,0.01507 0.28461,0.111298 0.42361,0.129 l -12.073489,12.064225 -0.05518,0.04595 a 4.7156582,4.7156582 0 0 0 -0.02768,0.03691 c -3.557649,3.629456 -3.557649,9.57673 0,13.206204 a 4.7156582,4.7156582 0 0 0 0.02768,0.03691 l 7.551729,7.551544 a 4.7156582,4.7156582 0 0 0 0.0369,0.03691 c 3.62945,3.55763 9.57674,3.55763 13.2062,0 a 4.7156582,4.7156582 0 0 0 0.0367,-0.03691 l 12.11948,-12.119479 c 0.96947,7.484012 -1.81687,14.378842 -6.77792,19.339728 -6.4919,6.492068 -16.28107,9.383738 -26.394068,4.807253 a 4.7156582,4.7156582 0 0 0 -5.27702,0.966991 L 54.826529,106.23693 c -1.523725,1.52371 -2.689225,1.78425 -3.895535,1.71297 -1.206498,-0.0712 -2.555216,-0.68647 -3.582413,-1.71297 -1.028289,-1.02829 -1.641689,-2.37593 -1.712968,-3.58241 -0.07137,-1.2065 0.189243,-2.37147 1.712968,-3.895534 L 79.931217,66.176351 a 4.7156582,4.7156582 0 0 0 0.966972,-5.277039 C 76.321704,50.786149 79.21409,40.997163 85.705461,34.505265 c 4.260331,-4.260162 9.939926,-6.969858 16.199269,-7.035808 z"
        />
      </svg>

      <div class="card">
        <div class="text-sm">Logging in as</div>
        <div class="user-info">
          <div class="username" id="userName">${name}</div>
          <div class="host-container">
            <div class="host" id="hostName">${host}</div>
            ${
              trusted
                ? `<div class="trusted-chip">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>
              Trusted
            </div>`
                : ""
            }
          </div>
        </div>
        ${
          !trusted
            ? `<div class="warning">
          This mirror is not hosted by EduTools. Make sure you trust the person hosting this mirror. Only continue if you initiated this login.
        </div>`
            : ""
        }
        <div class="button-group">
          <button class="btn-secondary" onclick="handleCancel()">
            Cancel<span class="kbd-hint"><kbd>Esc</kbd></span>
          </button>
          <button
            class="btn-primary"
            id="continueBtn"
            onclick="handleContinue()"
            ${!trusted ? "disabled" : ""}
          >
            ${!trusted ? `Continue (<span id="countdown">3</span>)` : 'Continue<span class="kbd-hint"><kbd>↵</kbd></span>'}
          </button>
        </div>
      </div>

      <div class="footer-info">
        ${
          !trusted
            ? `<div class="security-notice">
          <div class="security-notice-title">Seeing this unexpectedly?</div>
          <div class="security-notice-text">
            If you didn't initiate this login, someone may be attempting to
            access your account. Close this page immediately and check your
            account security.
          </div>
        </div>`
            : ""
        }

        <div class="redirect-info">
          <div class="redirect-label">Redirect URL</div>
          <div class="redirect-url" id="redirectUrl">
            ${redirectUrl}
          </div>
        </div>
      </div>

      <script>
        const trusted = ${trusted};
        const continueBtn = document.getElementById("continueBtn");

        if (!trusted) {
          let countdown = 3;
          const countdownSpan = document.getElementById("countdown");

          continueBtn.classList.add("loading");

          const interval = setInterval(() => {
            countdown--;
            countdownSpan.textContent = countdown;

            if (countdown === 0) {
              clearInterval(interval);
              continueBtn.disabled = false;
              continueBtn.innerHTML = 'Continue<span class="kbd-hint"><kbd>↵</kbd></span>';
              continueBtn.classList.remove("loading");
            }
          }, 1000);
        }

        function handleContinue() {
          if (!continueBtn.disabled) {
            location.href = "${continueUrl}";
          }
        }

        function handleCancel() {
          history.back();
        }

        document.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !continueBtn.disabled) {
            e.preventDefault();
            handleContinue();
          } else if (e.key === "Escape") {
            e.preventDefault();
            handleCancel();
          }
        });
      </script>
    </body>
  </html>`;
}

export function generateErrorPage(errorMessage: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Something went wrong</title>
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
          --destructive-foreground: oklch(0.985 0 0);
          --destructive-muted: oklch(0.95 0.05 27.325);
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
          --logo-color: oklch(0.145 0 0);
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
            --destructive-foreground: oklch(0.985 0 0);
            --destructive-muted: oklch(0.25 0.05 22.216);
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
            --logo-color: oklch(0.985 0 0);
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1.25rem;
          gap: 1rem;
        }

        .logo {
          width: 56px;
          height: 56px;
          margin-bottom: 0.25rem;
        }

        .logo path {
          fill: var(--logo-color);
        }

        .card {
          background: var(--card);
          color: var(--card-foreground);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }

        .error-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .error-icon {
          width: 48px;
          height: 48px;
          background: var(--destructive-muted);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .error-icon svg {
          width: 28px;
          height: 28px;
          color: var(--destructive);
        }

        .error-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
          line-height: 1.2;
        }

        .error-message {
          background: var(--destructive-muted);
          border: 1px solid var(--destructive);
          border-radius: calc(var(--radius) - 2px);
          padding: 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
          line-height: 1.5;
        }

        .error-details {
          font-size: 0.8125rem;
          color: var(--muted-foreground);
          line-height: 1.6;
        }

        .error-actions {
          margin-top: 1.5rem;
        }

        .btn-back {
          width: 100%;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          background: var(--secondary);
          color: var(--secondary-foreground);
          border: 1px solid var(--border);
        }

        .btn-back:hover {
          background: var(--accent);
        }

        .kbd-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-left: 0.5rem;
          font-size: 0.75rem;
          opacity: 0.7;
        }

        kbd {
          display: inline-block;
          padding: 0.125rem 0.375rem;
          font-size: 0.6875rem;
          font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
            Consolas, "Courier New", monospace;
          line-height: 1.5;
          color: var(--muted-foreground);
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: calc(var(--radius) - 4px);
          box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .card {
            padding: 1.75rem 1.25rem;
          }

          .error-title {
            font-size: 1.25rem;
          }

          .error-header {
            flex-direction: column;
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <svg
        class="logo"
        viewBox="0 0 135.46666 135.46667"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 101.8955,18.094664 C 93.10164,18.20954 84.91762,21.931028 79.028782,27.819678 70.795215,36.053433 67.194271,48.783091 71.366562,61.37857 L 40.671733,92.073399 c -3.191233,3.191063 -4.690359,7.321303 -4.466525,11.124881 0.222765,3.80339 1.957297,7.17925 4.466525,9.68831 2.509039,2.50921 5.884901,4.24285 9.688309,4.46652 3.803559,0.22454 7.933629,-1.276 11.124861,-4.46652 L 92.179751,82.19174 c 12.595459,4.172292 25.325309,0.572063 33.558869,-7.662219 8.97349,-8.9735 12.9134,-23.287635 6.73194,-36.947937 a 4.7156582,4.7156582 0 0 0 -7.62532,-1.390582 l -17.74632,17.746512 -7.478113,-7.478117 0.01883,-0.0094 L 117.3676,28.71275 a 4.7156582,4.7156582 0 0 0 -1.39058,-7.625327 c -3.41507,-1.545081 -6.87451,-2.458419 -10.27764,-2.818056 -1.27618,-0.135026 -2.54719,-0.191391 -3.80358,-0.17495 z M 51.852016,19.26427 50.912671,19.2831 c -1.377569,0.08908 -2.741786,0.390465 -4.05218,0.884111 -0.486509,0.183613 -1.257288,0.53035 -1.73133,0.745997 L 6.4958801,38.493321 c -0.4740437,0.215647 -1.2492655,0.563156 -1.703705,0.819781 -2.7679847,1.566473 -4.44709689,4.413587 -4.75201696,7.275314 -0.05346436,0.51681 -0.05363385,1.360639 0,1.87871 0.30474305,2.861539 1.98385336,5.708652 4.75201696,7.275314 0.4526579,0.256625 1.2296613,0.594869 1.703705,0.810515 L 17.989114,61.793083 A 1.4665813,1.4665813 0 0 1 18.8456,63.12843 v 11.760369 c 0,0.520388 -0.0021,1.369377 0.03689,1.887806 0.204942,2.84282 1.324291,5.491405 2.965443,7.625328 0.317218,0.41344 0.879654,1.043958 1.243205,1.418208 1.845383,1.89564 4.076594,3.360891 6.538591,4.54029 0.468696,0.224554 1.248552,0.570104 1.731505,0.764357 0.124744,0.05348 0.256625,0.1032 0.386719,0.156684 0.484737,0.190694 1.0944,-0.01883 1.381321,-0.460502 0.641562,-0.965899 1.35726,-1.891723 2.164202,-2.772086 0.351078,-0.383158 0.957355,-0.986577 1.326253,-1.35369 l 2.191822,-2.191831 C 39.180454,84.134461 39.065502,83.736162 38.562949,83.600721 37.358238,83.276376 36.22588,82.91301 35.192252,82.504899 34.707517,82.314206 33.937107,81.974004 33.470193,81.740542 32.112219,81.063339 31.006236,80.320205 30.200719,79.594698 29.814,79.24719 29.253701,78.620589 28.966781,78.185755 c -0.310088,-0.466904 -0.500597,-0.915108 -0.598613,-1.399847 -0.106928,-0.51325 -0.09213,-1.366533 -0.09213,-1.887975 v -7.459586 a 0.60640068,0.60640068 0 0 1 0.856486,-0.552459 l 15.99665,7.293675 c 0.474041,0.215628 1.243032,0.56777 1.731329,0.745997 0.08908,0.03559 0.15593,0.0565 0.248603,0.09209 0.491876,0.178152 1.198475,-0.01695 1.565589,-0.386718 L 59.587869,63.736124 a 0.17124655,0.17124655 0 0 0 -0.193368,-0.27623 l -4.724392,2.136597 -0.865749,0.395983 c -1.589656,0.466904 -2.312131,0.466019 -3.011424,0.303856 -0.506132,-0.124669 -0.907821,-0.303856 -0.902472,-0.303856 L 10.345432,47.951371 C 9.8713886,47.735743 9.3707916,47.527762 9.4153446,47.527762 l 0.055253,-0.03691 39.5540974,-18.004211 0.86575,-0.386906 c 0.932057,-0.317208 0.971963,-0.331822 1.01296,-0.340729 0.507902,-0.106967 1.369377,-0.104519 1.87871,0 0.03559,0.0094 0.08418,0.01902 0.119772,0.03691 0.506132,0.124668 0.897124,0.313121 0.902473,0.313121 l 11.981345,5.451839 c 0.474041,0.215646 1.005126,0.0011 1.206497,-0.478844 0.983733,-2.346161 2.212152,-4.579329 3.674559,-6.64909 0.301163,-0.425926 0.17721,-0.935598 -0.304044,-1.151245 L 58.565644,20.91272 c -0.474042,-0.215647 -1.244821,-0.569747 -1.73133,-0.755092 -1.309867,-0.495435 -2.674611,-0.784132 -4.05218,-0.875015 -0.520388,-0.03559 -0.935429,-0.02128 -0.930099,-0.01883 z m 50.052754,8.205583 c 0.89426,-0.0094 1.80136,0.03653 2.71683,0.138039 l -0.009,-0.01883 c 0.14256,0.01507 0.28461,0.111298 0.42361,0.129 l -12.073489,12.064225 -0.05518,0.04595 a 4.7156582,4.7156582 0 0 0 -0.02768,0.03691 c -3.557649,3.629456 -3.557649,9.57673 0,13.206204 a 4.7156582,4.7156582 0 0 0 0.02768,0.03691 l 7.551729,7.551544 a 4.7156582,4.7156582 0 0 0 0.0369,0.03691 c 3.62945,3.55763 9.57674,3.55763 13.2062,0 a 4.7156582,4.7156582 0 0 0 0.0367,-0.03691 l 12.11948,-12.119479 c 0.96947,7.484012 -1.81687,14.378842 -6.77792,19.339728 -6.4919,6.492068 -16.28107,9.383738 -26.394068,4.807253 a 4.7156582,4.7156582 0 0 0 -5.27702,0.966991 L 54.826529,106.23693 c -1.523725,1.52371 -2.689225,1.78425 -3.895535,1.71297 -1.206498,-0.0712 -2.555216,-0.68647 -3.582413,-1.71297 -1.028289,-1.02829 -1.641689,-2.37593 -1.712968,-3.58241 -0.07137,-1.2065 0.189243,-2.37147 1.712968,-3.895534 L 79.931217,66.176351 a 4.7156582,4.7156582 0 0 0 0.966972,-5.277039 C 76.321704,50.786149 79.21409,40.997163 85.705461,34.505265 c 4.260331,-4.260162 9.939926,-6.969858 16.199269,-7.035808 z"
        />
      </svg>

      <div class="card">
        <div class="error-header">
          <div class="error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="error-title">Authentication Failed</div>
        </div>

        <div class="error-message">${errorMessage}</div>

        <div class="error-actions">
          <button class="btn-back" onclick="handleGoBack()">
            Go Back<span class="kbd-hint"><kbd>Esc</kbd></span>
          </button>
        </div>
      </div>

      <script>
        function handleGoBack() {
          history.back();
        }

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            handleGoBack();
          }
        });
      </script>
    </body>
  </html>`;
}
