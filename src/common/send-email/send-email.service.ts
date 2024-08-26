import { BadRequestException, Injectable } from '@nestjs/common';
import { LoggersService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

type EmailOptions = {
  from?: string;
  to: string;
  subject: string;
  reply_to?: string;
  token?: string;
  type: string;
};

@Injectable()
export class SendEmailService {
  constructor(
    private readonly loggersService: LoggersService,
    private readonly configService: ConfigService,
  ) {}

  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get<string>('EMAIL_SERVER_HOST'),
    port: this.configService.get<number>('EMAIL_SERVER_PORT'),
    secure: false,
    auth: {
      user: this.configService.get<string>('EMAIL_SERVER_USER'),
      pass: this.configService.get<string>('EMAIL_SERVER_PASSWORD'),
    },
  } as SMTPTransport.Options);

  private async sendEmailVerification(options: EmailOptions) {
    const theMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
        }
        .content {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .button-container {
          text-align: center;
          margin-top: 20px;
        }
        .verify-button {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
          display: inline-block;
        }
        .verify-button:hover {
          background-color: #0056b3;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${this.configService.get<string>('COMPANY_LOGO')}" alt="${this.configService.get<string>('COMPANY_NAME')}">
        </div>
        <div class="content">
          <p>Dear ${options.to.split('@')[0]},</p>
          <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
        </div>
        <div class="button-container">
          <a href="${this.configService.get<string>('BASE_URL')}/email-verify?token=${options.token}" class="verify-button">Verify Email</a>
        </div>
        <div class="content">
          <p>If you did not create an account, please ignore this email.</p>
          <p>Best regards,</p>
          <p>The ${this.configService.get<string>('COMPANY_NAME')}</p>
        </div>
        <div class="footer">
          <p>&copy; 2019 ${this.configService.get<string>('COMPANY_NAME')}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
`;
    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: theMessage,
      replyTo: options.reply_to || this.configService.get<string>('REPLY_TO'),
      token: options.token,
      type: options.type,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.loggersService.error(
        `SendEmailService.sendEmailVerification: ${error.message}`,
      );
      throw new BadRequestException(
        `SendEmailService.sendEmailVerification: ${error}`,
      );
    }
  }

  private async sendChangePassword(options: EmailOptions) {
    const theMessage = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Change Password Request</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7f8fa;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 120px;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
          }
          .content p {
            margin-bottom: 20px;
          }
          .button-container {
            text-align: center;
            margin-top: 30px;
          }
          .change-button {
            background-color: #007bff;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            display: inline-block;
          }
          .change-button:hover {
            background-color: #0056b3;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${this.configService.get<string>('COMPANY_LOGO')}" alt="${this.configService.get<string>('COMPANY_NAME')}">
          </div>
          <div class="content">
            <p>Hello ${options.to.split('@')[0]},</p>
            <p>We received a request to change your password. If you made this request, please click the button below to set a new password:</p>
          </div>
          <div class="button-container">
            <a href="${this.configService.get<string>('BASE_URL')}/change-password?token=${options.token}" class="change-button">Change Password</a>
          </div>
          <div class="content">
            <p>If you did not request to change your password, please ignore this email or contact support if you have any concerns.</p>
            <p>Thank you,</p>
            <p>${this.configService.get<string>('COMPANY_NAME')}</p>
          </div>
          <div class="footer">
            <p>&copy; 2019 ${this.configService.get<string>('COMPANY_NAME')}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>

    `;
    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: theMessage,
      replyTo: options.reply_to || this.configService.get<string>('REPLY_TO'),
      token: options.token,
      type: options.type,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.loggersService.error(
        `SendEmailService.sendChangePassword: ${error.message}`,
      );
      throw new BadRequestException(
        `SendEmailService.sendChangePassword: ${error}`,
      );
    }
  }

  private async sendOTP(options: EmailOptions) {
    const generateOTP = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let otp = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
      }
      return otp;
    };

    const theMessage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333333;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 100px;
          }
          .content {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
          }
          .content p {
            margin-bottom: 20px;
          }
          .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            background-color: #f1f1f1;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${this.configService.get<string>('COMPANY_LOGO')}" alt="${this.configService.get<string>('COMPANY_NAME')}">
          </div>
          <div class="content">
            <p>Hello ${options.to.split('@')[0]},</p>
            <p>Your one-time password (OTP) for completing your transaction is:</p>
            <div class="otp-code">${generateOTP(6)}</div>
            <p>This OTP is valid for ${5} minutes. Please do not share this code with anyone.</p>
          </div>
          <div class="content">
            <p>If you did not request this code, please ignore this email or contact support immediately.</p>
            <p>Thank you,</p>
            <p>${this.configService.get<string>('COMPANY_NAME')}</p>
          </div>
          <div class="footer">
            <p>&copy; 2019 ${this.configService.get<string>('COMPANY_NAME')}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: theMessage,
      replyTo: options.reply_to || this.configService.get<string>('REPLY_TO'),
      token: options.token,
      type: options.type,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.loggersService.error(`SendEmailService.sendOTP: ${error.message}`);
      throw new BadRequestException(`SendEmailService.sendOTP: ${error}`);
    }
  }

  async sendEmail(options: EmailOptions) {
    const sendEmailByType = (type: string) => {
      switch (type) {
        case 'email-verify':
          return this.sendEmailVerification(options);
        case 'change-password':
          return this.sendChangePassword(options);
        case 'OTP':
          return this.sendOTP(options);
        default:
          this.loggersService.error(`Invalid email type: ${type}`);
          throw new BadRequestException(`Invalid email type: ${type}`);
      }
    };
    try {
      this.loggersService.log(`Sending email to ${options.to}`);
      return await sendEmailByType(options.type);
    } catch (error) {
      this.loggersService.error(`SendEmailService.sendEmail: ${error.message}`);
      throw new BadRequestException(`SendEmailService.sendEmail: ${error}`);
    }
  }
}
