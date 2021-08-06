/* eslint-disable object-shorthand */
import express from 'express';
import multer from 'multer';
import s3Storage from 'multer-sharp-s3';
import dotenv from 'dotenv';
import S3 from 'aws-sdk/clients/s3.js';
import asyncHandler from 'express-async-handler';
import { getFileStream } from '../s3.js';
import Product from '../models/productModel.js';

const router = express.Router();

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const storage = s3Storage({
  s3,
  Bucket: bucketName,
  ACL: 'private',
  resize: {
    width: 640,
    height: 510,
  },
});
const upload = multer({ storage: storage });

router
  .route('/:id')
  .post(
    upload.single('image'),
    asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      const { file } = req;
      if (file && product) {
        product.image = file.Key;
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
        // res.send(`received!, result: ${product}`);
      } else {
        res.status(409);
        throw new Error('Uploading failed');
      }

      console.log(req.file); // Print upload details
      res.send('Successfully uploaded!');
    })
  )
  .get(
    asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      const { image: key } = product;

      if (key) {
        const readStream = getFileStream(key);

        readStream.pipe(res);
      } else {
        res.status(400);
        throw new Error('image does not exist');
      }
    })
  );
// const unlinkFile = util.promisify(fs.unlink);

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   }
//   cb('JPG file only');
// }

// const upload = multer({
//   dest: 'uploads/',
//   // eslint-disable-next-line object-shorthand
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// router
//   .route('/:id')
//   .post(
//     protect,
//     upload.single('image'),
//     asyncHandler(async (req, res) => {
//       const product = await Product.findById(req.params.id);
//       const { file } = req;
//       console.log(file);
//       const result = await uploadFile(file);
//       await unlinkFile(file.path);
//   if (result && product) {
//     product.image = result.Key;
//     const updatedProduct = await product.save();
//     res.status(201).json(updatedProduct);
//     // res.send(`received!, result: ${product}`);
//   } else {
//     res.status(409);
//     throw new Error('Uploading failed');
//   }
//   console.log(req.user.id);
// })
//   )
// .get(
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     const { image: key } = product;

//     if (key) {
//       const readStream = getFileStream(key);

//       readStream.pipe(res);
//     } else {
//       res.status(400);
//       throw new Error('image does not exist');
//     }
//   })
// );

export default router;
