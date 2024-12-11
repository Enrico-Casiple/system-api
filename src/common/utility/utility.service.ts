import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoggersService } from '../log/log.service';

export type Hidden_Info = {
  user_account_id: string;
  user_id: string;
  email: string;
};

@Injectable()
export class UtilityService {
  constructor(
    private readonly loggersService: LoggersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (error) {
      this.loggersService.error(
        `UtilityService.hashPassword: ${error.message}`,
        error.stack,
        'UtilityService.hashPassword',
      );
      throw error;
    }
  }

  async verifyPassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, password);
    } catch (error) {
      this.loggersService.error(
        `UtilityService.verifyPassword: ${error.message}`,
        error.stack,
        'UtilityService.verifyPassword',
      );
      throw error;
    }
  }

  async generateAccessToken(user_info: Hidden_Info): Promise<string> {
    try {
      const { user_account_id, user_id, email } = user_info;
      const payload = {
        user_account_id,
        user_id,
        email,
      };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      });
      return token;
    } catch (error) {
      this.loggersService.error(
        `UtilityService.generateAccessToken: ${error.message}`,
        error.stack,
        'UtilityService.generateAccessToken',
      );
      throw new BadRequestException(
        `We have a problem in generate access token: ${error.message}`,
      );
    }
  }
  async generateRefreshToken(user_info: Hidden_Info): Promise<string> {
    try {
      const { user_account_id, user_id, email } = user_info;
      const payload = {
        user_account_id,
        user_id,
        email,
      };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      });
      return token;
    } catch (error) {
      this.loggersService.error(
        `UtilityService.generateRefreshToken: ${error.message}`,
        error.stack,
        'UtilityService.generateRefreshToken',
      );
      throw new BadRequestException(
        `We have a problem in generate refresh token: ${error.message}`,
      );
    }
  }
  async generateAccessTokenAndRefreshToken(user_info: Hidden_Info): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const { user_account_id, user_id, email } = user_info;
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken({ user_account_id, user_id, email }),
        this.generateRefreshToken({ user_account_id, user_id, email }),
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      this.loggersService.error(
        `UtilityService.generateAccessTokenAndRefreshToken: ${error.message}`,
        error.stack,
        'UtilityService.generateAccessTokenAndRefreshToken',
      );
      throw new BadRequestException(
        `We have a problem in generate access token and refresh token: ${error.message}`,
      );
    }
  }
  async verifyAccessToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      return payload;
    } catch (error) {
      this.loggersService.error(
        `UtilityService.verifyAccessToken: ${error.message}`,
        error.stack,
        'UtilityService.verifyAccessToken',
      );
      throw new BadRequestException(
        `We have a problem in verify access token: ${error.message}`,
      );
    }
  }
  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return payload;
    } catch (error) {
      this.loggersService.error(
        `UtilityService.verifyRefreshToken: ${error.message}`,
        error.stack,
        'UtilityService.verifyRefreshToken',
      );
      throw new BadRequestException(
        `We have a problem in verify refresh token: ${error.message}`,
      );
    }
  }
  async generateResetPasswordToken(user_info: Hidden_Info): Promise<string> {
    try {
      const { user_account_id, user_id, email } = user_info;
      const payload = {
        user_account_id,
        user_id,
        email,
      };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_RESET_PASSWORD_SECRET'),
        expiresIn: this.configService.get('JWT_RESET_PASSWORD_EXPIRES_IN'),
      });
      return token;
    } catch (error) {
      this.loggersService.error(
        `UtilityService.generateResetPasswordToken: ${error.message}`,
        error.stack,
        'UtilityService.generateResetPasswordToken',
      );
      throw new BadRequestException(
        `We have a problem in generate reset password token: ${error.message}`,
      );
    }
  }

  async verifyResetPasswordToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
      });
      return payload;
    } catch (error) {
      this.loggersService.error(
        `UtilityService.verifyResetPasswordToken: ${error.message}`,
        error.stack,
        'UtilityService.verifyResetPasswordToken',
      );
      throw new BadRequestException(
        `We have a problem in verify reset password token: ${error.message}`,
      );
    }
  }

  async notificationEmail(data: any) {
    try {
      await fetch(
        'https://prod-01.southeastasia.logic.azure.com:443/workflows/edd3ef2937dd496886452526d76e1ad8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5V0BkjEBJCfqcrm1oQ4nMqDFPsQnFgvPcm28EO5zsP8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: data,
          }),
        },
      ).then((response) => {
        return {
          response: {
            response: response,
            data: data,
          },
        };
      });
    } catch (error) {
      this.loggersService.error(
        `UtilityService.notificationEmail: ${error.message}`,
        error.stack,
        'UtilityService.notificationEmail',
      );
      throw new BadRequestException(
        `We have a problem in send notification email: ${error.message}`,
      );
    }
  }
}
