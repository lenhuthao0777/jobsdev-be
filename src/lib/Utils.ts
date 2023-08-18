import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/types/globals.type';
import { createReadStream } from 'streamifier';

export const UploadFile = (file: any): Promise<CloudinaryResponse> => {
  return new Promise<CloudinaryResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    createReadStream(file.buffer).pipe(uploadStream);
  });
};

export const RemoveFile = async (flileName: string) => {
  try {
    await cloudinary.uploader.destroy(flileName);
  } catch (error) {
    return error;
  }
};
