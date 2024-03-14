import { Module } from '@nestjs/common';
    import { UserModuleController } from './usermodule.controller';
    import { UserModuleService } from './usermodule.service';
    
    @Module({
      imports: [],
      controllers: [UserModuleController],
      providers: [UserModuleService],
    })
    export class UserModuleModule {}
    