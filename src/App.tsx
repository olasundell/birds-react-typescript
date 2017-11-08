import * as React from 'react';
import './App.css';
import BirdComponent from './components/BirdComponent';
import { RandomBirdResponse } from './models/RandomBirdResponse';
import { StoreState } from './reducers';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRandomBird as fetchRandomBirdAction } from './actions/actions';
import { LanguageComponent } from './components/LanguageComponent';

export interface AppProps {
	isLoading: boolean;
	response: RandomBirdResponse;
	fetchRandomBird(): (dispatch: Dispatch<StoreState>) => Promise<RandomBirdResponse>;
}

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
		props.fetchRandomBird();
	}

	render() {
		return (
			<div>
				<LanguageComponent />
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
	};
}

export default connect<{}, {}, AppProps>(mapStateToProps, mapDispatchToProps)(App) as React.ComponentClass<{}>;
