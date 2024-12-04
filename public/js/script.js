
// 初期画面、アカウント作成画面、メール認証画面のDOM要素を取得
const initialScreen = document.getElementById('initialScreen');
const accountCreation = document.getElementById('accountCreation');
const verificationScreen = document.getElementById('verification');

const startButton = document.getElementById('startButton');
const accountForm = document.getElementById('accountForm');
const submitAccountForm = document.getElementById('submitAccountForm');
const verifyButton = document.getElementById('verifyButton');

const emailInput = document.getElementById('email');
const verificationCodeInput = document.getElementById('verificationCode');

// 変数を初期化
let enteredEmail = '';
let sentVerificationCode = '';

// 1. 初期画面からアカウント作成画面への遷移
startButton.addEventListener('click', () => {
    initialScreen.style.display = 'none';
    accountCreation.style.display = 'block';
});

// 2. アカウント作成フォーム送信時の処理
accountForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // フォームのデフォルト動作を無効化

    const username = document.getElementById('username').value.trim();
    const email = emailInput.value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !email || !password) {
        alert('すべてのフィールドを入力してください');
        return;
    }

    enteredEmail = email; // 入力されたメールアドレスを保存

    // サーバー（Firebase Functions）にメール認証リクエストを送信
    try {
        const response = await fetch('https://us-central1-heavens-door-fd8b3.cloudfunctions.net/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: email }),
        });

        if (response.ok) {
            sentVerificationCode = await response.text(); // サーバーからのレスポンスでコードを受け取る
            accountCreation.style.display = 'none';
            verificationScreen.style.display = 'block';
            alert('認証コードをメールで送信しました');
        } else {
            const error = await response.text();
            alert('メール送信エラー: ' + error);
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('エラーが発生しました。後でもう一度お試しください。');
    }
});

// 3. 認証コード確認処理
verifyButton.addEventListener('click', () => {
    const enteredCode = verificationCodeInput.value.trim();

    if (enteredCode === sentVerificationCode) {
        alert('メール認証が成功しました！アカウント作成が完了しました。');
        verificationScreen.style.display = 'none';
        // 認証成功後の処理をここに追加（例: ログイン画面に遷移）
    } else {
        alert('認証コードが間違っています。もう一度お試しください。');
    }
});














const heading = document.querySelector('#heading');
const btn = document.querySelector('#btn');
const text = document.querySelector('#postContent');
const count = document.querySelector('#count');
const submitPost = document.querySelector('#submitPost');
const postsContainer = document.getElementById('postsContainer');
let posts = [];

// アニメーション設定
const keyframes = {
    borderRadius: [
        '20% 50% 50% 70%/50% 50% 70% 70%',
        '50% 20% 50% 50%/40% 40% 60% 60%',
        '50% 40% 20% 40%/40% 50% 50% 80%',
        '50% 50% 50% 20%/40% 40% 60% 60%',
    ],
};
const options = {
    duration: 8000,
    direction: 'alternate',
    iterations: Infinity,
};
heading.animate(keyframes, options);

// ダークモード・ライトモードの切り替え
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    btn.textContent = btn.textContent === 'ライトモードにする' ? 'ダークモードにする' : 'ライトモードにする';
});

// 投稿文字数カウントと警告
text.addEventListener('keyup', () => {
    count.textContent = text.value.length;
    text.classList.toggle('alert', text.value.length > 100);
});

// 投稿の追加
function addPost() {
    const postContent = text.value.trim();
    if (!postContent) {
        alert("投稿内容を入力してください");
        return;
    }

    const newPost = {
        id: Date.now().toString(),
        content: postContent,
        replies: [],
        likes: 0
    };

    posts.push(newPost);
    displayPosts();
    text.value = '';
    count.textContent = '0';
    showScreen('timeline');
}

// 投稿表示
function displayPosts() {
    postsContainer.innerHTML = ''; // タイムラインをクリア
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <p class="post-id">ID: user1234</p>
                <p class="post-time">${new Date().toLocaleString()}</p>
            </div>
            <div class="post-content">${post.content}</div>
            <button onclick="openReplyPage('${post.id}')">💬 リプライ</button>
            <button onclick="likePost('${post.id}')">👍 いいね ${post.likes}</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// いいねボタンの処理
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        displayPosts();
    }
}

// リプライページの表示
function openReplyPage(postId) {
    const post = posts.find(p => p.id === postId);
    const selectedPost = document.getElementById('selectedPost');
    selectedPost.innerHTML = `
        <div class="post-header">
            <p class="post-id">ID: user1234</p>
            <p class="post-time">${new Date().toLocaleString()}</p>
        </div>
        <div class="post-content">${post.content}</div>
    `;
    showScreen('replyPage');
}

// 画面切り替え関数
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}

// 投稿ボタンの処理
submitPost.addEventListener('click', addPost);

// 初期表示設定
showScreen('timeline'); // 初期表示としてタイムラインを表示









// リプライページを開く
function openReplyPage(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        document.getElementById('selectedPost').innerHTML = `<p>${post.content}</p>`;
        document.getElementById('repliesContainer').innerHTML = post.replies.map(reply => `<p>${reply}</p>`).join('');
        document.getElementById('replyPage').dataset.postId = postId;
        showScreen('replyPage');
    }
}

// リプライを投稿する
function submitReply() {
    const postId = document.getElementById('replyPage').dataset.postId;
    const post = posts.find(p => p.id === postId);
    const replyContent = document.getElementById('replyContent').value;

    if (replyContent.trim() && post) {
        post.replies.push(replyContent);
        document.getElementById('repliesContainer').innerHTML = post.replies.map(reply => `<p>${reply}</p>`).join('');
        document.getElementById('replyContent').value = '';
    }
}

// いいねを押す
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        displayPosts();
    }
}




// タイムラインに戻る
function closeReplyPage() {
    showScreen('timeline');
}

// 画面を表示する
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

// イベントリスナーを設定
document.getElementById('submitPost').addEventListener('click', addPost);
document.getElementById('postReply').addEventListener('click', submitReply);
document.getElementById('backToTimeline').addEventListener('click', closeReplyPage);


// リプライ投稿ボタンとタイムライン戻るボタンのクリックイベント
document.getElementById('backToTimeline').addEventListener('click', () => {
    // ボタンのアニメーションが終了した後にタイムラインに戻る処理を書く
    setTimeout(() => {
        showScreen('timeline');
    }, 400); // アニメーションの時間に合わせて遅延
});

document.getElementById('postReply').addEventListener('click', () => {
    // リプライを投稿する処理を書く
    submitReply();
});



// プロフィールアイコン更新
function updateProfileIcon() {
    const fileInput = document.getElementById('fileInput');
    const profileIcon = document.getElementById('profileIcon');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = e => profileIcon.src = e.target.result;
        reader.readAsDataURL(file);
    }
}

// プロフィール編集機能
function editProfile() {
    document.getElementById('newName').value = document.getElementById('profileName').textContent.replace('名前: ', '');
    document.getElementById('newId').value = document.getElementById('profileId').textContent.replace('ID: ', '');
    document.getElementById('newBio').value = document.getElementById('profileBio').textContent.replace('自己紹介: ', '');
    document.getElementById('editProfileForm').style.display = 'block';
}

function saveProfile() {
    document.getElementById('profileName').innerHTML = "名前: " + document.getElementById('newName').value;
    document.getElementById('profileId').innerHTML = "ID: " + document.getElementById('newId').value;
    document.getElementById('profileBio').innerHTML = "自己紹介: " + document.getElementById('newBio').value;
    document.getElementById('editProfileForm').style.display = 'none';
}