import express from 'express';
import { env } from './env';
import { router as upload } from './routers/upload.routes';

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(upload);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
