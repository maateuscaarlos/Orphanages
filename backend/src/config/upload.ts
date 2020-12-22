import { request } from 'express';
import multer from 'multer';
import path from 'path';

export default {
  storage:multer.diskStorage({
    destination:path.join(__dirname,'..','..','upload'),
    filename:(request, file, callback)=>{
      const filename = `${Date.now()}-${file.originalname.trim()}`;

      callback(null,filename);
    }
  })
}
