# Simple-s3

## `Description`

Simple-s3 is the simplified way to upload documents, files, images to AWS s3 without hassle. It abstracts the configuration layer for your, hence helps you focus strictly on coding.

```
npm i https://github.com/Akinolae/Simple-s3
```

```
yarn add https://github.com/Akinolae/Simple-s3
```

---

## sidebar_position: 2

# Usage

Documents are **groups of pages** connected through:

## `Upload`

Made to ease the register process by masking endpoints, helps to speed up coding process.

```jsx title="auth/index.ts"

import { s3Upload } from "Simple-s3"
try {
 const res = await s3Upload(file, configuration: object)
 return res
}
catch(e){
throw e
}

```

## `2FA Auth`

Made to ease the register process by masking endpoints, helps to speed up coding process.

```jsx title="index..js"
import { deleteS3Video } from "Simple-s3"
try {
 const res = await deleteS3Video(file, configuration: object)
 return res
}
catch(e){
throw e
}
```
