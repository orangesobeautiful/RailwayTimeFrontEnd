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

interface RStationInfo extends StationInfo {
  RegionName: string;
}

// FindRegionByStation 根據 station id 找到 region 名稱
function FindRegionByStation(
  regionMap: RegionMap,
  stationID: string
): RStationInfo | null {
  for (const [regionName, stationList] of Object.entries(regionMap)) {
    for (let i = 0; i < stationList.length; i++) {
      if (stationList[i].StationID == stationID) {
        return {
          RegionName: regionName,
          Name: stationList[i].Name,
          StationID: stationList[i].StationID,
        };
      }
    }
  }
  return null;
}

export { RegionInfo, RegionMap, StationInfo, FindRegionByStation };
