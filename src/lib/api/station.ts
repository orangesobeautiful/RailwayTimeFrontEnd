import { apiHead } from 'src/lib/global/env';
import { api } from 'boot/axios';

// 取得起訖站點時刻表 api
export async function GetStationODTimetable() {
  const apiURL = apiHead + '/railway/timetable/OD/1180/to/1170';
  console.log(apiURL);
  await api
    .get(apiURL)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
