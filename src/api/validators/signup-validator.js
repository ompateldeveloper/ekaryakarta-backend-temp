import { z } from "zod";

const userSchema = z.object({
    fname: z
        .string()
        .min(2, { message: "First name should be at least 2 characters long" })
        .max(30, { message: "First name should not exceed 30 characters" })
        .nonempty({ message: "First name cannot be empty" }),

    lname: z
        .string()
        .min(2, { message: "Last name should be at least 2 characters long" })
        .max(30, { message: "Last name should not exceed 30 characters" })
        .nonempty({ message: "Last name cannot be empty" }),

    email: z
        .string()
        .email({ message: "Please provide a valid email" })
        .nonempty({ message: "Email is required" }),

    password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" })
        .nonempty({ message: "Password is required" }),
});

const signupValidator = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.reduce((acc, curr) => {
                acc[curr.path.join(".")] = curr.message;
                return acc;
            }, {});

            return res.apiError({ error: formattedErrors });
        }

        // If an unexpected error occurs, pass it to the error handler
        next(error);
    }
};

export { signupValidator };
