/**
 * 가이드 보관함 카드에 보여 줄 제목·기간 문구 생성
 * 엔트리에 tripStartDate / tripEndDate / country / destination 이 있으면
 * `/trips/new/destination` 플로우와 동일한 규칙으로 표시합니다.
 * (API에서 listTitle 을 내려주면 그대로 쓰고, 없을 때만 클라이언트에서 조합)
 */

import { formatKoreanDateRangeLine, formatTripNightsDaysLabel } from '@/utils/tripDateFormat'

/**
 * @param {{ country?: string, destination?: string, tripStartDate?: string, tripEndDate?: string, pageTitle?: string }} entry
 * @returns {string}
 */
export function buildGuideArchiveListTitle(entry) {
  const country = entry.country?.trim()
  const dest = entry.destination?.trim()
  const start = entry.tripStartDate
  const end = entry.tripEndDate

  /** 목적지 설정 + 일정이 스냅샷에 포함된 경우 (향후 API `trip` 리소스와 동일 필드) */
  if (country && dest && start && end) {
    const nightsDays = formatTripNightsDaysLabel(start, end)
    const range = formatKoreanDateRangeLine(start, end)
    const tail = nightsDays || range
    return `${country} · ${dest} — ${tail}`
  }

  /** 레거시 / 검색 전용 목 데이터 — 지역 먼저, 국가(중복 시 생략) */
  if (dest && country && !dest.includes(country)) {
    return `${dest} · ${country}`
  }

  return dest || entry.pageTitle?.trim() || '여행 체크리스트'
}

/**
 * @param {{ tripStartDate?: string, tripEndDate?: string, tripWindowLabel?: string }} entry
 * @returns {string}
 */
export function buildGuideArchiveDateLine(entry) {
  if (entry.tripStartDate && entry.tripEndDate) {
    const range = formatKoreanDateRangeLine(entry.tripStartDate, entry.tripEndDate)
    if (range) return range
  }
  const legacy = entry.tripWindowLabel?.trim()
  if (!legacy) return '일정 미정'
  /** 예전에 저장된 `날짜 (N박 N일)` 한 줄 문자열에서 괄호 구간만 제거 */
  const withoutNights = legacy.replace(/\s*\(\d+박\s*\d+일\)\s*$/, '').trim()
  return withoutNights || legacy
}
