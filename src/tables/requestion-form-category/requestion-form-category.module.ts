import { Module } from '@nestjs/common';
import { RequestionFormCategoryService } from './requestion-form-category.service';
import { RequestionFormCategoryResolver } from './requestion-form-category.resolver';

@Module({
  providers: [RequestionFormCategoryResolver, RequestionFormCategoryService],
})
export class RequestionFormCategoryModule {}
