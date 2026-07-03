import { getSupabaseClient } from '@/lib/supabase/client';
import type { Letter, MbtiType } from '@/lib/types';

/**
 * 최종 MBTI 결과와 선택한 답변 리스트를 Supabase results 테이블에 적재합니다.
 * 백엔드 연동이 안 되어 있어도(getSupabaseClient가 null) 퀴즈 플로우는 막지 않습니다.
 */
export async function saveQuizResult(mbtiType: MbtiType, answers: Letter[]): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const { error } = await supabase.from('results').insert({
    mbti_type: mbtiType,
    answers,
  });

  if (error) {
    console.error('[Supabase] 결과 저장 실패:', error.message);
  }
}
