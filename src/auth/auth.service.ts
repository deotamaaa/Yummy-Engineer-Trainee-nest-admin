import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {

    }

    async userId(request: Request): Promise<number> {
        const cookie = request.cookies['jwt'];

        // console.log(`cookie = ${cookie}`);
        // Get data from the Cookie
        const data = await this.jwtService.verifyAsync(cookie);

        // Get user from the database
        return data['id'];
    }
}
