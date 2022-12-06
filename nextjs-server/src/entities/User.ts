import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, OneToMany, BeforeInsert } from "typeorm";
import bcrypt from "bcryptjs";
import BaseEntity from "./Entity";
import Post from "./Post";
import Vote from "./Vote";

/*
    id: pk integer 
    createdAt timestamp
    updatedAt timestamp
    email varChar
    username varChar
    password varChar
*/

// @Entity() => 데코레이터 클래스는 User 클래스가 엔티티임을 나타내는데 사용된다.
// Create Table user 부분이다.
@Entity("users")
export default class User extends BaseEntity {
  // Index() : 데이터베이스 인덱스를 생성합니다. 엔티티 속성 또는 엔티티에 사용할 수 있다.
  // 엔티티ㅣ에 사용될 복합 열로 인덱스를 생성할 수 있다.
  // 데이터 베이스 인덱스를 생성하는 이유는 -> 인텍스를 이용하면 데이터를 좀 더 빠르게 조회가 되기때문에 사용한다.
  // 추가로 변경보다는 검색위주의 데이터를 사용할 때 많이 사용된다.
  @Index()
  @IsEmail(undefined, { message: "이메일 주소가 잘못되었습니다." })
  @Length(1, 255, { message: "이메일 주소는 비워둘 수 없습니다." })
  // 컬럼 표시
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름은 3자 이상이어야 합니다." })
  @Column({ unique: true })
  username: string;

  @Column()
  @Length(6, 255, { message: "비밀번호는 6자리 이상이어야 합니다." })
  password: string;

  // OneToMany -> 1:n
  // Post가 해당 타입이 된다.
  // post.user -> inverseSide이다.
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
