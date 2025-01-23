import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const adminOptions = {
    resources: [
        {
            resource: { model: getModelByName("User"), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName("Role"), client: prisma },
            options: {},
        },
    ],
    branding: {
        companyName: "Landglide",
        logo: false,
    },
    withMadeWithLove: false,
};
const admin = new AdminJS(adminOptions);

const ADMIN = {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "supersecurepassword",
};
const SECRET = process.env.ADMIN_SECRET || "cookie-secret-password";

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
        // Simple authentication logic
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    },
    cookiePassword: SECRET,
});

export { adminRouter };
