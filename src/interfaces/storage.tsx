import { PodcastEpisodeList } from './podcastInformation';
import { Entry } from './podcastList';

export interface SelectedPodcast {
    data: Entry;
    fetched: number;
}

export interface EpisodeList {
    data: Array<PodcastEpisodeList>;
    fetched: number;
}
