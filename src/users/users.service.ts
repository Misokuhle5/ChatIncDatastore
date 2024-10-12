import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, userstable } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(username: string, password: string, full_name: string): Promise<userstable> {
        const userCount = await this.prisma.userstable.count(); // Get the current number of users
        const user_uid = `user${userCount + 1}`; // Generate an ID like 'user1', 'user2', etc.
        const api_key = uuidv4();
        // Automatically set the current date and time
        const date_added = new Date();
        const date_modified = new Date();

        // validation check
        if (username.length > 255 || password.length > 255 || full_name.length > 255) {
            throw new Error('Input exceeds allowed column length');
        }

        const newUserData: Prisma.userstableCreateInput = {
            user_uid,
            username,
            password,
            full_name,
            api_key,
            date_added,
            date_modified
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
