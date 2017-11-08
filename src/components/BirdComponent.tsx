import * as React from 'react';
import { RandomBirdResponse } from '../models/RandomBirdResponse';
import { connect } from 'react-redux';
import { MediaComponent } from './MediaComponent';

export interface BirdComponentProps {
	response: RandomBirdResponse;
	isLoading: boolean;
}

class BirdComponent extends React.Component<BirdComponentProps, object> {
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

// <app-audio *ngIf="response.media.mediaType == 'AUDIO'" url="{{response.media.url}}"></app-audio>
// {/*<ul>*/}
// {/*<li id="{{g.scientificName}}"*/}
// (click)="onSelect(g)"
// [ngClass] = "{'correct': isCorrectAndClicked(g)}"
// *ngFor="let g of response.genusBirds">{{g.name}}</li>
// </ul>

function mapStateToProps(state: any) {
	return {
		isLoading: state.randomBirdResponse.isLoading,
		response: state.randomBirdResponse.response
	};
}

export default connect(mapStateToProps)(BirdComponent);

// helpers
