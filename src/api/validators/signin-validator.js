import { z } from "zod";

const userSchema = z.object({
    email: z
        .string()
        .email({ message: "Please provide a valid email" })
        .nonempty({ message: "Email is required" }),

    password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" })
        .nonempty({ message: "Password is required" }),
});

const signinValidator = (req, res, next) => {
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

export { signinValidator };
