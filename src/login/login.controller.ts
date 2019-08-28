import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController 
{
    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request() req) 
    {
        return req.user;
    }
}
