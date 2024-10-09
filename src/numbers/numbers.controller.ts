import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { NumbersService } from './numbers.service';

@Controller('/api/v1/numbers')
export class NumbersController {
    constructor(private readonly numbersService: NumbersService) {}

    // POST /api/v1/numbers/add
    @Post('add')
    async createNumber(
        @Body() createNumberDto: { telephone_number: string; has_whatsapp: boolean; user_uid: string } 
    ) {
        const { telephone_number, has_whatsapp, user_uid } = createNumberDto;
        return this.numbersService.createNumber(telephone_number, has_whatsapp, user_uid);
    }   

    // POST /api/v1/numbers/check
    @Post('check')
    async checkNumbersForWhatsapp(
        @Body() checkNumbersDto: { numbers: string[] } // Expect an array of numbers
    ) {
        const { numbers } = checkNumbersDto;
        return this.numbersService.checkNumbersForWhatsapp(numbers);
    }

    // PATCH /numbers/:uid
    // @Patch(':uid')
    // async updateNumber(
    //     @Param('uid') uid: string, @Body() updateNumberDto: { telephone_number: string; has_whatsapp: boolean; user_uid: string } 
    //  ) {
    //     const { telephone_number, has_whatsapp, user_uid } = updateNumberDto;
    //     return this.numbersService.updateNumber(uid, telephone_number, has_whatsapp, user_uid);
    // }
}
