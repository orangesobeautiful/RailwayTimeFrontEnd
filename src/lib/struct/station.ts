import { NameType } from 'src/lib/struct/common';

interface RegionMap {
  [Name: string]: Array<StationInfo>;
}

interface RegionInfo {
  Name: string;
  StationList: Array<StationInfo>;
}

interface StationInfo {
  Name: NameType;
  StationID: string;
}

export { RegionInfo, RegionMap, StationInfo };
