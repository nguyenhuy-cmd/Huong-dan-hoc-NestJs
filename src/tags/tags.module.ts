import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsService],
  exports: [TagsService],  // ← QUAN TRỌNG: export TagsService để service khác có thể dùng
})
export class TagsModule {}
