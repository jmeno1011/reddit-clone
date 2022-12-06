import { Expose } from "class-transformer";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from './Entity';
import User from "./User";

@Entity("subs")
export default class Sub extends BaseEntity {
    @Index()
    @Column({ unique: true })
    name: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    imageUrn: string;

    @Column({ nullable: true })
    bannerUrn: string;

    @Column()
    username: string;

    @ManyToOne(() => User)
    // joincolumn을 이용해서 어떤 관계들이 왜래키를 가지고 있는지 나타냄
    // name: 외래키 속성명(Sub테이블에서 외래키가 무엇인지 24번째 줄에 username임)
    // referencedColumnName: 참조 엔티티의 참조 속성명이다. 참조되는 User의 username을 적어준다. 
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User;

    // 데코레이터의 경우 OneToOne은 필수이지만 아래와 같은 
    // OneToMany나 ManyToOne은 선택이다.
    @OneToMany(() => Post, (post) => post.sub)
    posts: Post[]

    @Expose()
    get imageUrl(): string {
        return this.imageUrn
            ? `${process.env.APP_URL}/images/${this.imageUrn}`
            : "https://www.gravatar.com/avatar?d=mp&f=y";
    }

    @Expose()
    get bannerUrl(): string | undefined {
        return this.bannerUrn
            ? `${process.env.APP_URL}/images/${this.bannerUrn}`
            : undefined
    }
}