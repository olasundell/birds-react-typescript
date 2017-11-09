import * as React from 'react';
import { Media } from '../models/Media';

export class MediaComponent extends React.Component<Media, object> {
	render() {
		const { mediaType, url } = this.props;

		if ('PHOTO' === mediaType) {
			return (<img src={url}/>);
		}

		// return (<h2>This is where the audio player goes</h2>);

		return (
			<div>
				<audio autoPlay={true}>
					<source src={url}/>
						Your browser does not support the audio element.
				</audio>
			</div>
	);
	}
}
