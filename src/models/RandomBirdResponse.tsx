import { Bird } from './Bird';
import { Media } from './Media';

export interface RandomBirdResponse {
	media: Media;
	actualBird: Bird;
	genusBirds: Bird[];
}
