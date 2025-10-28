// 전역 변수
let selectedPet = '';

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // 하단 네비게이션
    setupBottomNav();

    // 카테고리 버튼
    setupCategoryButton();

    // 쇼핑몰 아이템
    setupShopItems();

    // 펫시터 버튼
    setupPetsitterButton();

    // 지도 버튼
    setupMapButton();
}

// 하단 네비게이션 설정
function setupBottomNav() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewName = item.dataset.view;

            // 모든 nav-item에서 active 제거
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // 모든 뷰 숨기기
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });

            // 선택된 뷰만 표시
            const targetView = document.getElementById(`${viewName}View`);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });
}

// 카테고리 버튼 설정
function setupCategoryButton() {
    const categoryBtn = document.getElementById('categoryBtn');
    const categoryModal = document.getElementById('categoryModal');
    const categoryOptions = document.querySelectorAll('.category-option');
    const categoryConfirm = document.getElementById('categoryConfirm');
    const categoryCancel = document.getElementById('categoryCancel');
    const selectedCategorySpan = document.getElementById('selectedCategory');

    // 카테고리 버튼 클릭
    categoryBtn.addEventListener('click', () => {
        categoryModal.classList.add('active');
    });

    // 카테고리 옵션 선택
    categoryOptions.forEach(option => {
        option.addEventListener('click', () => {
            categoryOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedPet = option.dataset.pet;
        });
    });

    // 완료 버튼
    categoryConfirm.addEventListener('click', () => {
        if (selectedPet) {
            selectedCategorySpan.textContent = selectedPet;
            categoryModal.classList.remove('active');
        } else {
            alert('카테고리를 선택해주세요');
        }
    });

    // 취소 버튼
    categoryCancel.addEventListener('click', () => {
        categoryModal.classList.remove('active');
    });
}

// 쇼핑몰 아이템 설정
function setupShopItems() {
    const shopItems = document.querySelectorAll('.shop-item');
    const shopView = document.getElementById('shopView');
    const homeView = document.getElementById('homeView');
    const shopTitle = document.getElementById('shopTitle');
    const shopBackBtn = document.getElementById('shopBackBtn');

    shopItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            shopTitle.textContent = category;

            // 홈 뷰 숨기고 쇼핑몰 뷰 표시
            homeView.classList.remove('active');
            shopView.classList.add('active');

            // 상품 데이터 업데이트 (실제로는 API 호출)
            updateProductList(category);
        });
    });

    // 뒤로가기 버튼
    shopBackBtn.addEventListener('click', () => {
        shopView.classList.remove('active');
        homeView.classList.add('active');
    });
}

// 상품 리스트 업데이트
function updateProductList(category) {
    const productList = document.querySelector('.product-list');

    // 카테고리별 임시 데이터
    const products = {
        '사료': [
            { name: '프리미엄 강아지 사료 5kg', price: '35,000원', icon: '🐕' },
            { name: '자연주의 강아지 사료 3kg', price: '28,000원', icon: '🐕' },
            { name: '전연령 강아지 사료 10kg', price: '55,000원', icon: '🐕' }
        ],
        '간식': [
            { name: '치킨 져키 100g', price: '8,000원', icon: '🍗' },
            { name: '연어 큐브 50g', price: '12,000원', icon: '🐟' },
            { name: '덴탈껌 20개입', price: '15,000원', icon: '🦴' }
        ],
        '영양제': [
            { name: '종합 비타민 60정', price: '25,000원', icon: '💊' },
            { name: '관절 영양제 90정', price: '35,000원', icon: '💊' },
            { name: '피부 케어 캡슐', price: '30,000원', icon: '💊' }
        ],
        '용품': [
            { name: '스테인리스 식기', price: '18,000원', icon: '🥣' },
            { name: '자동 급수기', price: '45,000원', icon: '💧' },
            { name: '애견 방석', price: '25,000원', icon: '🛏️' }
        ],
        '산책용품': [
            { name: '목줄 + 하네스 세트', price: '22,000원', icon: '🦮' },
            { name: '자동 리드줄', price: '35,000원', icon: '🦮' },
            { name: '배변봉투 100매', price: '5,000원', icon: '🗑️' }
        ],
        '의류': [
            { name: '겨울 패딩 점퍼', price: '32,000원', icon: '🧥' },
            { name: '레인코트', price: '18,000원', icon: '☔' },
            { name: '여름 쿨 조끼', price: '15,000원', icon: '👕' }
        ]
    };

    const categoryProducts = products[category] || products['사료'];

    productList.innerHTML = categoryProducts.map(product => `
        <div class="product-item">
            <div class="product-img">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        </div>
    `).join('');
}

// 펫시터 버튼 설정
function setupPetsitterButton() {
    const petsitterBtn = document.getElementById('petsitterBtn');
    const petsitterModal = document.getElementById('petsitterModal');
    const petsitterForm = document.getElementById('petsitterForm');
    const petsitterCancel = document.getElementById('petsitterCancel');
    const searchingModal = document.getElementById('searchingModal');
    const searchingClose = document.getElementById('searchingClose');

    // 펫시터 찾기 버튼 클릭
    petsitterBtn.addEventListener('click', () => {
        petsitterModal.classList.add('active');
    });

    // 취소 버튼
    petsitterCancel.addEventListener('click', () => {
        petsitterModal.classList.remove('active');
        petsitterForm.reset();
    });

    // 폼 제출
    petsitterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 입력값 검증
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        if (!name || !phone || !address || !startTime || !endTime) {
            alert('모든 항목을 입력해주세요');
            return;
        }

        // 시작시간이 종료시간보다 늦으면 에러
        if (new Date(startTime) >= new Date(endTime)) {
            alert('종료 시간은 시작 시간보다 늦어야 합니다');
            return;
        }

        // 신청 모달 닫기
        petsitterModal.classList.remove('active');

        // 찾는 중 모달 표시
        searchingModal.classList.add('active');

        // 폼 초기화
        petsitterForm.reset();
    });

    // 찾는 중 모달 확인 버튼
    searchingClose.addEventListener('click', () => {
        searchingModal.classList.remove('active');
    });
}

// 지도 버튼 설정
function setupMapButton() {
    const mapBtn = document.getElementById('mapBtn');
    const mapView = document.getElementById('mapView');
    const homeView = document.getElementById('homeView');
    const mapBackBtn = document.getElementById('mapBackBtn');

    // 지도 버튼 클릭
    mapBtn.addEventListener('click', () => {
        homeView.classList.remove('active');
        mapView.classList.add('active');
    });

    // 뒤로가기 버튼
    mapBackBtn.addEventListener('click', () => {
        mapView.classList.remove('active');
        homeView.classList.add('active');
    });
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
