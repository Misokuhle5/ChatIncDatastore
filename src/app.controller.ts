import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller('api/v1')
export class AppController {

  // A GET endpoint for the root path
  @Get()
  getRoot() {
    return { message: 'Welcome to the API' };  // Simple message for the root path
  }

  // 1. POST /api/v1/numbers/add
  @Post('numbers/add')
  addOrUpdateNumbers(@Body() body: { numbers: { telephone_number: string, has_whatsapp: string }[] }) {
    console.log(body);
    return { status: 'success' };
  }

  // 2. POST /api/v1/numbers/check
  @Post('numbers/check')
  checkWhatsAppNumbers(@Body() body: { numbers: string[] }) {
    const result = body.numbers.map(number => ({
      telephone_number: number,
      has_whatsapp: number === '+277912345523' ? 'yes' : 'no' 
    }));//adjust this method to use the API key /external API 

    return { numbers: result };
  }

  // 3. POST /api/v1/user/register
  @Post('user/register')
  registerUser(@Body() body: { username: string, password: string, full_name: string, api_key: string }) {
    const userId = Math.floor(Math.random() * 10000);  
    return {
      status: 'success',
      uid: userId
    };
  }
}



//http://localhost:3000/ + hello+ controller decorator

//http://localhost:3000/hi 3