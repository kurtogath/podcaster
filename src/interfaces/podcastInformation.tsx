export interface PodcastInformation {
    artistName: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    artworkUrl600: string;
    collectionCensoredName: string;
    collectionExplicitness: string;
    collectionHdPrice: number;
    collectionId: number;
    collectionName: string;
    collectionPrice: number;
    collectionViewUrl: string;
    contentAdvisoryRating: string;
    country: string;
    currency: string;
    feedUrl: string;
    genreIds: Array<string>;
    genres: Array<string>;
    kind: string;
    primaryGenreName: string;
    releaseDate: string;
    trackCensoredName: string;
    trackCount: number;
    trackExplicitness: string;
    trackId: number;
    trackName: string;
    trackPrice: number;
    trackTimeMillis: number;
    trackViewUrl: string;
    wrapperType: string;
}

export interface PodcastEpisodeList {
    artistIds: Array<number>;
    artworkUrl60: string;
    artworkUrl160: string;
    artworkUrl600: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    collectionViewUrl: string;
    contentAdvisoryRating: string;
    country: string;
    description: string;
    episodeContentType: string;
    episodeFileExtension: string;
    episodeGuid: string;
    episodeUrl: string;
    feedUrl: string;
    genres: Array<Generes>;
    kind: string;
    previewUrl: string;
    releaseDate: string;
    shortDescription: string;
    trackId: number;
    trackName: string;
    trackTimeMillis: number;
    trackViewUrl: string;
    wrapperType: string;
}

interface Generes {
    id: string;
    name: string;
}
