import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { configurationenv } from "./configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/users/users.module";
import { AuthPermissionModule } from "./modules/auth_permission/auth_permission.module";
import { ModulesModule } from "./modules/modules/modules.module";
import { AuthGroupModule } from "./modules/auth_group/auth_group.module";
import { ContentTypeModule } from "./modules/content_type/content_type.module";
import { AuthModule } from "./auth/auth.module";
import { CompaniesModule } from "./modules/companies/companies.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationenv]
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.HOST_BD,
      port: parseInt(process.env.PORT_BD),
      username: process.env.USERNAME_BD,
      password: process.env.PASSWORD_BD,
      database: "baseusuarios",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    UsersModule,
    AuthPermissionModule,
    ModulesModule,
    AuthGroupModule,
    ContentTypeModule,
    AuthModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
