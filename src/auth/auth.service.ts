import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RoleEntity } from './roles/role.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { Role } from './roles/role.enum';
import RegisterUserDto from 'src/user/dto/registerUser.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<RoleEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Gets all the roles assigned to an user based on a given user id
   * @param userId the id of the user
   * @returns roles assigned to the user as a list of string enums
   */
  async getRoles(userId: any) {
    const roles = await this.roleRepository.find({ where: { userId } });
    if (roles.length == 0) {
      throw new HttpException(
        'No Privileges Found: You must first verify your account',
        HttpStatus.NOT_FOUND,
      );
    }
    return roles.map((role) => role.role);
  }

  /**
   * Assigns a list of one or more roles to an user based on a given user id
   * @param userId the id of the user
   * @param roles the list of role enums to assign to the user
   */
  async setRoles(userId: any, roles: [Role]) {
    for (let i = 0, role = roles[i]; i < roles.length; i++) {
      const newRole = this.roleRepository.create({ userId, role: role });
      await this.roleRepository.save(newRole);
    }
  }

  /**
   * Registers new user accounts, generates 2fa codes, and sends confirmation emails
   * @param registrationData the user obj data to register
   * @returns the newly registered user obj with its database id
   */
  async register(registrationData: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const twoFACode = Math.floor(10000 + Math.random() * 90000);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
        authConfirmToken: twoFACode,
      });
      this.mailService
        .sendConfirmationEmail(createdUser, twoFACode)
        .catch((e) => console.log(e)); //catch async error
      return createdUser;
    } catch (error) {
      if ((error.errno = 1062)) {
        //mysql unique violation error code
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Verifies new user accounts by matching a given 2fa code with the database, sends verification success email
   * @param code the code to attempt to match
   * @param userId the id of the user to verify
   */
  async verifyAccount(code: number, userId: string): Promise<any> {
    try {
      const user = await this.userService.getOneById(userId);

      if (user.authConfirmToken != code) {
        throw new HttpException(
          'Verification code has expired or does not match!',
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.userService.verify(user.id);
      await this.mailService.sendConfirmedEmail(user);
      await this.setRoles(user.id, [Role.customer]);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Failed to verify user account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateNewCode(userId: string) {
    const twoFACode = Math.floor(10000 + Math.random() * 90000);
    const updatedUser = await this.userService.resetAuthToken(
      userId,
      twoFACode,
    );
    return await this.mailService.sendConfirmationEmail(updatedUser, twoFACode);
  }

  /**
   * Authenticates an user from given credentials and returns its user obj if successful
   * @param email the email credential of the user
   * @param hashedPassword the password credential of the user (hashed)
   * @returns the authenticated user object or throws exception
   */
  async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getOneByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.getPassword(),
      );
      if (!isPasswordMatching || !user.isActive) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Creates an access_token cookie signed with given username and userId
   * @param {number} userId - the given userId from database of request user
   * @return {string} - cookie as a string
   * @memberof AuthService
   */

  getCookieWithJwtAccessToken(userId: string): string {
    const payload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: Buffer.from(
        this.configService.get<string>('jwt.accessToken.secret'),
        'base64',
      ).toString(),
      expiresIn: `${this.configService.get<string>(
        'jwt.accessToken.expires',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/`;
  }
  /**
   * Creates a refresh_token cookie signed with a given username and userId
   * @param {number} userId the given userId from database of request user
   * @return {{cookie: string, refresh_token: string}} - an object with the refresh cookie as a string and the refresh_token *
   * @memberof AuthService
   */

  getCookieWithJwtRefreshToken(userId: string): {
    cookie: string;
    refresh_token: string;
  } {
    const payload = { userId };
    const refresh_token = this.jwtService.sign(payload, {
      secret: Buffer.from(
        this.configService.get<string>('jwt.refreshToken.secret'),
        'base64',
      ).toString(),
      expiresIn: `${this.configService.get<string>(
        'jwt.refreshToken.expires',
      )}s`,
    });

    const cookie = `Refresh=${refresh_token}; HttpOnly; Path=/api/auth/refresh`;
    return { cookie, refresh_token };
  }

  /**
   * Helper function for returning cookie strings used to replace/clear client's authentication cookies
   * @returns formatted cookie strings for logout
   */
  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/',
      'Refresh=; HttpOnly; Path=/api/auth/refresh',
    ];
  }
}
