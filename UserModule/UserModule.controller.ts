import { Controller } from '@nestjs/common';
    import { UserModuleService } from './usermodule.service';
    
    @Controller('user')
    export class UserModuleController {
      constructor(private readonly usermoduleService: UserModuleService) {}
    
      @Get()
      getHello(): string {
        return this.usermoduleService.getHello();
      }
    }
    