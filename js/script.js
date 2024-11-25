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






// Firebase Authenticationの初期化（すでに設定されていれば必要ありません）
const auth = firebase.auth();

// アカウント作成フォームを処理
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const dob = document.getElementById('signUpDob').value;

    try {
        // メールアドレスで新しいユーザーを作成
        const userCredential = await auth.createUserWithEmailAndPassword(email, 'initialPassword'); // ここでは仮の初期パスワード
        const user = userCredential.user;

        // ユーザー情報をFirestoreに保存（必要な場合）
        await firebase.firestore().collection('users').doc(user.uid).set({
            name: name,
            email: email,
            dob: dob
        });

        // ユーザー登録が完了した後の処理
        alert('アカウント作成完了！認証コードをメールでお送りします。');
        sendVerificationEmail(user); // 認証メールを送信

    } catch (error) {
        // エラーメッセージを表示
        const errorMessage = error.message;
        document.getElementById('error-message').innerText = errorMessage;
        document.getElementById('error-message').style.display = 'block';
    }
});

// 認証メールを送信する関数
async function sendVerificationEmail(user) {
    await user.sendEmailVerification();
    alert('メールで認証コードが送信されました。');
}







auth.onAuthStateChanged(user => {
    if (user && user.emailVerified) {
        // ログイン済みで認証も完了している場合
        console.log('ユーザー認証完了');
        showDashboard(); // ダッシュボード画面に遷移
    } else {
        // ユーザーが未認証またはログアウト状態の場合
        showSignUp(); // アカウント作成画面に遷移
    }
});

function showDashboard() {
    // ダッシュボード画面を表示する処理
}

function showSignUp() {
    // アカウント作成画面を表示する処理
}






// Firebaseの設定情報
const firebaseConfig = {
    apiKey: "AIzaSyCK_nCJ_n-i05va7fN5nnW4YmmCPprHvik",
    authDomain: "heavens-door-fd8b3.firebaseapp.com",
    projectId: "heavens-door-fd8b3",
    storageBucket: "heavens-door-fd8b3.appspot.com",
    messagingSenderId: "970440481558",
    appId: "1:970440481558:web:xxxxxxxxxx"
  };
  
  // Firebaseアプリの初期化
  const app = firebase.initializeApp(firebaseConfig);
  
  // Firestoreのインスタンスを取得
  const db = firebase.firestore();
  


  function addUserToFirestore(userId, name, email) {
    db.collection("users").doc(userId).set({
      name: name,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("ユーザー情報が正常に保存されました");
    })
    .catch((error) => {
      console.error("エラーが発生しました: ", error);
    });
  }
  




  function registerUser() {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
  
    // Firebase Authenticationでユーザー作成
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Firestoreにユーザー情報を保存
        addUserToFirestore(user.uid, name, email);
      })
      .catch((error) => {
        console.error("登録時のエラー: ", error);
      });
  }
  



  document.addEventListener("DOMContentLoaded", () => {
    const user = firebase.auth().currentUser;

    if (user) {
        // ユーザーがログインしている場合、通常画面を表示
        document.getElementById("app").style.display = "block";
        document.getElementById("register").style.display = "none";
    } else {
        // ユーザーがログインしていない場合、アカウント作成画面を表示
        document.getElementById("app").style.display = "none";
        document.getElementById("register").style.display = "block";
    }
});
