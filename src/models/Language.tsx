export interface Language {
	name: string;
	code: string;
}

export function defaultLanguage(): Language {
	const name = localStorage.getItem('currentLanguageName');
	const code = localStorage.getItem('currentLanguageCode');

	return {
		name: name ? name : 'English',
		code: code ? code : 'en_US'
	};
}