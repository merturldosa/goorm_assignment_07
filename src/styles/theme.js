// 중후하고 전문적인 디자인 테마 설정

export const theme = {
  // 주요 색상
  colors: {
    primary: '#2C3E50',        // 다크 블루그레이 - 전문적이고 신뢰감
    secondary: '#34495E',      // 미디엄 그레이블루 - 차분함
    accent: '#C9A961',         // 골드 베이지 - 고급스러움
    background: '#F8F9FA',     // 라이트 그레이 - 깔끔함

    // 사이드바
    sidebarBg: '#E8D5B7',      // 베이지 톤 - 따뜻함
    sidebarActive: '#C9A961',  // 골드 베이지
    sidebarHover: '#DCC9A7',   // 라이트 골드

    // 카드 배경색
    cardWhite: '#FFFFFF',
    cardRed: '#F8D7DA',        // 연한 로즈
    cardGreen: '#D4EDDA',      // 연한 민트
    cardBlue: '#CCE5FF',       // 연한 스카이블루

    // 텍스트 색상
    textPrimary: '#2C3E50',
    textSecondary: '#6C757D',
    textLight: '#ADB5BD',
    textWhite: '#FFFFFF',

    // 테두리
    border: '#DDD',
    borderLight: '#E9ECEF',

    // 상태 색상
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',

    // 우선순위 색상
    priorityHigh: '#DC3545',
    priorityLow: '#6C757D',

    // 그림자
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowMedium: 'rgba(0, 0, 0, 0.15)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
  },

  // 타이포그래피
  typography: {
    fontFamily: "'Noto Sans KR', 'Roboto', sans-serif",
    fontFamilyBody: "'Noto Sans KR', 'Open Sans', sans-serif",

    fontSize: {
      appTitle: '32px',
      pageTitle: '24px',
      noteTitle: '18px',
      body: '14px',
      caption: '12px',
      small: '11px',
    },

    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // 간격
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },

  // 그림자
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cardHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
    modal: '0 10px 40px rgba(0, 0, 0, 0.2)',
    button: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  // 전환 효과
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  // 중단점 (반응형)
  breakpoints: {
    mobile: '767px',
    tablet: '768px',
    desktop: '1200px',
  },

  // Z-index 레이어
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    tooltip: 1100,
  },
};

export default theme;
