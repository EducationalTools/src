export default function restoreBackup(backupData: string) {
	Object.entries(localStorage).forEach(([key, value]) => {
		if (
			!(
				key.startsWith('__') ||
				key.startsWith('clerk') ||
				key.startsWith('ph') ||
				key == 'lastSeenSurveyDate'
			)
		) {
			localStorage.removeItem(key);
		}
	});

	Object.entries(sessionStorage).forEach(([key, value]) => {
		if (
			!(
				key.startsWith('__') ||
				key.startsWith('clerk') ||
				key.startsWith('ph') ||
				key == 'lastSeenSurveyDate'
			)
		) {
			sessionStorage.removeItem(key);
		}
	});

	document.cookie.split(';').forEach((cookie) => {
		const trimmed = cookie.trim();
		if (!(trimmed.startsWith('ph') || trimmed.startsWith('__') || trimmed.startsWith('clerk'))) {
			const eqPos = trimmed.indexOf('=');
			// Skip malformed cookies that do not contain '='
			if (eqPos === -1) return;
			const name = trimmed.substring(0, eqPos);
			// Value is trimmed.substring(eqPos + 1), but not needed here
			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		}
	});

	localStorage.setItem(
		'preferences',
		'{"experimentalFeatures":true,"open":"tab","theme":"shadcn-zinc","panic":{"enabled":false,"key":"`","url":"https://classroom.google.com","disableExperimentalMode":true},"cloak":{"mode":"off","name":"Home","icon":"https://ssl.gstatic.com/classroom/favicon.png"},"analytics":true,"history":true}'
	);

	let data;
	try {
		data = JSON.parse(atob(backupData));
	} catch (error) {
		console.error('Failed to decode or parse backup data:', error);
		return;
	}

	if (data.cookies) {
		data.cookies.split(';').forEach((cookie: string) => {
			const [name, value] = cookie.split('=');
			document.cookie = `${name}=${value}`;
		});
	}

	if (data.localstorage) {
		Object.entries(data.localstorage).forEach(([key, value]) => {
			localStorage.setItem(key, value as string);
		});
	}

	if (data.sessionstorage) {
		Object.entries(data.sessionstorage).forEach(([key, value]) => {
			sessionStorage.setItem(key, value as string);
		});
	}

	if (location.pathname == '/handoff') {
		window.open('/', '_self');
	} else {
		location.reload();
	}
}
