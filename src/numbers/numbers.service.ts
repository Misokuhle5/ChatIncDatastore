import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, numberstable } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NumbersService {
    constructor(private prisma: PrismaService) {}

    // async addNumber(
    //     telephone_number: string,
    //     has_whatsapp: boolean,
    //     user_uid: string
    //   ): Promise<numberstable> {
    //     const newNumberData: Prisma.numberstableCreateInput = {
    //       telephone_number,
    //       has_whatsapp,
    //       date_added: new Date(),
    //       date_modified: new Date(),
    //       userstable: {
    //         connect: { user_uid }, // Connects to the userstable using user_uid
    //       },
    //     };
    //     const newNumber = await this.prisma.numberstable.create({
    //       data: newNumberData,
    //     });
    //     return newNumber;
    //   }      

    async createNumber(telephone_number: string, has_whatsapp: boolean, user_uid: string): Promise<numberstable> {
        // Generate a unique UID
        const uid = uuidv4();
        const newNumberData: Prisma.numberstableCreateInput = {
            uid,
            telephone_number,
            has_whatsapp,
            date_added: new Date(),
            date_modified: new Date(),
            // Associate the number with an existing user
            userstable: {
                connect: { user_uid: user_uid } // Link the number with the existing user by `user_uid`
            },
        };
    
        return this.prisma.numberstable.create({
            data: newNumberData,
        });
    }

    // async updateNumber(uid: string, data: Prisma.numberstableUpdateInput) {
    //     return this.prisma.numberstable.update({
    //     where: { uid },
    //     data,
    //     });
    // }

    // Define WhatsApp numbers (replace with actual numbers)
    private readonly whatsappNumbers = ["+277912345523", "+277812343222"];

    // New method to check if numbers have WhatsApp
    
    async checkNumbersForWhatsapp(numbers: string[]): Promise<{ number: string; has_whatsapp: boolean }[]> {      
    // Map through the provided numbers and check if they are in the WhatsApp numbers list
    return numbers.map(number => ({
        number,
        has_whatsapp: this.whatsappNumbers.includes(number), // Check if number is in the WhatsApp list
    }));
    }

    async queryWhatsappStatus(numbers: string[]): Promise<{ number: string; has_whatsapp: boolean }[]> {
        // Query the database for the provided numbers and return their WhatsApp status
        const results = await this.prisma.numberstable.findMany({
            where: {
            telephone_number: {
                in: numbers, // Find matching numbers in the database
            },
            },
            select: {
            telephone_number: true, // Return the telephone number
            has_whatsapp: true,     // Return the has_whatsapp status
            },
        });
    
    // Format and return the response
    return results.map(result => ({
        number: result.telephone_number,
        has_whatsapp: result.has_whatsapp,
    }));
}

}
