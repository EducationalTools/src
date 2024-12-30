export const gmaes = [
	{
		id: 'test',
		name: 'Test Game',
		description: 'This is a test game',
		url: '/_app/tools/test/index.html'
	},
	{
		id: 'test2',
		name: 'Test Game 2',
		description: 'This is a test game 2',
		url: '/_app/tools/test2/index.html'
	}
];

export function getGameById(id: string) {
	return gmaes.find((gmae) => gmae.id === id);
}
