import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { BirdReducer, randomBirdReducer } from './birdReducer';
import {default as languageReducer, LanguageReducer } from './languageReducer';
import {default as regionReducer, RegionReducer } from './regionReducer';

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

export function configureStore() {
	return createStore<StoreState>(
		rootReducer,
		applyMiddleware(thunk, createLogger())
	);
}
