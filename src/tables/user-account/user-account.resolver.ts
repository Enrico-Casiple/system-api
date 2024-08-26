import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserAccountService } from './user-account.service';
import { UserAccount } from './entities/user-account.entity';
import {
  ChangePasswordInput,
  LoginUserAccountInput,
} from './dto/create-user-account.input';
import { Session } from '../session/entities/session.entity';
import { Public } from 'src/common/decorator/public/public.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/common/auth/guard/refresh-token/refresh-token.guard';
import { CurrentUserId } from 'src/common/decorator/current-user-id/current-user-id.decorator';
import { CurrentUserRefresh } from 'src/common/decorator/refresh-token/refresh-token.decorator';

@Resolver(() => UserAccount)
export class UserAccountResolver {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Query(() => UserAccount, { name: 'userAccount' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userAccountService.findOne(id);
  }

  @Mutation(() => Session)
  @Public()
  async login(
    @Args('loginUserAccountInput')
    loginUserAccountInput: LoginUserAccountInput,
  ) {
    return await this.userAccountService.login(loginUserAccountInput);
  }

  @Query(() => UserAccount)
  async verifyEmail(@Args('token') token: string) {
    return await this.userAccountService.verifyEmail(token);
  }

  @Query(() => String)
  async resetPassword(@Args('email') email: string) {
    return await this.userAccountService.resetPassword(email);
  }

  @Mutation(() => Session)
  @Public()
  @UseGuards(RefreshTokenGuard)
  refreshToken(@CurrentUserRefresh('refresh_token') refresh_token: string) {
    return this.userAccountService.refreshToken(refresh_token);
  }
  @Mutation(() => Session)
  async logout(@CurrentUserId('currentUserId') currentUserId: string) {
    return await this.userAccountService.logout(currentUserId);
  }

  @Mutation(() => UserAccount)
  async updateUserAccoutPassword(
    @Args('changePasswordInput')
    changePasswordInput: ChangePasswordInput,
    @Args('currentUserid') currentUserid: string,
  ) {
    return await this.userAccountService.updateUserAccoutPassword(
      changePasswordInput,
      currentUserid,
    );
  }

  @Mutation(() => UserAccount)
  async changePassword(
    @Args('changePasswordInput')
    changePasswordInput: ChangePasswordInput,
    @Args('currentUserid') currentUserid: string,
  ) {
    return await this.userAccountService.changePassword(
      changePasswordInput,
      currentUserid,
    );
  }
}
