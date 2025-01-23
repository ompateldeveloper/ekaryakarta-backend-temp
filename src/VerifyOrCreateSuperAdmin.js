import { prisma } from "./api/utils/prisma.js";
import bcrypt from "bcrypt";
export async function VerifyOrCreateSuperAdmin() {
    const super_admin = await prisma.user.findFirst({
        where: {
            role: "SUPER_ADMIN",
        },
    });
    if (super_admin) {
        return;
    } else {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await prisma.user.create({
            data: {
                email: process.env.ADMIN_EMAIL,
                password:hashedPassword

            },
        });
    }
}
