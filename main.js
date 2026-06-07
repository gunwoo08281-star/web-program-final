document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 상단 탑 로고 및 메뉴 클릭 시 부드러운 스크롤 이동
  // ==========================================
  const topLogo = document.getElementById('logo-top')
  if (topLogo) {
    topLogo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // 메뉴 링크 클릭 시 탑바 높이를 고려한 부드러운 이동 보정
  const navLinks = document.querySelectorAll('.nav-links a')
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const targetOffset = targetSection.offsetTop - 100 // 프리미엄 탑바 넉넉히 보정
        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth',
        })
      }
    })
  })

  // ==========================================
  // 2. 스크롤 다운 시 상단 메뉴 실시간 Active 클래스 갱신
  // ==========================================
  const sections = document.querySelectorAll('main.container > section')

  window.addEventListener('scroll', () => {
    let currentSectionId = ''

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      if (window.scrollY >= sectionTop - 150) {
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

  // ==========================================
  // 3. Assignments 실시간 검색 및 필터링 기능 (다크 네온 인테리어)
  // ==========================================
  const assignmentSection = document.getElementById('assignments')

  if (assignmentSection) {
    const blockTitle = assignmentSection.querySelector('.block-title')
    const searchWrapper = document.createElement('div')
    searchWrapper.style.margin = '0 auto 32px auto'
    searchWrapper.style.maxWidth = '500px'
    searchWrapper.style.width = '100%'

    // [전면 리뉴얼] 완벽한 테크니컬 다크 무드 스킨 적용
    searchWrapper.innerHTML = `
      <input type="text" id="task-search" placeholder="🔍 과제 명칭을 입력하여 필터링해보세요..." 
        style="width: 100%; padding: 14px 20px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.08); 
               background: rgba(20, 22, 34, 0.6); color: #f1f5f9; font-size: 0.95rem; outline: none; 
               backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: all 0.4s ease;" />
    `
    blockTitle.insertAdjacentElement('afterend', searchWrapper)

    const searchInput = document.getElementById('task-search')
    const taskCards = document.querySelectorAll('.task-card')

    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase().trim()

      taskCards.forEach((card) => {
        const titleText = card.querySelector('h3').textContent.toLowerCase()
        const descText = card.querySelector('p').textContent.toLowerCase()

        if (titleText.includes(keyword) || descText.includes(keyword)) {
          card.style.display = ''
          card.style.animation = 'fadeIn 0.5s ease-in-out'
        } else {
          card.style.display = 'none'
        }
      })
    })

    // 검색바 인포커스 네온 플레어 효과 제어
    searchInput.addEventListener('focus', () => {
      searchInput.style.borderColor = '#00f0ff'
      searchInput.style.boxShadow =
        '0 0 20px rgba(0, 240, 255, 0.25), 0 10px 25px rgba(0,0,0,0.4)'
    })
    searchInput.addEventListener('blur', () => {
      searchInput.style.borderColor = 'rgba(255,255,255,0.08)'
      searchInput.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)'
    })
  }

  // ==========================================
  // 4. External Links 3D 마우스 틸트(Tilt) 시각 효과
  // ==========================================
  const neonCards = document.querySelectorAll('.neon-card')

  neonCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xc = rect.width / 2
      const yc = rect.height / 2
      const angleX = (yc - y) / 12
      const angleY = (x - xc) / 12

      card.style.transform = `perspective(600px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.04)`
      card.style.transition = 'transform 0.08s ease'
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)'
      card.style.transition = 'transform 0.5s ease'
    })
  })
})
