import { NameType } from 'src/lib/struct/common';

interface trainInfo {
  Direction: number; // 列車行駛方向
  StartingStatioinName: NameType;
  EndStatioinName: NameType;
  TrainNo: string;
  TrainTypeName: NameType;
  TripHeadSign: string;
}

interface stationStopTime {
  ArrivalTime: string;
  DepartureTime: string;
  StationID: string;
  StationName: NameType;
}

// TrainTimeInfoJson 列車時刻的結構
interface TrainTimeInfo {
  trainInfo: trainInfo;
  DelayMinute: number;
  OriginStationStopTime: stationStopTime;
  DestinationStationStopTime: stationStopTime;
}

//class TrainTimeInfoCL implements TrainTimeInfo {}

export { TrainTimeInfo };
