import { BirdResponse } from '../models/RandomBirdResponse';
import { Dispatch } from 'react-redux';
import { StoreState } from '../reducers';
import { defaultLanguage, Language } from '../models/Language';
import { defaultRegion, Region } from '../models/Region';

export enum ActionTypeKeys {
	REQUEST_RANDOM_BIRD = 'REQUEST_RANDOM_BIRD',
	REQUEST_SPECIFIC_BIRD = 'REQUEST_SPECIFIC_BIRD',
	RECEIVE_BIRD = 'RECEIVE_BIRD',
	RANDOM_BIRD_ERROR = 'RANDOM_BIRD_ERROR',

	REQUEST_LANGUAGES = 'REQUEST_LANGUAGES',
	RECEIVE_LANGUAGES = 'RECEIVE_LANGUAGES',
	SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE',

	REQUEST_REGIONS = 'REQUEST_REGIONS',
	RECEIVE_REGIONS = 'RECEIVE_REGIONS',
	SET_CURRENT_REGION = 'SET_CURRENT_REGION',
}

class RequestRandomBird {
	readonly type = ActionTypeKeys.REQUEST_RANDOM_BIRD;
}

class RequestSpecificBird {
	readonly type = ActionTypeKeys.REQUEST_SPECIFIC_BIRD;
}

class ReceiveBird {
	readonly type = ActionTypeKeys.RECEIVE_BIRD;
	constructor(public payload: BirdResponse) {}
}

class RequestLanguages {
	readonly type = ActionTypeKeys.REQUEST_LANGUAGES;
}

class ReceiveLanguages {
	readonly type = ActionTypeKeys.RECEIVE_LANGUAGES;
	constructor(public payload: Language[]) {}
}

class SetCurrentLanguage {
	readonly type = ActionTypeKeys.SET_CURRENT_LANGUAGE;
	constructor(public payload: Language) {}
}

class RequestRegions {
	readonly type = ActionTypeKeys.REQUEST_REGIONS;
}

class ReceiveRegions {
	readonly type = ActionTypeKeys.RECEIVE_REGIONS;
	constructor(public payload: Region[]) {}
}

class SetCurrentRegion {
	readonly type = ActionTypeKeys.SET_CURRENT_REGION;
	constructor(public payload: Region) {}
}

export type Action = RequestRandomBird | RequestSpecificBird | ReceiveBird |
	RequestLanguages | ReceiveLanguages | SetCurrentLanguage |
	RequestRegions | ReceiveRegions | SetCurrentRegion;

function createUrl(selectedLanguage?: Language, selectedRegion?: Region, sciName?: string): string {
	let url: URL = new URL('http://localhost:8080/random');
	let params: URLSearchParams = url.searchParams;
	// let params: URLSearchParams = new URLSearchParams();

	let lang = selectedLanguage ? selectedLanguage : defaultLanguage();
	let region = selectedRegion ? selectedRegion : defaultRegion();

	params.set('lang', lang.code);
	params.set('region', region.code);

	if (sciName) {
		params.set('name', sciName);
	}

	return url.toString();
}

export function fetchSpecificBird(sciName: string, selectedLanguage: Language, selectedRegion: Region):
			(dispatch: Dispatch<StoreState>) => Promise<{}> {

	// console.log(`Fetching specific bird ${sciName}`);
	return async (dispatch: Dispatch<StoreState>) => {
		// dispatch(actionCreators.requestSpecificBird());
		dispatch(new RequestSpecificBird());
		let url: string = createUrl(selectedLanguage, selectedRegion, sciName);

		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(new ReceiveBird(json)));
	};
}

export function fetchRandomBird(selectedLanguage: Language,
								selectedRegion: Region): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestRandomBird());
		let url = createUrl(selectedLanguage, selectedRegion);
		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(new ReceiveBird(json)));
	};
}

export function fetchLanguages(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestLanguages());
		return fetch('http://localhost:8080/languages')
			.then(response => response.json())
			.then(json => dispatch(new ReceiveLanguages(json)));
	};
}

export function setCurrentLanguage(language: Language): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	if (language) {
		localStorage.setItem('currentLanguageCode', language.code);
		localStorage.setItem('currentLanguageName', language.name);
	}

	return async (dispatch: Dispatch<StoreState>) => {
		return dispatch(new SetCurrentLanguage(language));
	};
}

export function fetchRegions(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(new RequestRegions());
		return fetch('http://localhost:8080/regions')
			.then(response => response.json())
			.then(json => dispatch(new ReceiveRegions(json)));
	};
}

export function setCurrentRegion(region: Region): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		if (region) {
			localStorage.setItem('currentRegionCode', region.code);
			localStorage.setItem('currentRegionId', String(region.id));
			localStorage.setItem('currentRegionName', region.name);
		}

		return dispatch(new SetCurrentRegion(region));
	};
}
