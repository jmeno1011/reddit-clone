import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken"
import User from "../entities/User";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";
import { isEmpty } from "class-validator";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";

const router = Router()

const createSub = async (req: Request, res: Response, next) => {
    const { name, title, description } = req.body;

    try{
        let errors: any = {}
        if(isEmpty(name)) errors.name = "이름은 비워둘 수 없습니다."
        if(isEmpty(title)) errors.title = "제목은 비워둘 수 없습니다."

        const sub = await getRepository(Sub)
        .createQueryBuilder()
        
    }catch(error){

    }
    // 유저 정보가 있다면 sub 이름과 제목이 이미 있는 것인지 체크

    // Sub Instance 생성 후 데이터베이스에 저장

    // 저장한 정보 프론트엔드로 전달해주기
}


router.post("/", userMiddleware, authMiddleware, createSub);

export default router;
