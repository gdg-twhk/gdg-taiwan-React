import { useEffect, useState } from 'react';

/**
 * useClientOnly
 *
 * 用於 Next.js/React 專案，確保元件只在 client 端渲染，
 * 避免 SSR/CSR hydration mismatch 問題。
 *
 * 用法：
 *   const mounted = useClientOnly();
 *   if (!mounted) return null;
 *   // ...client-only render
 *
 * 為何需要？
 * - 當元件依賴 window、document、localStorage、主題、語言、螢幕寬度等 client-only 狀態時，
 *   SSR 階段無法取得正確值，會導致 hydration failed。
 * - 此 hook 會在 useEffect 觸發後（即 client 端）才設為 true。
 */
export function useClientOnly(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
} 