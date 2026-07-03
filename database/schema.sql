-- IT 부캐 찾기 MBTI 테스트 - Supabase 스키마
-- Supabase 대시보드 SQL Editor 에서 실행하세요.

create extension if not exists "pgcrypto";

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  mbti_type text not null check (char_length(mbti_type) = 4),
  answers jsonb not null,
  created_at timestamptz not null default now()
);

-- Row Level Security 활성화
alter table public.results enable row level security;

-- 익명 사용자의 결과 저장(insert) 허용
create policy "Allow public insert" on public.results
  for insert
  to anon
  with check (true);

-- 익명 사용자의 참여자 수 조회(select) 허용 (메인 화면 실시간 카운터용)
create policy "Allow public read" on public.results
  for select
  to anon
  using (true);

-- 실시간 카운터가 즉시 갱신되도록 Realtime publication에 테이블 추가
alter publication supabase_realtime add table public.results;
