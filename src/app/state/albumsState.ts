import { BehaviorSubject } from 'rxjs';
import { Album, ArtistAlbumAnalysis } from '../types/data'; // Adjust the path according to your project structure

// Initialize BehaviorSubject with an empty array
const albumsSubject = new BehaviorSubject<Album[]>([]);
const artistAlbumAnalysisSubject = new BehaviorSubject<ArtistAlbumAnalysis[]>([]);

// Function to set the albums data
export function setAlbums(albums: Album[]) {
  albumsSubject.next(albums);
}

export function setArtistAlbumAnalysis(artistAlbumAnalysis: ArtistAlbumAnalysis[]) {
  artistAlbumAnalysisSubject.next(artistAlbumAnalysis);
}

// Function to get the current albums observable
export function getAlbumsObservable() {
  return albumsSubject.asObservable();
}

// Function to get the current albums value
export function getCurrentAlbums() {
  return albumsSubject.getValue();
}

// Function to get the current albums observable
export function getArtistAlbumAnalysisObservable() {
  return artistAlbumAnalysisSubject.asObservable();
}

// Function to get the current albums value
export function getCurrentArtistAlbumAnalysis() {
  return artistAlbumAnalysisSubject.getValue();
}