import { AxiosResponse } from 'axios';
import { PublicAPIResponse } from '../interface/public-api-response.interface';
import { TransformedApi } from '../interface/transformed-api.interface';
import { SingleAPIResponse } from '../interface/single-api-response.interface';

const transformSingleApi = (singleApi: SingleAPIResponse): TransformedApi => ({
  title: singleApi.API,
  description: singleApi.Description,
  category: singleApi.Category,
  link: singleApi.Link,
  cors: singleApi.Cors === 'unknown' ? undefined : singleApi.Cors === 'yes',
});

export const responseTransformer = ({
  data: responseData,
}: AxiosResponse<PublicAPIResponse>): TransformedApi[] =>
  responseData.entries.map<TransformedApi>(transformSingleApi);
