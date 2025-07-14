export default function createBackup() {
	let cookies = document.cookie.split('; ');
	let filteredCookies = cookies.filter((cookie) => {
		return !(
			cookie.trim().startsWith('__') ||
			cookie.trim().startsWith('clerk') ||
			cookie.trim().startsWith('ph')
		);
	});
	let cookieString = filteredCookies.join('; ');

	let filteredLocalStorage = Object.entries(localStorage).filter(([key, value]) => {
		return !(
			key.startsWith('__') ||
			key.startsWith('clerk') ||
			key.startsWith('ph') ||
			key == 'lastSeenSurveyDate'
		);
	});
	let filteredLocalStorageObject = Object.fromEntries(filteredLocalStorage);
	let filteredSessionStorage = Object.entries(sessionStorage).filter(([key, value]) => {
		return !(
			key.startsWith('__') ||
			key.startsWith('clerk') ||
			key.startsWith('ph') ||
			key == 'lastSeenSurveyDate'
		);
	});
	let filteredSessionStorageObject = Object.fromEntries(filteredSessionStorage);

	let data = {
		cookies: cookieString,
		localstorage: filteredLocalStorageObject,
		sessionstorage: filteredSessionStorageObject
	};

	console.log(data);

	try {
		return btoa(JSON.stringify(data));
	} catch (error) {
		console.error('Failed to create backup:', error);
		throw new Error('Backup creation failed');
	}
}
