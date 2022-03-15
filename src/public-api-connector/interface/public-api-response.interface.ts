import { SingleAPIResponse } from './single-api-response.interface';

export interface PublicApiResponse {
  count: number;
  entries: SingleAPIResponse[];
}
