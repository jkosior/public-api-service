import { TransformedApiModel } from '../../models/public-api.model';

export const bulkWriteMapper = (data: Partial<TransformedApiModel>[]) =>
  data.map((el) => ({
    updateOne: {
      filter: { title: el.title },
      update: el,
      upsert: true,
    },
  }));
