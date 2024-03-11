import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import config from './config/config';
import { User } from './users/entities/user.entity';
import { Media } from './media/entities/media.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule.forRoot([User, Media]),
    AuthModule,
    UsersModule,
    MediaModule,
  ],
})
export class AppModule {}
