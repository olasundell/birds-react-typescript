import { Bird } from './Bird';
import { Media } from './Media';

export interface BirdResponse {
	media: Media;
	actualBird: Bird;
	genusBirds: Bird[];
}
