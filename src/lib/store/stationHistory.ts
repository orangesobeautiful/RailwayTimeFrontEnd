import { StationInfo } from 'src/lib/struct/station';

const searchHistoryKey = 's-h';
const favSearchKey = 'f-s';

const FavMaxStoreNum = 20;

// SearchInfo 搜尋的搜尋紀錄結構
interface SearchInfo {
  SSID: string; // 起始站的 ID
  DSID: string; // 目的站的 ID
}

// DetailSearchInfo 較詳細記錄資訊的搜尋紀錄
interface DetailSearchInfo {
  StartRegion: string; // 起始站地區
  StartStation: StationInfo; // 起始站
  DstRegion: string; // 目的站區域
  DstStation: StationInfo; // 目的站
}

//isSIEqual 判斷兩個 SearchInfo 是否相同
function isSIEqual(a: SearchInfo, b: SearchInfo): boolean {
  if (
    (a.SSID == b.SSID && a.DSID == b.DSID) ||
    (a.SSID == b.DSID && a.DSID == b.SSID)
  ) {
    return true;
  }
  return false;
}

// 解析字串型態的搜尋紀錄
function decodeSearchInfoList(orgStr: string): SearchInfo[] {
  return JSON.parse(orgStr) as Array<SearchInfo>;
}

// 編碼搜尋紀錄
function encodeSearchInfoList(v: SearchInfo[]): string {
  return JSON.stringify(v);
}

function readSearchHistory(): SearchInfo[] {
  const searchHistoryStr = localStorage.getItem(searchHistoryKey);
  let res: SearchInfo[] = [];
  if (searchHistoryStr != null) {
    res = decodeSearchInfoList(searchHistoryStr);
  }

  return res;
}

function UpdateSearchHistory(ssid: string, dsid: string) {
  const maxStoreNum = 10;

  let res: SearchInfo[] = readSearchHistory();
  const newSHInfo: SearchInfo = {
    SSID: ssid,
    DSID: dsid,
  };
  if (res.length > 0) {
    // 尋找過往紀錄有沒有相同的
    let findIdx = -1;
    res.forEach((sInfo, idx) => {
      if (isSIEqual(sInfo, newSHInfo)) {
        findIdx = idx;
      }
    });

    if (findIdx >= 0) {
      res.splice(findIdx, 1);
      res = [newSHInfo].concat(res);
    } else {
      if (res.length >= maxStoreNum) {
        res.pop();
      }
      res = [newSHInfo].concat(res);
    }
  } else {
    // 沒有儲存過任何資料時，建立一筆新資料
    res = [newSHInfo];
  }

  // 儲存紀錄
  localStorage.setItem(searchHistoryKey, encodeSearchInfoList(res));
}

function GetLastSearchHistory(): SearchInfo | null {
  const shList = readSearchHistory();
  if (shList.length > 0) {
    return shList[0];
  }
  return null;
}

// 讀取 favorite list
function GetFavList(): SearchInfo[] {
  const favSearchStr = localStorage.getItem(favSearchKey);
  let res: SearchInfo[] = [];
  if (favSearchStr != null) {
    res = decodeSearchInfoList(favSearchStr);
  }

  return res;
}

// FindFavIdx 查詢 search info 在 favorite list 中的 index
function FindFavIdx(fav: SearchInfo): number {
  const favList: SearchInfo[] = GetFavList();
  return findFavIdxWithExistList(fav, favList);
}

// FindFavIdx 查詢 search info 在 favorite list 中的 index
function findFavIdxWithExistList(
  fav: SearchInfo,
  favList: SearchInfo[]
): number {
  // 尋找過往紀錄有沒有相同的
  let findIdx = -1;
  for (let i = 0; i < favList.length; i++) {
    const sInfo = favList[i];
    if (isSIEqual(sInfo, fav)) {
      findIdx = i;
      break;
    }
  }

  return findIdx;
}

// 新增一筆 favorite，如果重複或超過最大值則會回傳 false
function AddFavSearchInfo(newFav: SearchInfo): boolean {
  let res: SearchInfo[] = GetFavList();

  // 數量小於 FavMaxStoreNum 才允許新增
  if (res.length < FavMaxStoreNum) {
    // 尋找過往紀錄有沒有相同的
    const findIdx = findFavIdxWithExistList(newFav, res);

    // 忽略重複的 favorite
    if (findIdx < 0) {
      res = res.concat(newFav);
    } else {
      return false;
    }
  } else {
    return false;
  }

  // 儲存紀錄
  localStorage.setItem(favSearchKey, encodeSearchInfoList(res));
  return true;
}

// 刪除 favorite 中指定 index 的 search info
function DelFavSearchInfoByIdx(idx: number): boolean {
  const res: SearchInfo[] = GetFavList();

  if (0 <= idx && idx < res.length) {
    res.splice(idx, 1);
  } else {
    return false;
  }

  // 儲存紀錄
  localStorage.setItem(favSearchKey, encodeSearchInfoList(res));
  return true;
}

// 刪除 favorite 中指定的 search info
function DelFavSearchInfoByInfo(sInfo: SearchInfo): boolean {
  const idx = FindFavIdx(sInfo);
  if (idx >= 0) {
    return DelFavSearchInfoByIdx(idx);
  }
  return false;
}

export {
  SearchInfo,
  DetailSearchInfo,
  UpdateSearchHistory,
  GetLastSearchHistory,
  FavMaxStoreNum,
  GetFavList,
  FindFavIdx,
  AddFavSearchInfo,
  DelFavSearchInfoByIdx,
  DelFavSearchInfoByInfo,
};
