import AWS from "aws-sdk";
import { extractApiError } from "../utils/responseUtil";

class Aws {
  constructor(config) {
    this.config = config;

    console.log({ config }, "config");
  }

  // set up configuration,
  configure = () => {
    try {
      const { region, accessKeyId, secretAccessKey } = this.config;
      const Config = AWS.config.update({
        region,
        apiVersion: "latest",
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      return Config;
    } catch (error) {
      throw extractApiError(error);
    }
  };

  s3init = () => {
    const { bucketName } = this.config;
    const s3 = new AWS.S3({
      params: {
        bucketName: bucketName,
      },
    });

    return s3;
  };

  uploadFile = async (file) => {
    try {
      const { dirName, bucketName } = this.config;
      const key = `${!!dirName ? dirName + "/" : ""}${file.name}`;
      this.configure();

      const dt = await this.s3init()
        .upload({
          Body: file,
          Key: key,
          Bucket: bucketName,
        })
        .promise();
      return dt;
    } catch (error) {
      throw extractApiError(error);
    }
  };

  deleteFile = async (url, bucket) => {
    const { bucketName } = this.config;
    try {
      this.configure();
      const dt = await this.s3init()
        .deleteObject({
          Key: url.split(".com/")[1],
          Bucket: !!bucket ? bucket : bucketName,
        })
        .promise();
      return dt;
    } catch (error) {
      throw extractApiError(error);
    }
  };
}

export default Aws;
