import { api } from 'boot/axios';
import { useStore } from 'src/store';
import { NameType } from 'src/lib/struct/common';

interface RegionMap {
  [Name: string]: Array<StationInfo>;
}

interface RegionData {
  Map: RegionMap;
  NameList: string[];
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

// GetRegionData 獲取 region data，如果資料未載入過則會進行初始化
async function GetRegionData(): Promise<RegionData> {
  const $store = useStore();

  if (!$store.state.region.loaded) {
    const urlPath = '/railway/region';
    await api.get(urlPath).then((res) => {
      const data = res.data as RegionInfo[];
      if (data) {
        if (data.length > 0) {
          const nameList = [] as string[];
          const regionMap = {} as RegionMap;
          data.forEach((regionInfo) => {
            nameList.push(regionInfo.Name);
            regionMap[regionInfo.Name] = regionInfo.StationList;
          });
          $store.commit('region/setNameList', nameList);
          $store.commit('region/setMap', regionMap);
          $store.commit('region/setLoaded', true);
        }
      }
    });
  }

  return {
    Map: $store.state.region.map,
    NameList: $store.state.region.nameList,
  };
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

function GetStationNameByStationID(
  regionMap: RegionMap,
  stationID: string
): string {
  const rsInfo = FindRegionByStation(regionMap, stationID);
  if (rsInfo != null) {
    return rsInfo.Name.Zh_tw;
  }
  return '';
}

export {
  RegionInfo,
  RegionMap,
  RegionData,
  StationInfo,
  RStationInfo,
  GetRegionData,
  FindRegionByStation,
  GetStationNameByStationID,
};
