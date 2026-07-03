import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null | undefined;

/**
 * 환경 변수가 설정되지 않은 경우 null을 반환합니다.
 * 호출부에서는 null을 정상적인 "백엔드 미연동" 상태로 처리해야 합니다.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes('your-project-id')) {
    console.warn(
      '[Supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다. .env.local을 확인해주세요.'
    );
    client = null;
    return client;
  }

  client = createClient(url, anonKey);
  return client;
}
