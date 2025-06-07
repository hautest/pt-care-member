export const colors = {
  basic: {
    black: "#000000",
    white: "#FFFFFF",
  },
  light: {
    // 1) 배경(BACKGROUND): 단계별로 충분한 명도 차이(파란 계열 톤 업)
    background: {
      primary: "#FFFFFF", // 페이지 전체 바탕
      secondary: "#F3F7FB", // 섹션 구분용(살짝 블루)
      tertiary: "#E0ECF3", // 카드·패널 배경
    },

    // 2) 표면(SURFACE): 모달·팝업 등
    surface: {
      card: "#FFFFFF",
      panel: "#F3F7FB",
      modal: "#E0ECF3",
    },

    // 3) 텍스트(TEXT): 배경 대비 충분히 높은 대비 유지
    text: {
      primary: "#0A0F21", // 진한 다크(본문)
      secondary: "#3F4A5B", // 보조 텍스트
      tertiary: "#6B7280", // 설명·레이블
      placeholder: "#9CA3AF", // 플레이스홀더
      inverse: "#FFFFFF", // 어두운 배경 위
    },

    // 4) 경계(BORDER): 기본·연결·포커스
    border: {
      default: "#D1D5DB", // 기본 분리선
      light: "#E5E7EB", // 얇은 구분선
      focus: "#2563EB", // 포커스 아웃라인
    },

    // 5) 브랜드(BRAND)
    brand: {
      primary: "#1E40AF", // 딥 블루
      secondary: "#2563EB", // 라이트 블루
    },

    // 6) 액션(ACTION): 버튼·링크 등
    action: {
      primary: "#2563EB",
      secondary: "#1E40AF",
      disabled: "#CBD5E1",
    },

    // 7) 상태(STATUS)
    status: {
      success: "#16A34A", // 그린
      warning: "#F59E0B", // 옐로우
      error: "#DC2626", // 레드
      info: "#2563EB", // 블루
    },
  },

  dark: {
    // 1) 배경
    background: {
      primary: "#0F172A",
      secondary: "#1E293B",
      tertiary: "#293447",
    },

    // 2) 표면
    surface: {
      card: "#1E293B",
      panel: "#293447",
      modal: "#2A3C50",
    },

    // 3) 텍스트
    text: {
      primary: "#F8FAFC",
      secondary: "#E2E8F0",
      tertiary: "#94A3B8",
      placeholder: "#CBD5E1",
      inverse: "#0F172A",
    },

    // 4) 경계
    border: {
      default: "#334155",
      light: "#475569",
      focus: "#60A5FA",
    },

    // 5) 브랜드
    brand: {
      primary: "#60A5FA",
      secondary: "#818CF8",
    },

    // 6) 액션
    action: {
      primary: "#60A5FA",
      secondary: "#818CF8",
      disabled: "#475569",
    },

    // 7) 상태
    status: {
      success: "#34D399",
      warning: "#FACC15",
      error: "#EF4444",
      info: "#60A5FA",
    },
  },
} as const;
