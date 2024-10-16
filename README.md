# Datarize Frontend 과제 전형

## 구조

```cmd
./frontend
└── src
    ├── components    // 컴포넌트 폴더
    │   └── ui        // shadcn/ui 폴더
    ├── core          // 변하지 않는 코드
    ├── lib           // 유틸리티 코드
    ├── queries       // react-query, axios 코드
    ├── Provider.tsx  // react-query provider 코드
    ├── QueryErrorBoundary.tsx // react-query + error boundary 코드
    └── constants.ts  // 상수 모음
```

## 개발환경

`node 20.13.1`
`yarn 1.22.22`

## 실행 방법

```cmd
nvm use // nvm을 사용해서 node 버전을 관리
cd apps
yarn install
yarn start-server
yarn start-client
```

## 화면 구성

- 한 화면에서 모두 볼 수 있도록 함
- 고객 구매 상세 내역은 모달을 사용해 표현함

## 사용 라이브러리

- UI 라이브러리: `shadcn/ui`, `tailwindCss`
- 상태관리 라이브러리: `@tanstack/react-query`
- HTTPClient: `axios`
- Error Boundary: `react-error-boundary`

## 이슈

- `/api/purchase-frequency` 서버 코드에 의도적인 에러 코드가 있어서 데이터를 받을 수 없는 상황이 있었고 문의 사항을 남겼고, 삭제하고 계속 하면 된다는 답변이 와서 문제가 되는 부분을 삭제 하고 계속 진행함.
- 고객 구매 내역 api의 경로가 `/api/customer/{id}/purchases`가 아닌 `/api/customers/{id}/purchases`로 설정되어 있어 문의사항을 남겼고 서버 구현대로 클라이언트를 수정하면 된다고 하여 수정하고 계속 진행함.
- `react-day-picker`의 날짜 선택 결과는 KST였고 서버의 데이터는 UTC기준이라 날짜 필터가 정확히 동작하지 않는것을 발견했고 라이브러리에서 UTC를 기본으로 설정 할 수 있는지 확인 해 보았으나 딱히 방법이 없어 `kstToUtc` 유틸함수를 만들어 초기 셋팅 날짜와 검색시에 적용해주어 해결했다.

## 좋았던점

- 서버에러를 처음 발견했을때 당황했지만 실시간으로 의사소통 하면서 과제를 진행하니 실제로 업무를 진행하는것 같은 기분이 들어 재밌었다.
