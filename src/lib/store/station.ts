import { StationInfo } from 'src/lib/struct/station';

// searchHistoryInfo 搜尋的歷史紀錄結構
interface searchHistoryInfo {
  StartRegion: string; // 起始站地區
  StartStation: StationInfo; // 起始站
  DstRegion: string; // 目的站區域
  DstStation: StationInfo; // 目的站
}

// 解析字串型態的搜尋紀錄
function decodeSearchHistory(orgStr: string): searchHistoryInfo[] {
  return JSON.parse(orgStr) as Array<searchHistoryInfo>;
}

// 編碼搜尋紀錄
function encodeSearchHistory(v: searchHistoryInfo[]): string {
  return JSON.stringify(v);
}

function readSearchHistory(): searchHistoryInfo[] {
  const searchHistoryKey = 's-h';
  const searchHistoryStr = localStorage.getItem(searchHistoryKey);
  let res: searchHistoryInfo[] = [];
  if (searchHistoryStr != null) {
    res = decodeSearchHistory(searchHistoryStr);
  }

  return res;
}

function UpdateSearchHistory(
  startRegion: string,
  startStation: StationInfo,
  dstRegion: string,
  dstStation: StationInfo
) {
  const searchHistoryKey = 's-h';
  const maxStoreNum = 10;

  let res: searchHistoryInfo[] = readSearchHistory();
  const newSHInfo: searchHistoryInfo = {
    StartRegion: startRegion,
    DstRegion: dstRegion,
    StartStation: startStation,
    DstStation: dstStation,
  };
  if (res.length > 0) {
    // 尋找過往紀錄有沒有相同的
    let findIdx = -1;
    res.forEach((shInfo, idx) => {
      if (
        shInfo.StartStation.StationID == startStation.StationID &&
        shInfo.DstStation.StationID == dstStation.StationID
      ) {
        findIdx = idx;
      }
    });

    if (findIdx >= 0) {
      res.splice(findIdx, 1);
      res = [newSHInfo].concat(res);
    } else {
      if (res.findIndex.length >= maxStoreNum) {
        res.pop();
      }
      res = [newSHInfo].concat(res);
    }
  } else {
    // 沒有儲存過任何資料時，建立一筆新資料
    res = [newSHInfo];
  }

  // 儲存紀錄
  localStorage.setItem(searchHistoryKey, encodeSearchHistory(res));
}

function GetLastSearchHistory(): searchHistoryInfo | null {
  const shList = readSearchHistory();
  if (shList.length > 0) {
    return shList[0];
  }
  return null;
}

export { UpdateSearchHistory, GetLastSearchHistory };
