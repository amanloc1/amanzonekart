import express from 'express';
import multer from 'multer';
// import path from 'path';
// import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
// import config from '../config';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), (req, res, next) => {

  try {
    console.log("File Uploaded Succeessfully");
    console.log(req.file.originalname);
    res.send(`/${req.file.originalname}`);
    // return res.status(201).send(__filename);
  }
  catch (error) {
    console.error(error);
  }

});

// aws.config.update({
//   accessKeyId: config.accessKeyId,
//   secretAccessKey: config.secretAccessKey,
// });
// const s3 = new aws.S3();
// const storageS3 = multerS3({
//   s3,
//   bucket: 'amazona-bucket',
//   acl: 'public-read',
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const uploadS3 = multer({ storage: storageS3 });
// router.post('/s3', uploadS3.single('image'), (req, res) => {
//   res.send(req.file.location);
// });
export default router;
