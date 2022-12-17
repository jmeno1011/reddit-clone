import { instanceToPlain } from "class-transformer";
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// BaseEntity.d.ts에 있는 메소드들 사용
export default abstract class Entity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    // class transformer 이용
    toJSON(){
        // Converts class (constructor) object to plain (literal) object. Also works with arrays.
        return instanceToPlain(this)
    }
}