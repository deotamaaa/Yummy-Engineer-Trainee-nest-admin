import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    async all(): Promise<User[]> {
        return await this.userService.all();
    }

    // Creating users
    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);
        return await this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password
        });
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({ id });
    }
}
