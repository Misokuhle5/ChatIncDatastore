import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { constants } from 'buffer';

@Controller('/api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // POST /api/v1/users/register
    @Post('register')
    async createUser(@Body() createUserDto: { username: string, password: string, full_name: string }
    ) {
        console.log('Request body:', createUserDto); // Add this line to debug the incoming request
        const { username, password, full_name } = createUserDto;
        return this.usersService.createUser(username, password, full_name);
    }

    // GET /users/:id
    // @Get(':id')
    // async findOne(@Param('id') id: string) {
    //     return this.usersService.getUserById(id);
    // }

    // PATCH /users/:id
    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateUserDto: any) {
    //     return this.usersService.updateUser(id, updateUserDto);
    // }    
}

//test get method 