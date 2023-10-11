import { User } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { CreateUserDTO } from '../../dtos/CreateUserDTOs';
import { AppError } from '../../../../errors/AppError';

export class CreateUserUseCase {
  async execute({ name, email }: CreateUserDTO): Promise<User> {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      throw new AppError('User already exists!', 400);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}
