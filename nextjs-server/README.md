tsconfig.json
TypeScript로 짜여진 코드를 JavaScript로 컴파일하는 옵션을 설정하는 파일 입니다.
TypeScript 컴파일은 tsc라는 명령어를 사용합니다.
npx tsc --init 커멘드로 tsconfig.json파일을 생성한다.

옵션 설명 : https://www.typescriptlang.org/tsconfig

엔티티 생성을 위해 필요한 모듈
- bcryptjs : 비밀번호 암호화 모듈
- class-validator : 데코레이터를 이용해서 요청에서 오는 오브젝트의 프로퍼티를 검증하는 라이브러리다.
- class-transformer : 일반 객체를 클래스의 일부 인스턴스로 또는 그 반대로 변환할 수 있습니다.
- npm install bcryptjs class-validator class-transformer --save
- npm install @types/bcryptjs --save-dev

base 엔티티 생성 
- 주로 공통적으로 사용되는 칼럼이 해당되는 엔티티를 위해 따로 생성해서 다른 엔티티에 상속받아 사용한다.