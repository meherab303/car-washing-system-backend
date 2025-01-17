import { z } from "zod";

export const createUserValidationSchema = z.object({
    body:z.object(
        {
        
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            phone: z.string(),
            role: z.enum(["admin", "user"]),
            address: z.string(),
          
    })
});
export const updateUserValidationSchema = z.object({
    body:z.object(
        {
        
            name: z.string().optional(),
            email: z.string().optional(),
            password: z.string().optional(),
            phone: z.string().optional(),
            role: z.enum(["admin", "user"]).optional(),
            address: z.string().optional(),
          
    })
});


export const userSchemaValidations={
     createUserValidationSchema,
    updateUserValidationSchema
}