import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './img',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
};
