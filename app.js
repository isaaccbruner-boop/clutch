const DRILLS = [

  {

    title: "Form Shooting",

    cat: "Shooting",

    level: "Beginner",

    duration: "10 min",

    emoji: "🏀"

  },

  {

    title: "5-Spot Shooting",

    cat: "Shooting",

    level: "Intermediate",

    duration: "15 min",

    emoji: "🔥"

  },

  {

    title: "Two-Ball Pounds",

    cat: "Ball Handling",

    level: "Beginner",

    duration: "8 min",

    emoji: "🏀"

  },

  {

    title: "Cone Crossovers",

    cat: "Ball Handling",

    level: "Intermediate",

    duration: "12 min",

    emoji: "⚡"

  },

  {

    title: "Mikan Drill",

    cat: "Finishing",

    level: "Beginner",

    duration: "10 min",

    emoji: "💪"

  },

  {

    title: "Euro Step Series",

    cat: "Finishing",

    level: "Advanced",

    duration: "15 min",

    emoji: "🔥"

  },

  {

    title: "Defensive Slides",

    cat: "Defense",

    level: "Intermediate",

    duration: "10 min",

    emoji: "🛡️"

  },

  {

    title: "Change of Pace",

    cat: "Ball Handling",

    level: "Intermediate",

    duration: "10 min",

    emoji: "⚡"

  }

];

let posts = [

  {

    id: 1,

    user: "Isaac",

    handle: "@isaac",

    caption: "Shooting workout today. 100 shots. 🔥",

    likes: 24,

    comments: 6,

    video: false

  },

  {

    id: 2,

    user: "Jaylen",

    handle: "@jay_ball",

    caption: "Working on my handles today 🏀",

    likes: 18,

    comments: 3,

    video: false

  },

  {

    id: 3,

    user: "Mason",

    handle: "@masonb23",

    caption: "Getting reps in before the game.",

    likes: 31,

    comments: 8,

    video: false

  }

];

let selectedMedia = null;

let postType = "Workout";

const app = document.getElementById("app") || document.body;

function esc(value) {

  return String(value).replace(/[&<>"']/g, function (char) {

    return {

      "&": "&amp;",

      "<": "&lt;",

      ">": "&gt;",

      '"': "&quot;",

      "'": "&#039;"

    }[char];

  });

}

function injectStyles() {

  if (document.getElementById("clutch-styles")) return;

  const style = document.createElement("style");

  style.id = "clutch-styles";

  style.textContent = `

    * {

      box-sizing: border-box;

    }

    body {

      margin: 0;

      background: #090909;

      color: white;

      font-family: Arial, Helvetica, sans-serif;

    }

    button,

    input,

    textarea {

      font: inherit;

    }

    button {

      cursor: pointer;

    }

    .clutch-shell {

      min-height: 100vh;

      padding-bottom: 105px;

    }

    .clutch-header {

      height: 86px;

      border-bottom: 1px solid #292929;

      display: flex;

      align-items: center;

      justify-content: space-between;

      padding: 0 30px;

      background: #101010;

      position: sticky;

      top: 0;

      z-index: 10;

    }

    .logo {

      font-size: 31px;

      font-weight: 900;

      font-style: italic;

      letter-spacing: -1px;

    }

    .header-icons {

      display: flex;

      gap: 22px;

      font-size: 25px;

      color: #ddd;

    }

    .content {

      padding: 42px 30px 20px;

      max-width: 900px;

      margin: auto;

    }

    .title {

      font-size: 38px;

      margin: 0 0 38px;

      font-weight: 800;

    }

    .post {

      background: #171717;

      border: 1px solid #303030;

      border-radius: 30px;

      padding: 28px;

      margin-bottom: 25px;

    }

    .post-user {

      display: flex;

      align-items: center;

      gap: 15px;

      margin-bottom: 28px;

    }

    .avatar {

      width: 58px;

      height: 58px;

      border-radius: 50%;

      background: #292929;

      display: grid;

      place-items: center;

      font-weight: 800;

      color: #ff641c;

      font-size: 24px;

    }

    .username {

      font-size: 22px;

      font-weight: 800;

    }

    .handle {

      color: #888;

      font-size: 17px;

      margin-top: 4px;

    }

    .caption {

      font-size: 22px;

      line-height: 1.35;

      margin-bottom: 24px;

    }

    .video-box {

      height: 370px;

      background: #252525;

      border-radius: 25px;

      display: grid;

      place-items: center;

      color: #aaa;

      font-size: 22px;

      margin-bottom: 22px;

    }

    .video-box button {

      background: transparent;

      border: 0;

      color: #bbb;

      font-size: 21px;

    }

    .post-actions {

      display: flex;

      gap: 28px;

      color: #bbb;

      font-size: 18px;

    }

    .action-button {

      background: none;

      border: 0;

      color: #bbb;

      padding: 0;

    }

    .action-button.liked {

      color: #ff641c;

    }

    .drill-card {

      background: #171717;

      border: 1px solid #303030;

      border-radius: 25px;

      padding: 25px;

      margin-bottom: 18px;

    }

    .drill-top {

      display: flex;

      justify-content: space-between;

      gap: 15px;

    }

    .drill-emoji {

      font-size: 42px;

      margin-bottom: 10px;

    }

    .drill-title {

      font-size: 25px;

      font-weight: 800;

    }

    .drill-meta {

      color: #999;

      margin-top: 9px;

      line-height: 1.5;

    }

    .orange-button {

      border: 0;

      background: #ff641c;

      color: #090909;

      font-weight: 800;

      border-radius: 15px;

      padding: 14px 20px;

    }

    .outline-button {

      border: 1px solid #555;

      background: #191919;

      color: white;

      font-weight: 700;

      border-radius: 15px;

      padding: 13px 18px;

    }

    .random-button {

      width: 100%;

      margin-bottom: 25px;

      font-size: 18px;

      padding: 17px;

    }

    .create-box {

      background: #171717;

      border: 1px solid #303030;

      border-radius: 28px;

      padding: 30px;

    }

    .file-input {

      width: 100%;

      padding: 17px;

      background: #101010;

      border: 1px solid #444;

      border-radius: 18px;

      color: white;

      margin-bottom: 25px;

    }

    textarea {

      width: 100%;

      min-height: 160px;

      resize: vertical;

      background: #101010;

      border: 1px solid #444;

      border-radius: 18px;

      padding: 20px;

      color: white;

      outline: none;

      margin-bottom: 20px;

    }

    textarea::placeholder {

      color: #888;

    }

    .full-button {

      width: 100%;

      font-size: 18px;

      padding: 18px;

    }

    .profile-card {

      background: #171717;

      border: 1px solid #303030;

      border-radius: 28px;

      padding: 30px;

    }

    .profile-avatar {

      width: 85px;

      height: 85px;

      border-radius: 50%;

      background: #292929;

      display: grid;

      place-items: center;

      font-size: 34px;

      color: #ff641c;

      font-weight: 900;

      margin-bottom: 18px;

    }

    .profile-name {

      font-size: 30px;

      font-weight: 800;

    }

    .profile-handle {

      color: #888;

      font-size: 18px;

      margin-bottom: 30px;

    }

    .stat-row {

      display: flex;

      gap: 35px;

      margin-bottom: 25px;

    }

    .stat strong {

      display: block;

      font-size: 23px;

    }

    .stat span {

      color: #888;

    }

    .empty {

      color: #888;

      font-size: 18px;

    }

    .bottom-nav {

      position: fixed;

      bottom: 0;

      left: 0;

      right: 0;

      height: 100px;

      background: #111;

      border-top: 1px solid #292929;

      display: flex;

      justify-content: space-around;

      align-items: center;

      z-index: 20;

    }

    .nav-button {

      background: none;

      border: 0;

      color: #aaa;

      display: flex;

      flex-direction: column;

      align-items: center;

      gap: 7px;

      font-size: 15px;

    }

    .nav-icon {

      font-size: 23px;

    }

    .plus-button {

      width: 68px;

      height: 68px;

      border-radius: 50%;

      border: 0;

      background: #ff641c;

      color: #090909;

      font-size: 42px;

      line-height: 1;

    }

    .toast {

      position: fixed;

      left: 50%;

      bottom: 120px;

      transform: translateX(-50%);

      background: #292929;

      color: white;

      padding: 14px 22px;

      border-radius: 14px;

      z-index: 50;

      font-weight: 700;

    }

    @media (max-width: 600px) {

      .content {

        padding: 35px 30px 20px;

      }

      .title {

        font-size: 36px;

      }

      .post {

        padding: 27px;

      }

      .video-box {

        height: 330px;

      }

      .drill-top {

        flex-direction: column;

      }

    }

  `;

  document.head.appendChild(style);

}

function showToast(message) {

  const old = document.querySelector(".toast");

  if (old) old.remove();

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2200);

}

function postCard(post) {

  return `

    <article class="post">

      <div class="post-user">

        <div class="avatar">${esc(post.user.charAt(0))}</div>

        <div>

          <div class="username">${esc(post.user)}</div>

          <div class="handle">${esc(post.handle)} · today</div>

        </div>

      </div>

      <div class="caption">${esc(post.caption)}</div>

      <div class="video-box">

        ${post.video

          ? `<button onclick="showToast('Video player ready for your uploaded video ▶️')">▶ Workout video</button>`

          : `<button onclick="showToast('Workout video preview')">▶ Workout video</button>`

        }

      </div>

      <div class="post-actions">

        <button class="action-button" onclick="toggleLike(${post.id}, this)">

          ♡ ${post.likes}

        </button>

        <button class="action-button" onclick="showToast('Comments coming next 💬')">

          💬 ${post.comments}

        </button>

        <button class="action-button" onclick="sharePost(${post.id})">

          ↗ Share

        </button>

      </div>

    </article>

  `;

}

function drillCard(drill) {

  return `

    <div class="drill-card">

      <div class="drill-top">

        <div>

          <div class="drill-emoji">${drill.emoji}</div>

          <div class="drill-title">${esc(drill.title)}</div>

          <div class="drill-meta">

            ${esc(drill.cat)} · ${esc(drill.level)} · ${esc(drill.duration)}

          </div>

        </div>

        <button class="orange-button"

          onclick="startDrill('${esc(drill.title)}')">

          Start

        </button>

      </div>

    </div>

  `;

}

function randomDrill() {

  return DRILLS[Math.floor(Math.random() * DRILLS.length)];

}

function startDrill(title) {

  showToast(`Starting ${title} 🏀`);

}

function showHome() {

  app.innerHTML = `

    <div class="clutch-shell">

      <header class="clutch-header">

        <div class="logo">CLUTCH 🏀</div>

        <div class="header-icons">

          <span>⌕</span>

          <span>♧</span>

        </div>

      </header>

      <main class="content">

        <h1 class="title">Following</h1>

        ${posts.map(postCard).join("")}

      </main>

      ${navigation("home")}

    </div>

  `;

}

function showDiscover() {

  const first = randomDrill();

  app.innerHTML = `

    <div class="clutch-shell">

      <header class="clutch-header">

        <div class="logo">CLUTCH 🏀</div>

        <div class="header-icons">

          <span>⌕</span>

          <span>♧</span>

        </div>

      </header>

      <main class="content">

        <h1 class="title">Discover</h1>

        <button class="orange-button random-button"

          onclick="showRandomDrill()">

          🎲 Show Me a Random Drill

        </button>

        <div id="random-drill">

          ${drillCard(first)}

        </div>

        <h2>All Drills</h2>

        ${DRILLS.map(drillCard).join("")}

      </main>

      ${navigation("discover")}

    </div>

  `;

}

function showRandomDrill() {

  const drill = randomDrill();

  const box = document.getElementById("random-drill");

  if (box) {

    box.innerHTML = drillCard(drill);

    box.scrollIntoView({

      behavior: "smooth",

      block: "center"

    });

  }

}

function showFriends() {

  app.innerHTML = `

    <div class="clutch-shell">

      <header class="clutch-header">

        <div class="logo">CLUTCH 🏀</div>

        <div class="header-icons">

          <span>⌕</span>

          <span>♧</span>

        </div>

      </header>

      <main class="content">

        <h1 class="title">Friends</h1>

        <div class="profile-card">

          <h2>Your Basketball Community</h2>

          <p class="empty">

            Follow players and teammates to see their workouts,

            progress and posts here.

          </p>

          <button class="orange-button"

            onclick="showToast('Friend search coming next 🔎')">

            Find Friends

          </button>

        </div>

      </main>

      ${navigation("friends")}

    </div>

  `;

}

function showProfile() {

  app.innerHTML = `

    <div class="clutch-shell">

      <header class="clutch-header">

        <div class="logo">CLUTCH 🏀</div>

        <div class="header-icons">

          <span>⌕</span>

          <span>♧</span>

        </div>

      </header>

      <main class="content">

        <h1 class="title">Profile</h1>

        <div class="profile-card">

          <div class="profile-avatar">I</div>

          <div class="profile-name">Isaac</div>

          <div class="profile-handle">@isaac</div>

          <div class="stat-row">

            <div class="stat">

              <strong>${posts.length}</strong>

              <span>Posts</span>

            </div>

            <div class="stat">

              <strong>0</strong>

              <span>Followers</span>

            </div>

            <div class="stat">

              <strong>0</strong>

              <span>Following</span>

            </div>

          </div>

          <button class="outline-button"

            onclick="showToast('Profile editing coming next ✏️')">

            Edit Profile

          </button>

        </div>

      </main>

      ${navigation("profile")}

    </div>

  `;

}

function showCreate() {

  app.innerHTML = `

    <div class="clutch-shell">

      <header class="clutch-header">

        <div class="logo">CLUTCH 🏀</div>

        <div class="header-icons">

          <span>⌕</span>

          <span>♧</span>

        </div>

      </header>

      <main class="content">

        <h1 class="title">Create</h1>

        <div class="create-box">

          <input

            class="file-input"

            id="mediaInput"

            type="file"

            accept="image/*,video/*"

            onchange="handleFile(event)"

          />

          <textarea

            id="captionInput"

            placeholder="What are you working on?"

          ></textarea>

          <button

            class="orange-button full-button"

            onclick="createPost()">

            Post

          </button>

        </div>

      </main>

      ${navigation("create")}

    </div>

  `;

}

function navigation(active) {

  return `

    <nav class="bottom-nav">

      <button class="nav-button"

        onclick="showHome()">

        <span class="nav-icon">⌂</span>

        <span>Home</span>

      </button>

      <button class="nav-button"

        onclick="showDiscover()">

        <span class="nav-icon">⌕</span>

        <span>Discover</span>

      </button>

      <button

        class="plus-button"

        onclick="showCreate()">

        +

      </button>

      <button class="nav-button"

        onclick="showFriends()">

        <span class="nav-icon">♧</span>

        <span>Friends</span>

      </button>

      <button class="nav-button"

        onclick="showProfile()">

        <span class="nav-icon">○</span>

        <span>Profile</span>

      </button>

    </nav>

  `;

}

function handleFile(event) {

  const file = event.target.files[0];

  if (!file) {

    selectedMedia = null;

    return;

  }

  selectedMedia = file;

  showToast(

    file.type.startsWith("video/")

      ? "Video selected 🎥"

      : "Photo selected 📸"

  );

}

function createPost() {

  const captionInput = document.getElementById("captionInput");

  if (!captionInput) return;

  const caption = captionInput.value.trim();

  if (!caption && !selectedMedia) {

    showToast("Add a photo, video, or caption first.");

    return;

  }

  const newPost = {

    id: Date.now(),

    user: "Isaac",

    handle: "@isaac",

    caption: caption || "New basketball post 🏀",

    likes: 0,

    comments: 0,

    video: selectedMedia

      ? selectedMedia.type.startsWith("video/")

      : false

  };

  posts.unshift(newPost);

  selectedMedia = null;

  showToast("Demo post created! 🔥");

  setTimeout(() => {

    showHome();

  }, 800);

}

function toggleLike(id, button) {

  const post = posts.find(p => p.id === id);

  if (!post) return;

  post.likes++;

  button.classList.add("liked");

  button.innerHTML = `♥ ${post.likes}`;

}

function sharePost(id) {

  const post = posts.find(p => p.id === id);

  if (!post) return;

  if (navigator.share) {

    navigator.share({

      title: "Clutch",

      text: post.caption

    }).catch(() => {});

  } else {

    showToast("Post ready to share 🔗");

  }

}

window.showHome = showHome;

window.showDiscover = showDiscover;

window.showFriends = showFriends;

window.showProfile = showProfile;

window.showCreate = showCreate;

window.showRandomDrill = showRandomDrill;

window.startDrill = startDrill;

window.handleFile = handleFile;

window.createPost = createPost;

window.toggleLike = toggleLike;

window.sharePost = sharePost;

injectStyles();

showHome();
