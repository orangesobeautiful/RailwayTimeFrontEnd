import { NameType } from 'src/lib/struct/common';

interface TrainInfo {
  Direction: number; // 列車行駛方向
  StartingStatioinName: NameType;
  EndStatioinName: NameType;
  TrainNo: string;
  TrainTypeName: NameType;
  TripHeadSign: string;
  Note: string;
}

interface stationStopTime {
  ArrivalTime: string;
  DepartureTime: string;
  StationID: string;
  StationName: NameType;
}

// TrainTimeInfoJson 列車時刻的結構
interface TrainTimeInfo {
  TrainInfo: TrainInfo;
  DelayMinute: number;
  OriginStationStopTime: stationStopTime;
  DestinationStationStopTime: stationStopTime;
}

//class TrainTimeInfoCL implements TrainTimeInfo {}

export { TrainTimeInfo };
