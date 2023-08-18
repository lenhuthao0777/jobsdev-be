import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export interface TResponse<T> {
  status: number;
  data?: T;
  message: string;
}
