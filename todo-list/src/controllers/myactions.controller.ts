// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';

import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
    response,
    Request,
    Response,
    RestBindings
} from '@loopback/rest';

import {authenticate} from '@loopback/authentication';
import bodyParser = require("body-parser");
import multer from 'multer';

export class Test {
  @post('/file/upload', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {type: 'string'},
                lastname: {type: 'string'},
                age: {type: 'number'}
              }
            },
          },
        },
        description: '',
      },
    },
  })

  async showBody(@requestBody.file() request: Request,
      @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Object> {
    const storage = multer.memoryStorage();
    const upload = multer({storage});
    return new Promise<object>((resolve, reject) => {
      upload.any()(request, response, err => {
        if (err) return reject(err);
        resolve({
          files: request.files,
          fields: (request as any).fields,
        });
      });
    });
  }

  @post('/multipart', {

    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object'
            },
          },
        },
        description: '',
      },
    },
  })
  async multipart(@requestBody.file() request: Request,
                 @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Object> {
    const storage = multer.memoryStorage();
    const upload = multer({storage});
    return new Promise<object>((resolve, reject) => {
      upload.any()(request, response, err => {
        if (err) return reject(err);
        console.log(request.body.name)
        console.log(request.body.lastname)
        console.log(request.body.age)
        console.log(request.files)
        const data: any = {}
        Object.keys(request.body).forEach(key => {data[key] = request.body[key]})
        console.log('data:', data)
        resolve({
          files: request.files,
          //fields: (request as any).fields
          data
        });
      });
    });
  }
}

