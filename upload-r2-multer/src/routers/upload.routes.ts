import { Router } from 'express';
import multer from 'multer';
import { R2Storage } from '../lib/r2-storage';

const storage = new R2Storage();
const parse = multer({ storage });

const router = Router();

router.post('/upload', parse.single('file'), (req, res) => {
  try {
    res.status(200).json({ path: req.file?.path });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router };
