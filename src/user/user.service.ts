import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async getOneById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        roles: true,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getAuthConfirmToken(userId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.authConfirmToken')
      .where('user.id = :userId', { userId: userId })
      .getOne();
  }

  async getOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        roles: true,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.updateHelper(userId, {
      currentHashedRefreshToken,
    });
  }

  async verify(userId: string) {
    return await this.updateHelper(userId, {
      authConfirmToken: undefined,
      isVerified: true,
    });
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: any,
    userId: any,
  ): Promise<any> {
    const user = await this.getOneById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  /**
   * activates before update database trigger for typeorm so that updatedAt field can be set
   * @param userId the id of the user to update
   * @param updates the json object with fields of which are to be updated
   * @returns updated entity
   */
  private async updateHelper(userId: string, updates: {}) {
    const foundEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    return await this.userRepository.save(Object.assign(foundEntity, updates));
  }

  async removeRefreshToken(userId: string) {
    return this.updateHelper(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
