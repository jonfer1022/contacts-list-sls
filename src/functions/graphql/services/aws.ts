import * as dotenv from "dotenv";
import * as AWS from "aws-sdk";

dotenv.config();

const credentials = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS,
  signatureVersion: "v4",
};

AWS.config.update({ credentials, region: process.env.REGION });

const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS,
  region: process.env.AWS_REGION,
});

export async function signedS3ToPut(contentType: string, key: string) {
  const presignedPUTURL = s3.getSignedUrl("putObject", {
    Bucket: BUCKET_NAME,
    ContentType: contentType,
    Key: key,
    Expires: 300, //time to expire in seconds
    ACL: "",
  });
  return presignedPUTURL;
}

// export async function signedS3ToGet(key: string, root: string) {
export async function signedS3ToGet(filename: string) {
  const presignedPUTURL = s3.getSignedUrl("getObject", {
    Bucket: BUCKET_NAME,
    Key: filename + ".pdf",
    Expires: 300, //time to expire in seconds
  });
  return presignedPUTURL;
}

export async function getListObjects() {
  return await s3
    .listObjects({
      Bucket: BUCKET_NAME,
      MaxKeys: 100,
    })
    .promise();
}

export async function getObject(filename: string) {
  return await s3
    .getObject({
      Bucket: BUCKET_NAME,
      Key: filename + ".pdf",
    })
    .promise();
}

export async function deleteFileS3(files: { Key: string }[]) {
  const params = {
    Bucket: BUCKET_NAME,
    Delete: {
      Objects: files,
    },
  };
  await s3
    .deleteObjects(params, (err, data) => {
      if (err) return err;
      else return data;
    })
    .promise();
}
