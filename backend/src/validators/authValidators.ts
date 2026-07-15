import { z } from 'zod';

//the zod making basic input verification for the classic register

const registerSchema = z.object({
    email: z
        .email("Invalid email format"),
    username: z.string()
        .min(1, "username is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long"),
});

export { registerSchema };