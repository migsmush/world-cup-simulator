export interface Flag {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
}

export interface RankingItem {
  idTeam: string;
  rank: number;
  flag: Flag;
  name: string;
  totalPoints: number;
  active: boolean;
  previousRank: number;
  countryURL: string;
  countryCode: string;
}

export interface Tag {
  id: string;
  text: string;
}

export interface RankingData {
  rankingItem: RankingItem;
  previousPoints: number;
  lastUpdateDate: string;
  nextUpdateDate: string | null;
  tag: Tag;
}

export interface RankingOverviewResponse {
  rankings: RankingData[];
}
