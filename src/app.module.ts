import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { V1Module } from './v1/v1.module';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  {
    path: '/v1',
    module: V1Module,
    children: [
      {
        path: '/auth',
        module: AuthModule
      }
    ]
  }
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    V1Module,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
