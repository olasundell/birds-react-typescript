export interface Region {
	id: number;
	code: string;
	name: string;
}
export function defaultRegion(): Region {
	const name = localStorage.getItem('currentRegionName');
	const code = localStorage.getItem('currentRegionCode');
	const id = localStorage.getItem('currentRegionId');

	// export const defaultRegion: Region = {
	// 	id: 1,
	// 	code: 'WORLD',
	// 	name: 'Whole world'
	// };
	return {
		name: name ? name : 'Whole world',
		code: code ? code : 'WORLD',
		id: id ? Number(id) : 1,
	};
}
