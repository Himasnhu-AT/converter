import { Module } from '@nestjs/common';
    import { PostModuleController } from './postmodule.controller';
    import { PostModuleService } from './postmodule.service';
    
    @Module({
      imports: [],
      controllers: [PostModuleController],
      providers: [PostModuleService],
    })
    export class PostModuleModule {}
    