export const gmaes = [
	{
		id: '2048',
		name: '2048',
		description:
			'Press arrow keys randomly until you get the 2048 tile. Then continue pressing arrow keys randomly.',
		url: '/_app/tools/2048/index.html'
	},
	{
		id: 'bitlife',
		name: 'Bitlife',
		description: 'Do stupid stuff with a virtual character or something.',
		url: '/_app/tools/bitlife/index.html'
	}
];

export function getGameById(id: string) {
	return gmaes.find((gmae) => gmae.id === id);
}
