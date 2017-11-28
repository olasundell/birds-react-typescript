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

interface BirdComponentParams extends BirdComponentProps, BirdComponentActions {
}

interface BirdComponentState {
	correctIndex: number;
	clicked: boolean;
}

class BirdComponent extends React.Component<BirdComponentParams, BirdComponentState> {
	constructor(props: BirdComponentParams, state: BirdComponentState) {
		super(props, state);
		this.state = {
			correctIndex: -1,
			clicked: false,
		};
		this.correctAndClicked = this.correctAndClicked.bind(this);
	}

	componentWillReceiveProps(nextProps: BirdComponentParams) {
		const languageChanged = nextProps.currentLanguage !== this.props.currentLanguage;
		const regionChanged = nextProps.currentRegion !== this.props.currentRegion;

		if (nextProps.response) {
			const resp: BirdResponse = nextProps.response;
			if (languageChanged) {
				this.props.fetchSpecificBird(
					nextProps.response.actualBird.scientificName,
					nextProps.currentLanguage,
					nextProps.currentRegion);
			} else if (regionChanged) {
				this.props.fetchRandomBird(nextProps.currentLanguage, nextProps.currentRegion);
			} else {
				resp.genusBirds.forEach((bird, i) => {
					if (bird.scientificName === resp.actualBird.scientificName) {
						this.setState({correctIndex: i});
					}
				});
			}
		}
	}

	onClick(event: React.MouseEvent<HTMLLIElement>, index: number) {
		// const safeSearchTypeValue: string = event.currentTarget.value;

		if (this.props.response) {
			console.log('Clicked bird ' + this.props.response.genusBirds[index].scientificName);
		}

		if (this.state && this.state.clicked) {
			this.setState({
				clicked: false
			});
			this.props.fetchRandomBird(this.props.currentLanguage, this.props.currentRegion);
		} else {
			this.setState({
				clicked: true
			});
		}
	}

	correctAndClicked(index: number): string {
		const cls: string = 'list-group-item list-group-item-action';

		if (this.state && this.state.clicked) {
			if (this.state.correctIndex === index) {
				return cls + ' active';
			} else {
				return cls + ' disabled';
			}
		}

		return cls;
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
				<ul className="list-group">
					{response.genusBirds.map((b, i) =>
						<li onClick={(e) => this.onClick(e, i)} key={i} className={this.correctAndClicked(i)}>
							{b.name}
						</li>
					)}
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
