import { RegionMap } from 'src/lib/struct/station';

export interface RegionState {
  nameList: string[];
  map: RegionMap;
}

function state(): RegionState {
  return {
    nameList: [],
    map: {},
  };
}

export default state;
