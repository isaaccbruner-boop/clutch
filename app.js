const DRILLS = [

  {

    title: "Form Shooting",

    cat: "Shooting",

    level: "Beginner",

    description: "Build a consistent shooting motion close to the basket."

  },

  {

    title: "5-Spot Shooting",

    cat: "Shooting",

    level: "Intermediate",

    description: "Work through five spots around the court."

  },

  {

    title: "Two-Ball Pounds",

    cat: "Ball Handling",

    level: "Beginner",

    description: "Control two basketballs while improving your handle."

  },

  {

    title: "Cone Crossovers",

    cat: "Ball Handling",

    level: "Intermediate",

    description: "Practice quick crossovers while moving through cones."

  },

  {

    title: "Mikan Drill",

    cat: "Finishing",

    level: "Beginner",

    description: "Improve touch and finishing around the basket."

  },

  {

    title: "Floater Series",

    cat: "Finishing",

    level: "Intermediate",

    description: "Develop touch with floaters from different angles."

  },

  {

    title: "Defensive Slides",

    cat: "Defense",

    level: "Beginner",

    description: "Build better lateral movement and defensive footwork."

  },

  {

    title: "Closeout Drill",

    cat: "Defense",

    level: "Intermediate",

    description: "Practice closing out under control and contesting shots."

  },

  {

    title: "Full-Court Sprint",

    cat: "Conditioning",

    level: "Beginner",

    description: "Build basketball-specific conditioning."

  },

  {

    title: "Change of Pace",

    cat: "Ball Handling",

    level: "Advanced",

    description: "Use changes of speed to create separation."

  }

];

const POSTS = [

  {

    name: "Isaac",

    username: "@isaac",

    text: "Getting some work in 🏀",

    likes: 12,

    liked: false

  },

  {

    name: "Jaylen",

    username: "@jay_ball",

    text: "Putting in work today 💪",

    likes: 8,

    liked: false

  },

  {

    name: "Marcus",

    username: "@marcushoops",

    text: "Game day tomorrow. Locked in. 🏀",

    likes: 21,

    liked: false

  }

];

let currentCategory = "All";

let currentDrill = null;

let selectedPostType = "Workout";

let uploadedFile = null;

function app() {

  return document.getElementById("app");

}

function show(page) {

  if (page === "home") showHome();

  else if (page === "discover") showDiscover();

  else if (page === "friends") showFriends();

  else if (page === "profile") showProfile();

  else if (page === "create") showCreate();

  else showHome();

  updateNav(page);

  window.scrollTo(0, 0);

}

function updateNav(page) {

  document.querySelectorAll(".bottom-nav button").forEach(button => {

    button.classList.remove("active");

  });

  const active = document.querySelector(

    `.bottom-nav button[data-tab="${page}"]`

  );

  if (active) active.classList.add("active");

}

function showHome() {

  app().innerHTML = `

    <section class="page home-page">

      <div class="eyebrow">WELCOME BACK</div>

      <h1>Home</h1>

      <p class="subtitle">

        See what's happening on the court.

      </p>

      <section class="random-drill">

        <div class="eyebrow">RANDOM DRILL</div>

        <h2>Need something to work on?</h2>

        <p>

          Get a random basketball drill whenever you need one.

        </p>

        <button class="primary-btn" onclick="showRandomDrill()">

          Give Me a Drill 🏀

        </button>

        <div id="random-drill-result"></div>

      </section>

      <section class="latest-section">

        <h2>Latest</h2>

        <div id="home-posts">

          ${renderPosts()}

        </div>

      </section>

    </section>

  `;

}

function renderPosts() {

  return POSTS.map((post, index) => `

    <article class="post-card">

      <div class="post-header">

        <div class="avatar">

          ${post.name.charAt(0)}

        </div>

        <div>

          <strong>${escapeHTML(post.name)}</strong>

          <span>${escapeHTML(post.username)}</span>

        </div>

      </div>

      <div class="post-content">

        <p>${escapeHTML(post.text)}</p>

      </div>

      <div class="post-actions">

        <button onclick="toggleLike(${index})">

          ${post.liked ? "♥" : "♡"} ${post.likes}

        </button>

        <button onclick="sharePost(${index})">

          ↗ Share

        </button>

      </div>

    </article>

  `).join("");

}

function showRandomDrill() {

  const drill =

    DRILLS[Math.floor(Math.random() * DRILLS.length)];

  currentDrill = drill;

  const container =

    document.getElementById("random-drill-result");

  if (!container) return;

  container.innerHTML = `

    <div class="drill-card random-result">

      <div class="drill-top">

        <span>${escapeHTML(drill.cat)}</span>

        <span>${escapeHTML(drill.level)}</span>

      </div>

      <h3>${escapeHTML(drill.title)}</h3>

      <p>${escapeHTML(drill.description)}</p>

      <button class="secondary-btn"

        onclick="startDrill('${escapeAttribute(drill.title)}')">

        Start Drill

      </button>

    </div>

  `;

}

function startDrill(title) {

  const drill = DRILLS.find(item => item.title === title);

  if (!drill) return;

  app().innerHTML = `

    <section class="page">

      <button class="back-btn" onclick="showHome()">

        ← Back

      </button>

      <div class="eyebrow">DRILL</div>

      <h1>${escapeHTML(drill.title)}</h1>

      <div class="drill-card">

        <div class="drill-top">

          <span>${escapeHTML(drill.cat)}</span>

          <span>${escapeHTML(drill.level)}</span>

        </div>

        <p>${escapeHTML(drill.description)}</p>

<div class="video-box">

  <h2>Watch a Demo 🏀</h2>

  <button class="watch-btn" onclick="window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(drill.title + ' basketball drill'), '_blank')">

    ▶ Watch Drill Video

  </button>

</div>

        <div class="timer-box">

          <strong id="timer">60</strong>

          <span>seconds</span>

        </div>

        <button class="primary-btn" onclick="runTimer()">

          Start 60 Second Timer

        </button>

      </div>

    </section>

  `;

  window.scrollTo(0, 0);

}

let timerInterval = null;

function runTimer() {

  clearInterval(timerInterval);

  let seconds = 60;

  const timer = document.getElementById("timer");

  if (!timer) return;

  timer.textContent = seconds;

  timerInterval = setInterval(() => {

    seconds--;

    timer.textContent = seconds;

    if (seconds <= 0) {

      clearInterval(timerInterval);

      showToast("Drill complete! Great work 🏀");

    }

  }, 1000);

}

function showDiscover() {

  app().innerHTML = `

    <section class="page">

      <div class="eyebrow">EXPLORE</div>

      <h1>Discover</h1>

      <p class="subtitle">

        Find drills and workouts to improve your game.

      </p>

      <div class="category-row">

        ${["All", "Shooting", "Ball Handling", "Finishing", "Defense", "Conditioning"]

          .map(category => `

            <button

              class="category-btn ${currentCategory === category ? "selected" : ""}"

              onclick="filterCategory('${escapeAttribute(category)}')">

              ${escapeHTML(category)}

            </button>

          `).join("")}

      </div>

      <div id="drill-list">

        ${renderDrills()}

      </div>

    </section>

  `;

}

function renderDrills() {

  const drills =

    currentCategory === "All"

      ? DRILLS

      : DRILLS.filter(drill => drill.cat === currentCategory);

  if (!drills.length) {

    return `

      <div class="empty-state">

        No drills found.

      </div>

    `;

  }

  return drills.map(drill => `

    <article class="drill-card">

      <div class="drill-top">

        <span>${escapeHTML(drill.cat)}</span>

        <span>${escapeHTML(drill.level)}</span>

      </div>

      <h3>${escapeHTML(drill.title)}</h3>

      <p>${escapeHTML(drill.description)}</p>

      <button

        class="secondary-btn"

        onclick="startDrill('${escapeAttribute(drill.title)}')">

        View Drill

      </button>

    </article>

  `).join("");

}

function filterDrills(searchTerm) {

  const list = document.getElementById("drill-list");

  if (!list) return;

  const term = String(searchTerm || "").toLowerCase();

  const drills = DRILLS.filter(drill => {

    const matchesCategory =

      currentCategory === "All" ||

      drill.cat === currentCategory;

    const matchesSearch =

      drill.title.toLowerCase().includes(term) ||

      drill.description.toLowerCase().includes(term) ||

      drill.cat.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;

  });

  list.innerHTML = drills.length

    ? drills.map(drill => `

        <article class="drill-card">

          <div class="drill-top">

            <span>${escapeHTML(drill.cat)}</span>

            <span>${escapeHTML(drill.level)}</span>

          </div>

          <h3>${escapeHTML(drill.title)}</h3>

          <p>${escapeHTML(drill.description)}</p>

          <button

            class="secondary-btn"

            onclick="startDrill('${escapeAttribute(drill.title)}')">

            View Drill

          </button>

        </article>

      `).join("")

    : `<div class="empty-state">No drills found.</div>`;

}

function filterCategory(category) {

  currentCategory = category;

  if (typeof showDiscover === "function") {

    showDiscover();

  }

}

function showFriends() {

  app().innerHTML = `

    <section class="page">

      <div class="eyebrow">YOUR PEOPLE</div>

      <h1>Friends</h1>

      <p class="subtitle">

        See what your friends are working on.

      </p>

      <div class="friend-card">

        <div class="avatar">J</div>

        <div>

          <strong>Jaylen</strong>

          <span>@jay_ball</span>

        </div>

        <button class="secondary-btn" onclick="showToast('Jaylen added!')">

          Add

        </button>

      </div>

      <div class="friend-card">

        <div class="avatar">M</div>

        <div>

          <strong>Marcus</strong>

          <span>@marcushoops</span>

        </div>

        <button class="secondary-btn" onclick="showToast('Marcus added!')">

          Add

        </button>

      </div>

      <div class="friend-card">

        <div class="avatar">D</div>

        <div>

          <strong>Daniel</strong>

          <span>@dhoops</span>

        </div>

        <button class="secondary-btn" onclick="showToast('Daniel added!')">

          Add

        </button>

      </div>

    </section>

  `;

}

function showProfile() {

  app().innerHTML = `

    <section class="page profile-page">

      <div class="profile-hero">

        <div class="profile-avatar">

          I

        </div>

        <h1>Isaac</h1>

        <p>@isaac</p>

      </div>

      <div class="profile-stats">

        <div>

          <strong>12</strong>

          <span>Posts</span>

        </div>

        <div>

          <strong>48</strong>

          <span>Followers</span>

        </div>

        <div>

          <strong>31</strong>

          <span>Following</span>

        </div>

      </div>

      <h2>Your Activity</h2>

      ${renderPosts()}

    </section>

  `;

}

function showCreate() {

  app().innerHTML = `

    <section class="page create-page">

      <button class="back-btn" onclick="showHome()">

        ← Back

      </button>

      <div class="eyebrow">CREATE</div>

      <h1>Share Your Work</h1>

      <p class="subtitle">

        Post a workout, drill, or basketball moment.

      </p>

      <div class="type-selector">

        <button

          class="${selectedPostType === "Workout" ? "selected" : ""}"

          onclick="setType('Workout')">

          Workout

        </button>

        <button

          class="${selectedPostType === "Drill" ? "selected" : ""}"

          onclick="setType('Drill')">

          Drill

        </button>

        <button

          class="${selectedPostType === "Game" ? "selected" : ""}"

          onclick="setType('Game')">

          Game

        </button>

      </div>

      <div class="create-box">

        <textarea

          id="post-text"

          placeholder="What are you working on?"

          rows="5"></textarea>

        <label class="upload-box">

          <input

            id="video-file"

            type="file"

            accept="video/*,image/*"

            onchange="handleFile(this.files[0])">

          <span>＋ Add Photo or Video</span>

        </label>

        <div id="file-name"></div>

        <button class="primary-btn" onclick="createPost()">

          Post ${escapeHTML(selectedPostType)}

        </button>

      </div>

    </section>

  `;

}

function handleFile(file) {

  uploadedFile = file || null;

  const display = document.getElementById("file-name");

  if (!display) return;

  if (!file) {

    display.textContent = "";

    return;

  }

  display.textContent = `Selected: ${file.name}`;

}

function setType(type) {

  selectedPostType = type;

  showCreate();

}

function createPost() {

  const textarea = document.getElementById("post-text");

  if (!textarea) return;

  const text = textarea.value.trim();

  if (!text && !uploadedFile) {

    showToast("Add something before posting.");

    return;

  }

  POSTS.unshift({

    name: "Isaac",

    username: "@isaac",

    text: text || `${selectedPostType} posted 🏀`,

    likes: 0,

    liked: false

  });

  uploadedFile = null;

  showToast("Post created! 🏀");

  setTimeout(() => {

    showHome();

  }, 500);

}

function toggleLike(index) {

  const post = POSTS[index];

  if (!post) return;

  if (post.liked) {

    post.likes--;

    post.liked = false;

  } else {

    post.likes++;

    post.liked = true;

  }

  showHome();

}

async function sharePost(index) {

  const post = POSTS[index];

  if (!post) return;

  const text =

    `${post.name}: ${post.text}`;

  if (navigator.share) {

    try {

      await navigator.share({

        title: "CLUTCH 🏀",

        text: text

      });

    } catch (error) {

      // User cancelled sharing.

    }

  } else if (navigator.clipboard) {

    try {

      await navigator.clipboard.writeText(text);

      showToast("Post copied!");

    } catch (error) {

      showToast("Sharing isn't available here.");

    }

  } else {

    showToast("Sharing isn't available here.");

  }

}

function showToast(message) {

  const toast = document.getElementById("toast");

  if (!toast) {

    alert(message);

    return;

  }

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}

function showToasts() {

  showToast("Welcome to CLUTCH 🏀");

}

function escapeHTML(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}

function escapeAttribute(value) {

  return String(value)

    .replace(/\\/g, "\\\\")

    .replace(/'/g, "\\'");

}

window.show = show;

window.showHome = showHome;

window.showDiscover = showDiscover;

window.showFriends = showFriends;

window.showProfile = showProfile;

window.showCreate = showCreate;

window.showRandomDrill = showRandomDrill;

window.startDrill = startDrill;

window.runTimer = runTimer;

window.handleFile = handleFile;

window.createPost = createPost;

window.setType = setType;

window.toggleLike = toggleLike;

window.sharePost = sharePost;

window.filterDrills = filterDrills;

window.filterCategory = filterCategory;

window.showToast = showToast;

window.showToasts = showToasts;

showHome();
