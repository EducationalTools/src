export default function restoreBackup(backupData: string) {
	localStorage.clear();
	sessionStorage.clear();
	document.cookie.split(';').forEach((cookie) => {
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	});

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
	localStorage.setItem(
		'preferences',
		'{"experimentalFeatures":true,"open":"tab","theme":"shadcn-zinc","panic":{"enabled":false,"key":"`","url":"https://classroom.google.com","disableExperimentalMode":true},"cloak":{"mode":"off","name":"Home","icon":"https://ssl.gstatic.com/classroom/favicon.png"},"analytics":true,"history":true}'
	);
	location.reload();
}
