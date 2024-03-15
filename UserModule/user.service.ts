import { Injectable } from "@nestjs/common";

@Injectable()
export class UserModuleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    try {
      return await this.prisma.User.findMany({
        select: ["id", "name", "email"],
        include: ["posts"],
      });
    } catch (e) {
      console.error(`Failed getAllUsers Server Error 500:`);
      console.error(e);
    }
  }

  async getUserById() {
    try {
      return await this.prisma.User.findUnique({});
    } catch (e) {
      console.error(`Failed getUserById Server Error 500:`);
      console.error(e);
    }
  }

  async createUser() {
    try {
    } catch (e) {
      console.error(`Failed createUser Server Error 500:`);
      console.error(e);
    }
  }

  async updateUserById() {
    try {
      return await this.prisma.User.update({});
    } catch (e) {
      console.error(`Failed updateUserById Server Error 500:`);
      console.error(e);
    }
  }

  async deleteUserById() {
    try {
      return await this.prisma.User.delete({});
    } catch (e) {
      console.error(`Failed deleteUserById Server Error 500:`);
      console.error(e);
    }
  }
}
