export interface CharacterLocation {
  name: string;
  url: string;
}

export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Endpoints {
  character: string;
  location: string;
  episode: string;
}

export interface CharacterFilter {
  name?: string;
  type?: string;
  species?: string;
  status?: string;
  gender?: string;
  page?: number;
}

export interface LocationFilter
  extends Pick<CharacterFilter, "name" | "type" | "page"> {
  dimension?: string;
}

export interface EpisodeFilter extends Pick<CharacterFilter, "name" | "page"> {
  episode?: string;
}

export interface Character extends ResourceBase {
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface Location extends ResourceBase {
  type: string;
  dimension: string;
  residents: Character[];
}

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
  name: string;
  id: number;
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  status: number;
  statusMessage: string;
  data: T;
}

export interface Info<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: T;
}
