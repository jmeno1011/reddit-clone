import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 먼저 sub을 생성할 수 있는 유저인지 체크를 위해 유저 정보 가져오기(요청에서 보내주는 토큰을 이용)
        const token = req.cookies.token;
        if (!token) return next()
        console.log(token);
        

        const { username }: any = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOneBy({ username })

        console.log("user", user);
        
        // 유저 정보가 없다면 throw error!
        if (!user) throw new Error("Unauthenticated")

        // 유저 정보를 res.local.user에 넣어주기
        res.locals.user = user;

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Something went wrong" })

    }
}