import { Module } from '@nestjs/common';
import { UserModuleController } from './user.controller';
import { UserModuleService } from './user.service';

@Module({
    controllers: [UserModuleController],
    providers: [UserModuleService],
})
export class UserModuleModule {}
