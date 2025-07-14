export default function createBackup() {
	let data = {
		cookies: document.cookie,
		localstorage: localStorage,
		sessionstorage: sessionStorage
	};

	return btoa(JSON.stringify(data));
}
