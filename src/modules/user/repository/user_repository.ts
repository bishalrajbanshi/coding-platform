import prisma from "prisma/prisma";
import { Role } from "@prisma/client";
import UsetEntity from "../user_entity";

export interface UserCreate {
  name: string;
  phone?: string;
  profileImage?: string;
  email: string;
  password: string;
  role: Role;
}

class UserRepository {
  async createUser(userData: UserCreate) {
    const user = await prisma.user.create({
      data: { ...userData },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async updateUser(id: number, updateData: Partial<UserCreate>) {
    const user = await prisma.user.update({
      where: { id },
      data: { ...updateData },
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserRepository();
