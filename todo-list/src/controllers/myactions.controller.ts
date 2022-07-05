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

export class FileUploadController {
  @post('/show-body', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: '',
      },
    },
  })
  async showBody(
      @requestBody({
        description: 'multipart/form-data value.',
        required: true,
        content: {
          'multipart/form-data': {
            // Skip body parsing
            'x-parser': 'stream',
            schema: {type: 'object'},
          },
        },
      })
          request: Request,
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
}

