import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  /**
   * Gets an user from a given userId, throws exception if not found
   * @param userId the userId as a string
   * @returns the user obj as UserEntity
   */
  async getOneById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        roles: true,
        addresses: true,
        payments: true,
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

  /**
   * Gets an user from a given email, throws exception if not found
   * @param email the email as a string
   * @returns the user obj as UserEntity
   */
  async getOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        roles: true,
        addresses: true,
        payments: true,
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

  /**
   * Creates a new user and saves it to the database
   * @param userData the user data obj to save
   * @returns the created user with its database id
   */
  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async updateUser(userId: string, user: UpdateUserDto) {
    return await this.updateHelper(userId, user);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }

  /**
   * Updates the current refresh token column of user entities
   * @param refreshToken the new refresh token to update to old with
   * @param userId the id of the user to update
   * @returns the updated user obj
   */
  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.updateHelper(userId, {
      currentHashedRefreshToken,
    });
  }

  /**
   * Verifies an user's account by setting their isVerified flag to true
   * @param userId the id of the user to verify
   * @returns the updated user obj
   */
  async verify(userId: string) {
    return await this.updateHelper(userId, {
      authConfirmToken: undefined,
      isVerified: true,
    });
  }

  /**
   * Gets an user obj if the given refresh token matches the user's current one
   * @param refreshToken the refresh token to check if matches
   * @param userId the id of the user to check
   * @returns the user obj from the given id
   */
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
