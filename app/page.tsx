import Link from 'next/link';
import ParticipantCounter from '@/components/ParticipantCounter';

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full bg-indigo-600/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 animate-blob rounded-full bg-cyan-400/20 blur-3xl [animation-delay:4s]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-72 w-72 -translate-x-1/2 animate-blob rounded-full bg-fuchsia-500/10 blur-3xl [animation-delay:8s]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-cyan-300">
          IT 직무 페르소나 테스트
        </span>

        <h1 className="font-display text-3xl leading-snug text-white sm:text-4xl">
          출근길 내 모습으로 알아보는
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            &lsquo;IT 부캐&rsquo;
          </span>{' '}
          테스트
        </h1>

        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          협업 스타일부터 위기 대처법까지,
          <br />내 MBTI 유형에 맞는 IT 직무 페르소나는?
        </p>

        <ParticipantCounter />

        <Link
          href="/quiz"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/40 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          내 IT 부캐 확인하러 가기
          <span className="inline-block transition-transform group-hover:translate-x-1">➔</span>
        </Link>

        <p className="text-xs text-slate-500">8개의 질문 · 약 1분 소요</p>
      </div>
    </main>
  );
}
