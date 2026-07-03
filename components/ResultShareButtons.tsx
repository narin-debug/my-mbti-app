'use client';

import { useState } from 'react';

interface ResultShareButtonsProps {
  mbtiType: string;
}

export default function ResultShareButtons({ mbtiType }: ResultShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      const url = `${window.location.origin}/result/${mbtiType}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 sm:text-base"
    >
      {copied ? '✅ 링크가 복사되었어요!' : '🔗 결과 링크 복사하기'}
    </button>
  );
}
