const extractFileType = (file = "") => {
  return file.split("/")[0];
};

const mediaTypes = {
  IMAGE: "image",
  APPLICATION: "application",
};

const documentFileType = (image = [], doctype) => {
  let file;
  if (!!Array.isArray(image)) {
    file = image.find((data) => data.type === doctype);
  } else {
    file = image.type === doctype;
  }
  return file.file;
};

export { extractFileType, mediaTypes, documentFileType };
