import { Injectable } from '@nestjs/common';
    
    @Injectable()
    export class PostModuleService {
      getHello(): string {
        return 'Hello World!';
      }
    }
    