import { LatLongDto } from '../utils/dto/lat-long.dto';

export interface ApiCallStrategy {
  execute(data: any): Promise<any>;
}
export interface IPrimaryCountryStateDataAPI {
  getData(latLongDto: LatLongDto): Promise<any>;
}

export interface ISecondaryCountryStateDataAPI {
  getData(latLongDto: LatLongDto): Promise<any>;
}
