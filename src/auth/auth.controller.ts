import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';


@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Password do not match!');
        }

        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashed,
        });
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() response: Response,
    ) {
        const user = await this.userService.findOne({ email });

        if (!user) {
            throw new NotFoundException('User not found!');
        }

        if (!await bcrypt.compare(password, (await user).password)) {
            throw new BadRequestException('Invalid password!');
        }

        // Generate JWT

        const jwt = await this.jwtService.signAsync({ id: user.id })

        response.cookie('jwt', jwt, { httpOnly: true });
        return user;
    }

    // Authenticate user and generate JWT

    @Get('user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];

        // Get data from the Cookie
        const data = await this.jwtService.verifyAsync(cookie);

        // Get user from the database
        return this.userService.findOne({ id: data.id });
    }
}
