import {ErrorRequestHandler} from 'express'
import {ValidationError}  from 'yup';

interface ValidationErrors{
  [key: string]: string[];
}


const errorHandler: ErrorRequestHandler = (error, req, resp, next) => {
  if (error instanceof ValidationError){
    const errorsValidation : ValidationErrors = {};

    error.inner.forEach(err=>{
      console.log(err);
      errorsValidation[err.path] = err.errors

      return resp.status(500)
        .json({message:'Internal server error', errorsValidation});
    });
  }
  console.error(error);
  return resp.status(500).json({message:'Internal server error'});
};

export default errorHandler;
