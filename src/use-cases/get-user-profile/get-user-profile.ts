import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/resouce-not-found";
import { UsersRepository } from "../../repositories/user-repository-types";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}