import { Schema, Document } from 'mongoose';
import { TransformedApi } from '../public-api-connector/interface/transformed-api.interface';

export interface TransformedApiModel extends TransformedApi, Document {}

export const PUBLIC_API = 'public_api';

export const PublicApiSchema = new Schema<TransformedApiModel>(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cors: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const PublicApiSchemaFactory = () => {
  const schema = PublicApiSchema;
  /**
   * Place for all pre / post scripts
   */
  return schema;
};
