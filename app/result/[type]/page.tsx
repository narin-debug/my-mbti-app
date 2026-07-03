import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ResultShareButtons from '@/components/ResultShareButtons';
import { getPersonaByType, personas } from '@/lib/mbti/personas';

interface ResultPageProps {
  params: Promise<{ type: string }>;
}

export function generateStaticParams() {
  return personas.map((persona) => ({ type: persona.type }));
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { type } = await params;
  const persona = getPersonaByType(type);

  if (!persona) {
    return { title: 'IT 부캐 찾기 테스트' };
  }

  return {
    title: `${persona.name} (${persona.type}) | IT 부캐 찾기`,
    description: persona.tagline,
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { type } = await params;
  const persona = getPersonaByType(type);

  if (!persona) {
    notFound();
  }

  return (
    <main className="flex min-h-dvh flex-col items-center px-6 py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-950/40 sm:p-8">
        <header className="flex flex-col items-center gap-2 text-center">
          <span className="rounded-full bg-indigo-600/20 px-4 py-1 text-sm font-bold tracking-widest text-indigo-300">
            {persona.type}
          </span>
          <h1 className="font-display text-2xl text-white sm:text-3xl">{persona.name}</h1>
          <p className="text-sm text-cyan-300">{persona.tagline}</p>
        </header>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
            일상 속 나의 모습
          </h2>
          <ul className="flex flex-col gap-3">
            {persona.traits.map((trait) => (
              <li key={trait} className="flex items-start gap-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                <span className="mt-0.5 shrink-0 text-indigo-400">▹</span>
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <p className="mb-1 text-xs font-bold text-emerald-300">💚 찰떡궁합 파트너</p>
            <p className="mb-1 text-sm font-bold text-white">
              {persona.bestMatch.type} · {persona.bestMatch.name}
            </p>
            <p className="text-xs leading-relaxed text-slate-300">{persona.bestMatch.reason}</p>
          </div>
          <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-4">
            <p className="mb-1 text-xs font-bold text-rose-300">🔥 케미 최악 주의보</p>
            <p className="mb-1 text-sm font-bold text-white">
              {persona.worstMatch.type} · {persona.worstMatch.name}
            </p>
            <p className="text-xs leading-relaxed text-slate-300">{persona.worstMatch.reason}</p>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pt-2">
          <ResultShareButtons mbtiType={persona.type} />
          <Link
            href="/quiz"
            className="w-full rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition-all hover:scale-105 hover:border-white/30 active:scale-95"
          >
            테스트 다시 하기
          </Link>
        </footer>
      </div>
    </main>
  );
}
