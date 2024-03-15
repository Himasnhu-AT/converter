import { Injectable } from '@nestjs/common';
  
@Injectable()
export class PostModuleService {
    constructor(private readonly prisma: PrismaService) {}

async getAllPosts() {
  try {
    return await this.prisma.Post.findMany({
            
          })
  } catch(e) {
    console.error(`Failed getAllPosts Server Error 500:`);
    console.error(e);
  }
}

async getPostById() {
  try {
    return await this.prisma.Post.findUnique({
            
          })
  } catch(e) {
    console.error(`Failed getPostById Server Error 500:`);
    console.error(e);
  }
}

async createPost() {
  try {
    
  } catch(e) {
    console.error(`Failed createPost Server Error 500:`);
    console.error(e);
  }
}

async updatePostById() {
  try {
    return await this.prisma.Post.update({
            
          })
  } catch(e) {
    console.error(`Failed updatePostById Server Error 500:`);
    console.error(e);
  }
}

async deletePostById() {
  try {
    return await this.prisma.Post.delete({
            
          })
  } catch(e) {
    console.error(`Failed deletePostById Server Error 500:`);
    console.error(e);
  }
}
}
