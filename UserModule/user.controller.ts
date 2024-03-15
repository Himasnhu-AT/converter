import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
  import { UserModuleService } from './user.service';
  
@Controller('user')
export class UserModuleController {
    constructor(private readonly controllerService: UserModuleService) {}
  @Get('/')
  async getAllUsers() {
    return await this.controllerService.getAllUsers();
  }

  @Get('/:id')
  async getUserById() {
    return await this.controllerService.getUserById();
  }

  @Post('/')
  async createUser() {
    return await this.controllerService.createUser();
  }

  @Put('/users/:id')
  async updateUserById() {
    return await this.controllerService.updateUserById();
  }

  @Delete('/:id')
  async deleteUserById() {
    return await this.controllerService.deleteUserById();
  }

}
