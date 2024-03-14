import { Controller } from '@nestjs/common';
    import { PostModuleService } from './postmodule.service';
    
    @Controller('posts')
    export class PostModuleController {
      constructor(private readonly postmoduleService: PostModuleService) {}
    
      @Get()
      getHello(): string {
        return this.postmoduleService.getHello();
      }
    }
    