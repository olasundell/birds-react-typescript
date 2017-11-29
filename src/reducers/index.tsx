import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { BirdReducer, randomBirdReducer } from './birdReducer';
import {default as languageReducer, LanguageReducer } from './languageReducer';
import {default as regionReducer, RegionReducer } from './regionReducer';
import { Middleware } from 'redux';

// export interface StoreState {
// 	currentLanguage: Language;
// 	currentRegion: Region;
// 	isLoading: boolean;
// 	response?: BirdResponse;
// 	languages: Language[];
// 	regions: Region[];
// }

export interface StoreState extends BirdReducer, LanguageReducer, RegionReducer {}

export const rootReducer = combineReducers<StoreState>({
	bird: randomBirdReducer,
	language: languageReducer,
	region: regionReducer
});

// used to convert actions to plain objects, needed because we use classes as actions. Somehow.
const actionToPlainObject: Middleware = store => next => {
	return (action: any) => {
		if (action !== undefined && action !== null && typeof action === 'object') {
			return next({ ...action });
		}

		throw new Error(`action must be an object: ${JSON.stringify(action)}`);
	};
};

export function configureStore() {
	return createStore<StoreState>(
		rootReducer,
		applyMiddleware(thunk, actionToPlainObject, createLogger())
	);
}
