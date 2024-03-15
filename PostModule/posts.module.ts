import { Module } from '@nestjs/common';
import { PostModuleController } from './posts.controller';
import { PostModuleService } from './posts.service';

@Module({
    controllers: [PostModuleController],
    providers: [PostModuleService],
})
export class PostModuleModule {}
