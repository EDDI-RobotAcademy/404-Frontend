/**
 * Step3 / 목적지 페이지에서 저장한 네비게이션 state를 sessionStorage에 보관해,
 * Step4에 URL로 직접 들어왔을 때도 동일한 arrival·여행 기간이 보이도록 합니다.
 */
const STORAGE_KEY = 'tripFlowDraftStep4Nav'

export function saveStep4NavigationState(state) {
  if (typeof window === 'undefined' || !state) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadStep4NavigationState() {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
