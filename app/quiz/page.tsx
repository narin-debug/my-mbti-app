'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { questions } from '@/lib/mbti/questions';
import { calculateMbti } from '@/lib/mbti/scoring';
import { saveQuizResult } from '@/lib/supabase/saveResult';
import type { Letter } from '@/lib/types';

const TOTAL = questions.length;

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const question = questions[index];

  function handleSelect(letter: Letter) {
    if (isExiting || isFinishing) return;
    setIsExiting(true);

    const nextLetters = [...letters, letter];

    window.setTimeout(() => {
      if (index + 1 < TOTAL) {
        setLetters(nextLetters);
        setIndex((prev) => prev + 1);
        setIsExiting(false);
        return;
      }

      setIsFinishing(true);
      const mbtiType = calculateMbti(nextLetters);

      saveQuizResult(mbtiType, nextLetters).finally(() => {
        window.setTimeout(() => {
          router.push(`/result/${mbtiType}`);
        }, 1400);
      });
    }, 250);
  }

  if (isFinishing) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500" />
        <p className="font-display text-xl text-white">결과를 분석하는 중...</p>
        <p className="text-sm text-slate-400">당신에게 딱 맞는 IT 부캐를 찾고 있어요</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-md">
        <ProgressBar current={index + 1} total={TOTAL} />

        <div
          key={question.id}
          className={`mt-10 flex flex-col items-center gap-8 transition-opacity duration-200 ${
            isExiting ? 'opacity-0' : 'animate-fade-in-up opacity-100'
          }`}
        >
          <h2 className="text-center text-xl font-bold leading-snug text-white sm:text-2xl">
            {question.text}
          </h2>

          <div className="flex w-full flex-col gap-4">
            {question.choices.map((choice) => (
              <button
                key={choice.letter}
                type="button"
                onClick={() => handleSelect(choice.letter)}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm leading-relaxed text-slate-100 shadow-xl transition-all hover:scale-105 hover:border-indigo-400/60 hover:bg-indigo-500/10 active:scale-95 sm:text-base"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
