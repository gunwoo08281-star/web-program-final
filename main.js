document.addEventListener('DOMContentLoaded', () => {
  // 1. 상단 탑 로고 클릭 시 스무스하게 최상단 이동
  const topLogo = document.getElementById('logo-top')
  if (topLogo) {
    topLogo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // 2. 스크롤 다운 시 상단 메뉴 링크에 실시간 위치 매칭 언더라인 표시 (Active 클래스 갱신)
  const sections = document.querySelectorAll('main.container > section')
  const navLinks = document.querySelectorAll('.nav-links a')

  window.addEventListener('scroll', () => {
    let currentSectionId = ''

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      // 탑 내비게이션 바 두께(70px) 보정을 감안한 활성화 높이 계산
      if (window.scrollY >= sectionTop - 120) {
        currentSectionId = section.getAttribute('id')
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active')
      }
    })
  })
})
