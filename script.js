document.addEventListener('DOMContentLoaded', function () {
  // 메뉴 토글
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');

  menuToggle.addEventListener('click', function () {
    sidebar.classList.add('open');
  });

  closeMenu.addEventListener('click', function () {
    sidebar.classList.remove('open');
  });

  // 네비게이션 탭
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

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

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let selectedDay = currentDate.getDate(); // 처음 진입 시 오늘 날짜로 설정

  // 캘린더 생성
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

  function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    calendarDays.innerHTML = '';

    // 월 표시 업데이트 (연도 포함)
    currentMonthElement.textContent = `${year}년 ${monthNames[month]}`;

    // 이전 달 날짜
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day', 'other-month');
      dayElement.textContent = daysInPrevMonth - i;
      calendarDays.appendChild(dayElement);
    }

    // 현재 달 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = i;

      // 선택된 날짜인지 확인
      if (i === selectedDay && month === currentMonth && year === currentYear) {
        dayElement.classList.add('selected');
      }

      // 날짜 클릭 이벤트
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

    // 다음 달 날짜
    const totalDaysDisplayed = firstDay + daysInMonth;
    const remainingCells = 7 - (totalDaysDisplayed % 7);

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

  // 캘린더 초기화
  generateCalendar(currentMonth, currentYear);

  // 월 네비게이션
  prevMonthButton.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }

    // 월이 변경되면 선택된 날짜를 1일로 설정
    selectedDay = 1;

    // 슬라이드 애니메이션
    const calendar = document.getElementById('calendar');
    calendar.style.transform = 'translateX(100%)';

    setTimeout(() => {
      generateCalendar(currentMonth, currentYear);
      calendar.style.transition = 'none';
      calendar.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        calendar.style.transition = 'transform 0.3s ease-in-out';
        calendar.style.transform = 'translateX(0)';
      }, 50);
    }, 300);
  });

  nextMonthButton.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }

    // 월이 변경되면 선택된 날짜를 1일로 설정
    selectedDay = 1;

    // 슬라이드 애니메이션
    const calendar = document.getElementById('calendar');
    calendar.style.transform = 'translateX(-100%)';

    setTimeout(() => {
      generateCalendar(currentMonth, currentYear);
      calendar.style.transition = 'none';
      calendar.style.transform = 'translateX(100%)';

      setTimeout(() => {
        calendar.style.transition = 'transform 0.3s ease-in-out';
        calendar.style.transform = 'translateX(0)';
      }, 50);
    }, 300);
  });

  // 댓글 더 보기/접기 기능
  const showMoreButtons = document.querySelectorAll('.show-more-btn');
  const showLessButtons = document.querySelectorAll('.show-less-btn');

  showMoreButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const commentsContainer = this.parentElement;
      const hiddenComments = commentsContainer.querySelectorAll('.comment.hidden');
      const showLessBtn = commentsContainer.querySelector('.show-less-btn');

      hiddenComments.forEach((comment) => {
        comment.classList.remove('hidden');
      });

      this.style.display = 'none';
      showLessBtn.style.display = 'block';
    });
  });

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

      this.style.display = 'none';
      showMoreBtn.style.display = 'block';
    });
  });

  // 좋아요 버튼 기능
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const icon = this.querySelector('i');
      const count = this.querySelector('span');

      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c'; // 좋아요 누른 후 하트 색상 (빨간색)
        count.textContent = parseInt(count.textContent) + 1;
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '#333'; // 좋아요 취소 후 하트 색상 (검정색)
        count.textContent = parseInt(count.textContent) - 1;
      }
    });
  });
});