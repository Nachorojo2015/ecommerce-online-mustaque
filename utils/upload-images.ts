import cloudinary from "@/lib/cloudinary";

const FOLDER = "ecommerce-mustaqe";

export interface UploadedImage {
  url: string;
  publicId: string;
}

export async function uploadImages(images: File[]): Promise<UploadedImage[]> {
  return Promise.all(images.map(uploadImage));
}

async function uploadImage(image: File): Promise<UploadedImage> {
  const buffer = Buffer.from(await image.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: FOLDER },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    uploadStream.end(buffer);
  });
}
