import type { Metadata } from 'next';
import { Black_Han_Sans, Noto_Sans_KR } from 'next/font/google';
import './globals.css';

// Noto Sans KR / Black Han Sans는 next/font의 서브셋 메타데이터상 'latin'만 노출되지만,
// 두 폰트 모두 한글 전용(CJK) 웹폰트라 실제 다운로드되는 폰트 파일에는 한글 글리프가 포함되어 있다.
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-body',
  display: 'swap',
});

const blackHanSans = Black_Han_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "내 성격에 딱 맞는 IT 부캐 찾기 | MBTI 테스트",
  description:
    '8개의 질문으로 알아보는 나의 IT 직무 페르소나. 협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는 IT 부캐를 확인해보세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${blackHanSans.variable}`}>
      <body className="min-h-dvh bg-slate-950 font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
