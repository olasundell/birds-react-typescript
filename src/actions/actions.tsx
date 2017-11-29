import { BirdResponse } from '../models/RandomBirdResponse';
import { createActionCreator } from 'react-redux-typescript/module/create-action-creator';
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

export const actionCreators = {
	requestRandomBird: createActionCreator(ActionTypeKeys.REQUEST_RANDOM_BIRD),
	requestSpecificBird: createActionCreator(ActionTypeKeys.REQUEST_SPECIFIC_BIRD),
	receiveBird: createActionCreator(ActionTypeKeys.RECEIVE_BIRD, (state: BirdResponse) => {
		return state;
	}),
	randomBirdError: createActionCreator(ActionTypeKeys.RANDOM_BIRD_ERROR),

	requestLanguages: createActionCreator(ActionTypeKeys.REQUEST_LANGUAGES),
	receiveLanguages: createActionCreator(ActionTypeKeys.RECEIVE_LANGUAGES, (state: Language[]) => { return state; }),
	setCurrentLanguage: createActionCreator(ActionTypeKeys.SET_CURRENT_LANGUAGE, (state: Language) => { return state; }),

	requestRegions: createActionCreator(ActionTypeKeys.REQUEST_REGIONS),
	receiveRegions: createActionCreator(ActionTypeKeys.RECEIVE_REGIONS, (state: Region[]) => { return state; }),
	setCurrentRegion: createActionCreator(ActionTypeKeys.SET_CURRENT_REGION, (state: Region) => { return state; })
};

type S<T> = { response: T };

type QRandomBirdResponse = S<{ randomBirdResponse: BirdResponse }>;
type QLanguagesResponse = S<{ languages: Language[] }>;
type QLanguageResponse = S<{ currentLanguage: Language }>;
type QRegionsResponse = S<{ regions: Region[] }>;
type QRegionResponse = S<{ region: Region }>;

export type Action = ({ type: ActionTypeKeys.REQUEST_RANDOM_BIRD }) |
	({ type: ActionTypeKeys.REQUEST_SPECIFIC_BIRD}) |
	({ type: ActionTypeKeys.RECEIVE_BIRD, payload: BirdResponse} & QRandomBirdResponse) |
	({ type: ActionTypeKeys.RANDOM_BIRD_ERROR, error: string }) |
	({ type: ActionTypeKeys.REQUEST_LANGUAGES }) |
	({ type: ActionTypeKeys.RECEIVE_LANGUAGES, payload: Language[] }  & QLanguagesResponse) |
	({ type: ActionTypeKeys.SET_CURRENT_LANGUAGE, payload: Language }  & QLanguageResponse) |
	({ type: ActionTypeKeys.REQUEST_REGIONS}) |
	({ type: ActionTypeKeys.RECEIVE_REGIONS, payload: Region[]} & QRegionsResponse) |
	({ type: ActionTypeKeys.SET_CURRENT_REGION, payload: Region}  & QRegionResponse)
	;

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

	console.log(`Fetching specific bird ${sciName}`);
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestSpecificBird());
		let url: string = createUrl(selectedLanguage, selectedRegion, sciName);

		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveBird(json)));
	};
}

export function fetchRandomBird(selectedLanguage: Language,
								selectedRegion: Region): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestRandomBird());
		let url = createUrl(selectedLanguage, selectedRegion);
		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveBird(json)));
	};
}

export function fetchLanguages(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestLanguages());
		return fetch('http://localhost:8080/languages')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveLanguages(json)));
	};
}

export function setCurrentLanguage(language: Language): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	if (language) {
		localStorage.setItem('currentLanguageCode', language.code);
		localStorage.setItem('currentLanguageName', language.name);
	}

	return async (dispatch: Dispatch<StoreState>) => {
		return dispatch(actionCreators.setCurrentLanguage(language));
	};
}

export function fetchRegions(): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		dispatch(actionCreators.requestRegions());
		return fetch('http://localhost:8080/regions')
			.then(response => response.json())
			.then(json => dispatch(actionCreators.receiveRegions(json)));
	};
}

export function setCurrentRegion(region: Region): (dispatch: Dispatch<StoreState>) => Promise<{}> {
	return async (dispatch: Dispatch<StoreState>) => {
		if (region) {
			localStorage.setItem('currentRegionCode', region.code);
			localStorage.setItem('currentRegionId', String(region.id));
			localStorage.setItem('currentRegionName', region.name);
		}

		return dispatch(actionCreators.setCurrentRegion(region));
	};
}
