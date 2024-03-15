import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
  import { PostModuleService } from './posts.service';
  
@Controller('posts')
export class PostModuleController {
    constructor(private readonly controllerService: PostModuleService) {}
  @Get('/')
  async getAllPosts() {
    return await this.controllerService.getAllPosts();
  }

  @Get('/:id')
  async getPostById() {
    return await this.controllerService.getPostById();
  }

  @Post('/')
  async createPost() {
    return await this.controllerService.createPost();
  }

  @Put('/:id')
  async updatePostById() {
    return await this.controllerService.updatePostById();
  }

  @Delete('/:id')
  async deletePostById() {
    return await this.controllerService.deletePostById();
  }

}
