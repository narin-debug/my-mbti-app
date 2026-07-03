import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-2xl text-white">앗, 존재하지 않는 부캐예요 🤔</p>
      <p className="text-sm text-slate-400">주소를 다시 확인하거나 테스트를 새로 시작해보세요.</p>
      <Link
        href="/"
        className="mt-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
