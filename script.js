// 전역 변수
let selectedPet = '';
let likedPosts = new Set();

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // 로딩 화면 표시
    showLoadingScreen();
});

// 로딩 화면
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    // 2초 후 로딩 화면 제거하고 앱 초기화
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        initializeApp();
    }, 2000);
}

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

    // 좋아요 버튼
    setupLikeButtons();

    // 게시글 상세보기
    setupPostDetail();
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

    productList.innerHTML = categoryProducts.map((product, index) => `
        <div class="product-item" data-product-index="${index}" data-category="${category}">
            <div class="product-img">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        </div>
    `).join('');

    // 상품 클릭 이벤트 추가
    setupProductClick();
}

// 상품 클릭 이벤트
function setupProductClick() {
    const productItems = document.querySelectorAll('.product-item');
    const productDetailView = document.getElementById('productDetailView');
    const shopView = document.getElementById('shopView');
    const productBackBtn = document.getElementById('productBackBtn');

    productItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            const index = parseInt(item.dataset.productIndex);

            // 상품 데이터 가져오기
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

            const product = products[category][index];

            // 상품 상세 정보 업데이트
            document.getElementById('productDetailImg').textContent = product.icon;
            document.getElementById('productDetailName').textContent = product.name;
            document.getElementById('productDetailPrice').textContent = product.price;

            // 화면 전환
            shopView.classList.remove('active');
            productDetailView.classList.add('active');
        });
    });

    // 뒤로가기 버튼
    productBackBtn.addEventListener('click', () => {
        productDetailView.classList.remove('active');
        shopView.classList.add('active');
    });
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

// 좋아요 버튼 설정
function setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // 게시글 클릭 이벤트 방지

            const currentLikes = parseInt(btn.dataset.likes);
            const likeCountSpan = btn.querySelector('.like-count');

            if (btn.classList.contains('liked')) {
                // 좋아요 취소
                btn.classList.remove('liked');
                btn.dataset.likes = currentLikes - 1;
                likeCountSpan.textContent = currentLikes - 1;
            } else {
                // 좋아요
                btn.classList.add('liked');
                btn.dataset.likes = currentLikes + 1;
                likeCountSpan.textContent = currentLikes + 1;
            }
        });
    });
}

// 게시글 상세보기 설정
function setupPostDetail() {
    const posts = [
        {
            id: 1,
            author: '반려인123',
            time: '10분 전',
            content: '우리 강아지 산책하기 좋은 곳 추천해주세요!',
            likes: 12,
            comments: 5
        },
        {
            id: 2,
            author: '고양이집사',
            time: '1시간 전',
            content: '고양이 사료 추천 부탁드려요~',
            likes: 8,
            comments: 3
        },
        {
            id: 3,
            author: '햄스터러버',
            time: '2시간 전',
            content: '햄스터 키우시는 분들 모여요!',
            likes: 15,
            comments: 7
        }
    ];

    const postItems = document.querySelectorAll('.post-item');
    const postDetailView = document.getElementById('postDetailView');
    const communityView = document.getElementById('communityView');
    const postBackBtn = document.getElementById('postBackBtn');

    postItems.forEach((item, index) => {
        // 좋아요 버튼을 제외한 영역에서만 클릭 이벤트
        item.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) return;

            const postId = parseInt(item.dataset.postId);
            const post = posts.find(p => p.id === postId);

            if (post) {
                // 게시글 상세 정보 업데이트
                document.getElementById('detailAuthor').textContent = post.author;
                document.getElementById('detailTime').textContent = post.time;
                document.getElementById('detailContent').textContent = post.content;

                const detailLikeBtn = postDetailView.querySelector('.detail-like');
                detailLikeBtn.dataset.likes = post.likes;
                detailLikeBtn.querySelector('.like-count').textContent = post.likes;

                // 화면 전환
                communityView.classList.remove('active');
                postDetailView.classList.add('active');
            }
        });
    });

    // 뒤로가기 버튼
    postBackBtn.addEventListener('click', () => {
        postDetailView.classList.remove('active');
        communityView.classList.add('active');
    });

    // 댓글 입력
    const commentInput = postDetailView.querySelector('.comment-input');
    const commentSubmitBtn = postDetailView.querySelector('.comment-submit-btn');

    commentSubmitBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentList = postDetailView.querySelector('.comment-list');
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <span class="comment-author">나</span>
                <p class="comment-text">${commentText}</p>
                <span class="comment-time">방금 전</span>
            `;
            commentList.appendChild(newComment);
            commentInput.value = '';

            // 댓글 수 업데이트
            const commentCount = postDetailView.querySelector('.comment-count');
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
        }
    });
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
