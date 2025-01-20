import { z } from "zod";

 const createServiceValidationSchema = z.object({
    body:z.object({
       
        name: z.string().trim(),
        description: z.string().trim(),
        price: z.number().min(0),
        duration: z.number().min(0),
      })
 })

 const updateServiceValidationSchema = z.object({
    body: z.object({
      name: z.string().nonempty().trim().optional(),
      description: z.string().nonempty().trim().optional(),
      price: z.number().min(0).optional(),
      duration: z.number().min(0).optional(),
    }),
  });
  

export const serviceValidationSchema={
    createServiceValidationSchema,
    updateServiceValidationSchema
}