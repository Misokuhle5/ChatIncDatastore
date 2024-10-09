import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, userstable } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(username: string, password: string, full_name: string): Promise<userstable> {
        // Generate unique user_uid and API key using uuidv4
        const user_uid = uuidv4();
        const api_key = uuidv4();
        const newUserData: Prisma.userstableCreateInput = {
            user_uid,
            username,
            password,
            full_name,
            api_key,
            date_added: new Date(),
            date_modified: new Date(),
        }
        return this.prisma.userstable.create({
            data: newUserData,
        });
    }

    // async getUserById(user_uid: string) {
    //     return this.prisma.userstable.findUnique({
    //         where: { user_uid },
    //     });
    // }

    // async updateUser(user_uid: string, data: Prisma.userstableUpdateInput) {
    //     return this.prisma.userstable.update({
    //         where: { user_uid },
    //         data,
    // });
    // }
}
