import { extractFileType, mediaTypes } from "./utils/fileUtils";
import S3 from "./lib/aws-sdk";

//gets the aws config according to the file type
// the file type is a key determinant of where each media/experience gets stored on AWS
// file type can either be 'video/image'

const awsConfig = (fileType, configuration = {}) => {
  const { dirName } = configuration;
  let config = {
    s3Url: configuration?.s3Url,
    region: configuration?.region,
    accessKeyId: configuration?.accessKeyId,
    bucketName: configuration?.bucketName,
    secretAccessKey: configuration?.secretAccessKey,
  };

  switch (extractFileType(fileType)) {
    case mediaTypes.APPLICATION:
      config.dirName = !!dirName ? dirName : "docs";
      break;
    case mediaTypes.IMAGE:
      config.dirName = !!dirName ? dirName : "media";
      break;
    default:
      break;
  }

  const client = new S3(config);
  return client;
};

// fetch data object from URI
const fetchDataBlob = async (uri) => {
  const resp = await fetch(uri);
  return resp.blob();
};

const s3Upload = async (params = {}) => {
  const { file, configuration } = params;

  // This implementation is for instances where we'll have to integrate AWS-S3 into mobile apps
  // mobile apps return uri intead of the file object
  // Hence the need to extract data object from the uri provided before processing upload
  // This is made to be backward compatible and cut the cost and time spent on integration.

  const data = file;
  // process.env.appType === "web" ?

  //  : await fetchDataBlob(file.uri);

  const client = awsConfig(data.type, configuration);
  try {
    const response = await client.uploadFile(file);
    const { Location } = response;
    return Location;
  } catch (error) {
    throw error;
  }
};

const deleteS3Video = async (fileName, { type, config }) => {
  const aws = awsConfig(type, config);
  try {
    const response = await aws.deleteFile(fileName, bucketName);
    const { message } = response;
    return message;
  } catch (error) {
    throw error;
  }
};

export { deleteS3Video, s3Upload };
