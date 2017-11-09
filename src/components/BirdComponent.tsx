import * as React from 'react';
import { BirdResponse } from '../models/RandomBirdResponse';
import { connect, Dispatch } from 'react-redux';
import { MediaComponent } from './MediaComponent';
import { Language } from '../models/Language';
import { Region } from '../models/Region';
import { StoreState } from '../reducers';
import { bindActionCreators } from 'redux';
import { fetchSpecificBird as fetchSpecificBirdAction,
	fetchRandomBird as fetchRandomBirdAction } from '../actions/actions';

export interface BirdComponentProps {
	response?: BirdResponse;
	currentLanguage: Language;
	currentRegion: Region;
	isLoading: boolean;
}

interface BirdComponentActions {
	fetchRandomBird(selectedLanguage: Language, selectedRegion: Region): (dispatch: Dispatch<StoreState>) => Promise<{}>;
	fetchSpecificBird(sciName: string, selectedLanguage: Language, selectedRegion: Region)
		: (dispatch: Dispatch<StoreState>) => Promise<{}>;
}

interface BirdComponentParams extends BirdComponentProps, BirdComponentActions {}

class BirdComponent extends React.Component<BirdComponentParams, object> {
	componentWillReceiveProps(nextProps: BirdComponentProps) {
		const languageChanged = nextProps.currentLanguage !== this.props.currentLanguage;
		const regionChanged = nextProps.currentRegion !== this.props.currentRegion;

		if (nextProps.response) {
			if (languageChanged) {
				this.props.fetchSpecificBird(
					nextProps.response.actualBird.scientificName,
					nextProps.currentLanguage,
					nextProps.currentRegion);
			} else if (regionChanged) {
				this.props.fetchRandomBird(this.props.currentLanguage, this.props.currentRegion);
			}
		}
	}
	render() {
		const { response, isLoading } = this.props;

		if (!response) {
			return (
				<h2>Empty</h2>
			);
		}

		if (isLoading) {
			return (
				<h2>Loading...</h2>
			);
		}

		return (
			<div>
				<MediaComponent mediaType={response.media.mediaType} url={response.media.url}/>
				<ul>
					{response.genusBirds.map((b, i) => <li key={b.scientificName}>{b.name}</li>)}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state: any): BirdComponentProps {
	return {
		isLoading: state.randomBirdResponse.isLoading,
		response: state.randomBirdResponse.response,
		currentLanguage: state.randomBirdResponse.currentLanguage,
		currentRegion: state.randomBirdResponse.currentRegion
	};
}

function mapDispatchToActions(dispatch: Dispatch<StoreState>): BirdComponentActions {
	return {
		fetchSpecificBird: bindActionCreators(fetchSpecificBirdAction, dispatch),
		fetchRandomBird: bindActionCreators(fetchRandomBirdAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToActions)(BirdComponent);

// helpers
