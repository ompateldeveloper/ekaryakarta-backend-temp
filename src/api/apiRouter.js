import { Router } from "express";
import { formatMiddleware } from "./middlewares/formatMiddlewares";
import { authRouter } from "./routers/authRouter.js";
export const apiRouter = Router()
apiRouter.use(formatMiddleware)
apiRouter.use('/auth',authRouter)