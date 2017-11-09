export interface Region {
	id: number;
	code: string;
	name: string;
}

export const defaultRegion: Region = {
	id: 1,
	code: 'WORLD',
	name: 'Whole world'
};