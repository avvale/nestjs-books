import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { LoginController } from './login/login.controller';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { jwtConstants } from './auth/constants';
import { UserService } from './users/user.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [
        LoginController
    ],
    providers: [
        AuthService, 
        LocalStrategy,
        JwtStrategy,
        UserService
    ],
    exports: [AuthService],
})
export class AdminModule {}
