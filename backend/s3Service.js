import S3 from "aws-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3upload = async (file) => {
  const s3client = new S3Client();

  file.originalname = file.originalname.replace(/ /g, "_");

  const key = `uploads/${Date.now()}-${file.originalname}`;

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
  };

  const data = await s3client.send(new PutObjectCommand(param));

  return key;
};
