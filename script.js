// 다크모드 토글
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

// 글자 크기 조절
let currentFontSize = 16;
function changeFontSize(delta) {
  currentFontSize += delta * 2;
  if (currentFontSize < 12) currentFontSize = 12;
  if (currentFontSize > 24) currentFontSize = 24;
  document.documentElement.style.setProperty('--font-size-base', currentFontSize + 'px');
}

// 모달 열기 / 닫기
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// 작가 프로필 접기 / 펼치기
function toggleAuthorProfile() {
  const content = document.getElementById('author-profile-content');
  const icon = document.getElementById('profile-toggle-icon');
  
  content.classList.toggle('hidden');
  
  if (content.classList.contains('hidden')) {
    icon.innerText = '열기';
  } else {
    icon.innerText = '접기';
  }
}

// 캐릭터 프로필 모달 호출
function openCharacterProfile(charId, name, desc) {
  document.getElementById('char-name').innerText = name;
  document.getElementById('char-desc').innerText = desc;
  openModal('character-modal');
}

// 원본 이미지 팝업 열기 (제목 함께 전달)
function openImageModal(imgSrc, titleText) {
  const modalImage = document.getElementById('modal-full-image');
  const modalTitle = document.getElementById('modal-image-title');
  
  if (modalImage) {
    modalImage.src = imgSrc;
  }
  if (modalTitle && titleText) {
    modalTitle.innerText = titleText;
  }
  
  openModal('image-modal');
}

// 찜하기 기능 (로컬 스토리지 저장)
function bookmarkItem(type, id, name, imgSrc = '') {
  let savedData = JSON.parse(localStorage.getItem('myBookmarks')) || { characters: [], illusts: [] };

  if (type === 'character') {
    if (!savedData.characters.some(item => item.id === id)) {
      savedData.characters.push({ id, name });
    }
  } else if (type === 'illust') {
    if (!savedData.illusts.some(item => item.id === id)) {
      savedData.illusts.push({ id, name, imgSrc });
    }
  }

  localStorage.setItem('myBookmarks', JSON.stringify(savedData));
  renderBookmarks();
}

// 찜한 목록 사이드바에 출력
function renderBookmarks() {
  let savedData = JSON.parse(localStorage.getItem('myBookmarks')) || { characters: [], illusts: [] };
  
  const charList = document.getElementById('saved-characters-list');
  if (charList) {
    charList.innerHTML = savedData.characters.map(c => `
      <li style="margin-bottom: 5px;">
        ${c.name} 
      </li>
    `).join('');
  }

  const illustList = document.getElementById('saved-illustrations-list');
  if (illustList) {
    illustList.innerHTML = savedData.illusts.map(i => `
      <img src="${i.imgSrc}" width="50" height="75" style="object-fit: cover; border-radius: 4px; cursor: pointer;" alt="${i.name}" onclick="openImageModal('${i.imgSrc}', '${i.name}')">
    `).join('');
  }
}

// 특정 위치로 부드럽게 스크롤
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 페이지 로드 시 찜한 목록 표시
window.onload = renderBookmarks;

