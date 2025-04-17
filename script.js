document.addEventListener('DOMContentLoaded', () => {
  // 메뉴 토글 기능
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');

  // 햄버거 메뉴 클릭 시 사이드바 열기
  menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
  });

  // 닫기 버튼 클릭 시 사��드바 닫기
  closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });

  // 네비게이션 탭 기능
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');
  const sections = document.querySelectorAll('.section');

  // 각 네비게이션 링크에 클릭 이벤트 추가
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 링크 동작 방지

      // 모든 링크와 섹션에서 active 클래스 제거
      navLinks.forEach((link) => link.classList.remove('active'));
      sections.forEach((section) => section.classList.remove('active'));

      // 클릭된 링크와 해당 섹션에 active 클래스 추가
      this.classList.add('active');
      const targetSection = document.getElementById(this.dataset.target);
      targetSection.classList.add('active');

      // 사이드바 닫기
      sidebar.classList.remove('open');
    });
  });

  // 캘린더 기능
  const calendarDays = document.getElementById('calendar-days');
  const currentMonthElement = document.getElementById('current-month');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const selectedDateDisplay = document.getElementById('selected-date-display');

  // 현재 날짜 정보 초기화
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let selectedDay = currentDate.getDate(); // 처음 진입 시 오늘 날짜로 설정

  // 월 이름 배열
  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  /**
   * 캘린더 생성 함수
   * @param {number} month - 표시할 월 (0-11)
   * @param {number} year - 표시할 연도
   */
  function generateCalendar(month, year) {
    // 해당 월의 첫 날 요일 구하기 (0: 일요일, 1: 월요일, ...)
    const firstDay = new Date(year, month, 1).getDay();
    // 해당 월의 총 일수 구하기
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // 이전 달의 총 일수 구하기
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // 캘린더 초기화
    calendarDays.innerHTML = '';

    // 월 표시 업데이트 (연도 포함)
    currentMonthElement.textContent = `${year}년 ${monthNames[month]}`;

    // 이전 달 날짜 표시 (첫 주의 빈 칸 채우기)
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day', 'other-month');
      dayElement.textContent = daysInPrevMonth - i;
      calendarDays.appendChild(dayElement);
    }

    // 현재 달 날짜 표시
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = i;

      // 선택된 날짜인지 확인하여 강조 표시
      if (i === selectedDay && month === currentMonth && year === currentYear) {
        dayElement.classList.add('selected');
      }

      // 날짜 클릭 이벤트 - 날짜 선택 기능
      dayElement.addEventListener('click', function () {
        // 모든 날짜에서 selected 클래스 제거
        document.querySelectorAll('.day').forEach((day) => {
          day.classList.remove('selected');
        });

        // 클릭된 날짜에 selected 클래스 추가
        this.classList.add('selected');

        // 선택된 날짜 저장
        selectedDay = i;

        // 선택된 날짜 표시 업데이트
        selectedDateDisplay.textContent = `${monthNames[month]} ${i}일`;
      });

      calendarDays.appendChild(dayElement);
    }

    // 다음 달 날짜 표시 (마지막 주의 빈 칸 채우기)
    const totalDaysDisplayed = firstDay + daysInMonth;
    const remainingCells = 7 - (totalDaysDisplayed % 7);

    // 남은 칸이 7보다 작을 때만 다음 달 날짜 표시
    if (remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'other-month');
        dayElement.textContent = i;
        calendarDays.appendChild(dayElement);
      }
    }

    // 선택된 날짜 표시 업데이트
    selectedDateDisplay.textContent = `${monthNames[month]} ${selectedDay}일`;
  }

  // 캘린더 초기화 - 페이지 로드 시 현재 월 표시
  generateCalendar(currentMonth, currentYear);

  // 월 이동 기능

  // 이전 달 버튼 클릭 이벤트
  prevMonthButton.addEventListener('click', () => {
    // 이전 달로 이동 (1월에서 이전 달로 가면 연도 감소)
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }

    // 월이 변경되면 선택된 날짜를 1일로 설정
    selectedDay = 1;

    // 슬라이드 애니메이션 적용
    const calendar = document.getElementById('calendar');
    calendar.style.transform = 'translateX(100%)';

    // 애니메이션 후 캘린더 업데이트
    setTimeout(() => {
      generateCalendar(currentMonth, currentYear);
      calendar.style.transition = 'none'; // 트랜지션 일시 제거
      calendar.style.transform = 'translateX(-100%)';

      // 약간의 지연 후 트랜지션 다시 적용하여 부드러운 이동 효과
      setTimeout(() => {
        calendar.style.transition = 'transform 0.2s ease-in-out';
        calendar.style.transform = 'translateX(0)';
      }, 30);
    }, 200);
  });

  // 다음 달 버튼 클릭 이벤트
  nextMonthButton.addEventListener('click', () => {
    // 다음 달로 이동 (12월에서 다음 달로 가면 연도 증가)
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }

    // 월이 변경되면 선택된 날짜를 1일로 설정
    selectedDay = 1;

    // 슬라이드 애니메이션 적용
    const calendar = document.getElementById('calendar');
    calendar.style.transform = 'translateX(-100%)';

    // 애니메이션 후 캘린더 업데이트
    setTimeout(() => {
      generateCalendar(currentMonth, currentYear);
      calendar.style.transition = 'none'; // 트랜지션 일시 제거
      calendar.style.transform = 'translateX(100%)';

      // 약간의 지연 후 트랜지션 다시 적용하여 부드러운 이동 효과
      setTimeout(() => {
        calendar.style.transition = 'transform 0.2s ease-in-out';
        calendar.style.transform = 'translateX(0)';
      }, 30);
    }, 200);
  });

  // 댓글 더 보기/접기 기능
  const showMoreButtons = document.querySelectorAll('.show-more-btn');
  const showLessButtons = document.querySelectorAll('.show-less-btn');

  // 댓글 더 보기 버튼 클릭 이벤트
  showMoreButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const commentsContainer = this.parentElement;
      const hiddenComments =
        commentsContainer.querySelectorAll('.comment.hidden');
      const showLessBtn = commentsContainer.querySelector('.show-less-btn');

      // 숨겨진 모든 댓글 표시
      hiddenComments.forEach((comment) => {
        comment.classList.remove('hidden');
      });

      // 더보기 버튼 숨기고 접기 버튼 표시
      this.style.display = 'none';
      showLessBtn.style.display = 'block';
    });
  });

  // 댓글 접기 버튼 클릭 이벤트
  showLessButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const commentsContainer = this.parentElement;
      const allComments = commentsContainer.querySelectorAll('.comment');
      const showMoreBtn = commentsContainer.querySelector('.show-more-btn');

      // 처음 3개를 제외한 모든 댓글 숨기기
      allComments.forEach((comment, index) => {
        if (index >= 3) {
          comment.classList.add('hidden');
        }
      });

      // 접기 버튼 숨기고 더보기 버튼 표시
      this.style.display = 'none';
      showMoreBtn.style.display = 'block';
    });
  });

  // 좋아요 버튼 기능
  const likeButtons = document.querySelectorAll('.like-btn');

  // 각 좋아요 버튼에 클릭 이벤트 추가
  likeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const icon = this.querySelector('i');
      const count = this.querySelector('span');

      // 좋아요 상태 토글
      if (icon.classList.contains('far')) {
        // 좋아요 활성화
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c'; // 좋아요 누른 후 하트 색상 (빨간색)
        count.textContent = Number.parseInt(count.textContent) + 1;
      } else {
        // 좋아요 비활성화
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '#333'; // 좋아요 취소 후 하트 색상 (검정색)
        count.textContent = Number.parseInt(count.textContent) - 1;
      }
    });
  });
});
