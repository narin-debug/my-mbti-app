import type { Letter, MbtiType } from '@/lib/types';

function pick(scoreA: number, scoreB: number, letterA: Letter, letterB: Letter, tieWinner: Letter): Letter {
  if (scoreA > scoreB) return letterA;
  if (scoreB > scoreA) return letterB;
  return tieWinner;
}

/**
 * 8개의 응답(letters)을 집계해 최종 MBTI 4자리를 계산합니다.
 * 동점일 경우 I, N, T, P를 우선순위로 둡니다. (docs/requirements.md 4장 참고)
 */
export function calculateMbti(letters: Letter[]): MbtiType {
  const tally: Record<Letter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const letter of letters) {
    tally[letter] += 1;
  }

  const ei = pick(tally.E, tally.I, 'E', 'I', 'I');
  const sn = pick(tally.S, tally.N, 'S', 'N', 'N');
  const tf = pick(tally.T, tally.F, 'T', 'F', 'T');
  const jp = pick(tally.J, tally.P, 'J', 'P', 'P');

  return `${ei}${sn}${tf}${jp}`;
}
