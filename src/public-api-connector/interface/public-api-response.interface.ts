import { SingleAPIResponse } from './single-api-response.interface';

export interface PublicAPIResponse {
  count: number;
  entries: SingleAPIResponse[];
}
