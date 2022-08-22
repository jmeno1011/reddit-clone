public 폴더에는 정적인 에셋들을 저장해준다.
웹팩 관련된 설정은 next.config.js 에서 설정을 하면 된다.

---

### Next-js

- Next-js는 모든 페이지를 pre-render를 한다.

---

### Data Fetching

- getStaticProps : Static Generation으로 빌드(build)할 때 데이터를 불러옵니다. (미리 만들기)
- getStaticPaths : Static Generation으로 데이터를 기반하여 pre-render시 특정한 동적 라이팅 구현 (ex: pages/post/[id].js)
- getServerSideProps : Server Side Rendering으로 요청이 있을때 데이터를 불러옵니다.
