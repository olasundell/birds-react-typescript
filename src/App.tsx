import * as React from 'react';
import './App.css';
import BirdComponent from './components/BirdComponent';
import { BirdResponse } from './models/RandomBirdResponse';
import { StoreState } from './reducers';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRandomBird as fetchRandomBirdAction,
	fetchLanguages as fetchLanguagesAction,
	fetchRegions as fetchRegionsAction } from './actions/actions';

import LanguageComponent from './components/LanguageComponent';
import RegionComponent from './components/RegionComponent';
import { Language } from './models/Language';
import { Region } from './models/Region';

export interface AppProps {
	isLoading: boolean;
	response: BirdResponse;
	fetchRandomBird(): (dispatch: Dispatch<StoreState>) => Promise<BirdResponse>;
	fetchLanguages(): (dispatch: Dispatch<StoreState>) => Promise<Language[]>;
	fetchRegions(): (dispatch: Dispatch<StoreState>) => Promise<Region[]>;
}

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
		props.fetchRandomBird();
		props.fetchLanguages();
		props.fetchRegions();
	}

	render() {
		return (
			<div>
				<LanguageComponent />
				<RegionComponent />
				<BirdComponent />
			</div>
		);
	}
}

function mapStateToProps(state: StoreState) {
	return {
		isLoading: state.isLoading,
		response: state.response
	};
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
	return {
		fetchRandomBird: bindActionCreators(fetchRandomBirdAction, dispatch),
		fetchLanguages: bindActionCreators(fetchLanguagesAction, dispatch),
		fetchRegions: bindActionCreators(fetchRegionsAction, dispatch),
	};
}

export default connect<{}, {}, AppProps>(mapStateToProps, mapDispatchToProps)(App) as React.ComponentClass<{}>;
