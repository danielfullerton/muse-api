import { Module } from '@nestjs/common';
import { AuthModule } from './modules/v1/auth/auth.module';
import { V1Module } from './modules/v1/v1.module';
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
  controllers: [],
  providers: []
})
export class AppModule {}
