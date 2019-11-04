import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Storage } from './utils';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Storage],
})

export class AppModule {
}
