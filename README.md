# 내 성격에 딱 맞는 IT 부캐 찾기 (MBTI 테스트)

`docs/requirements.md`, `docs/design-guide.md` 기획/디자인 명세를 기반으로 구현한 Next.js 15(App Router) + Tailwind CSS 웹 테스트입니다.

## 스택

- Next.js 15 (App Router, React 19, TypeScript)
- Tailwind CSS 3
- Supabase (`@supabase/supabase-js`) — 참여자 수 실시간 카운터 & 결과 데이터 적재

## 실행 방법

```bash
npm install
cp .env.local.example .env.local   # 아래 안내대로 값 채우기
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## Supabase 연동 설정

1. Supabase 프로젝트의 SQL Editor에서 [`database/schema.sql`](database/schema.sql) 내용을 실행해 `results` 테이블과 정책, Realtime 발행을 생성합니다.
2. `.env.local`에 아래 두 값을 채웁니다. (`docs/supabase-info.md`에 적어둔 값을 사용)
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<SUPABASE_PROJECT_ID>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<SUPABASE_PUBLISHABLE_KEY>`
3. 값이 비어 있어도 앱은 정상 동작합니다 — 홈 화면의 실시간 카운터는 안내 문구로 대체되고, 결과 저장은 조용히 스킵됩니다(콘솔 경고만 출력).

## 폴더 구조

```
app/
  page.tsx              메인 화면 (타이틀, 실시간 카운터, CTA)
  quiz/page.tsx          8문항 퀴즈 화면 (진행 바 + 결과 분석 로딩)
  result/[type]/page.tsx 결과 화면 (16가지 페르소나, 정적 생성)
components/              ParticipantCounter, ProgressBar, ResultShareButtons
lib/mbti/                questions.ts(질문 세트), scoring.ts(채점 로직), personas.ts(16유형 데이터)
lib/supabase/            client.ts(클라이언트 생성), saveResult.ts(결과 저장)
database/schema.sql       Supabase 테이블/정책/Realtime 설정 SQL
```

## 핵심 로직

- 8문항, 차원(E/I, S/N, T/F, J/P)당 2문항. 선택할 때마다 해당 알파벳 +1점.
- 동점 시 우선순위: `I`, `N`, `T`, `P` (`lib/mbti/scoring.ts`).
- 결과 페이지는 `/result/[MBTI]` 정적 경로로 생성되어 링크 복사 후 공유해도 동일한 결과가 그대로 노출됩니다.
