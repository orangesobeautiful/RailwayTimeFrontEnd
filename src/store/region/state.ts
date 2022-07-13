import { RegionMap } from 'src/lib/struct/station';

export interface RegionState {
  loaded: boolean;
  nameList: string[];
  map: RegionMap;
}

function state(): RegionState {
  return {
    loaded: false,
    nameList: [],
    map: {},
  };
}

export default state;
