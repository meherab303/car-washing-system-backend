import { z } from "zod";

const createBookingSlotSchema = z.object({
    body:z.object({
        
            service:z.string(),
            date: z.string(),
            startTime: z.string(),
            endTime: z.string(),
            isBooked: z.enum(['available', 'booked', 'canceled']).optional(),
          
    })
});

const updateBookingSlotSchema = z.object({
    body:z.object({
        service: z.string().optional(),
        date: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        isBooked: z.enum(['available', 'booked', 'canceled']).optional(),
      })
});

export const bookingSlotSchemaValidation={
    createBookingSlotSchema,
    updateBookingSlotSchema
}