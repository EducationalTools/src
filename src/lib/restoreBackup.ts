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
			localStorage.removeItem(key);
		}
	});

	document.cookie.split(';').forEach((cookie) => {
		if (
			!(
				cookie.trim().startsWith('ph') ||
				cookie.trim().startsWith('__') ||
				cookie.trim().startsWith('clerk')
			)
		) {
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		}
	});

	localStorage.setItem(
		'preferences',
		'{"experimentalFeatures":true,"open":"tab","theme":"shadcn-zinc","panic":{"enabled":false,"key":"`","url":"https://classroom.google.com","disableExperimentalMode":true},"cloak":{"mode":"off","name":"Home","icon":"https://ssl.gstatic.com/classroom/favicon.png"},"analytics":true,"history":true}'
	);

	const data = JSON.parse(atob(backupData));

	if (data.cookies) {
		data.cookies.split(';').forEach((cookie: string) => {
			console.log('Cookie:', cookie);
			const [name, value] = cookie.split('=');
			document.cookie = `${name}=${value}`;
		});
	}

	if (data.localstorage) {
		Object.entries(data.localstorage).forEach(([key, value]) => {
			console.log('LocalStorage:', key, value);
			localStorage.setItem(key, value as string);
		});
	}

	if (data.sessionstorage) {
		Object.entries(data.sessionstorage).forEach(([key, value]) => {
			console.log('SessionStorage:', key, value);
			sessionStorage.setItem(key, value as string);
		});
	}
	location.reload();
}
