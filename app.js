
/* =========================================================
   CLUTCH — app.js
   Front-end app logic
   ========================================================= */

const DRILLS = [
  {
    title: "Form Shooting",
    cat: "Shooting",
    level: "Beginner",
    description: "Build a consistent shooting form close to the basket."
  },
  {
    title: "5-Spot Shooting",
    cat: "Shooting",
    level: "Intermediate",
    description: "Work through five shooting spots and focus on consistency."
  },
  {
    title: "Two-Ball Pounds",
    cat: "Ball Handling",
    level: "Beginner",
    description: "Control two basketballs while keeping your eyes up."
  },
  {
    title: "Cone Crossovers",
    cat: "Ball Handling",
    level: "Intermediate",
    description: "Practice quick crossovers and changes of direction."
  },
  {
    title: "Mikan Drill",
    cat: "Finishing",
    level: "Beginner",
    description: "Improve touch and finishing around the basket."
  },
  {
    title: "Euro Step Series",
    cat: "Finishing",
    level: "Advanced",
    description: "Practice controlled finishing with different footwork."
  },
  {
    title: "Defensive Slides",
    cat: "Defense",
    level: "Beginner",
    description: "Build defensive footwork and lateral quickness."
  },
  {
    title: "Closeout Drill",
    cat: "Defense",
    level: "Intermediate",
    description: "Practice closing out under control and staying in front."
  },
  {
    title: "Attack the Cone",
    cat: "Ball Handling",
    level: "Intermediate",
    description: "Attack a defender simulation with explosive moves."
  },
  {
    title: "Free Throw Routine",
    cat: "Shooting",
    level: "Beginner",
    description: "Create a repeatable free throw routine."
  }
];

let posts = [
  {
    id: 1,
    user: "Isaac",
    handle: "@isaac",
    caption: "Getting some work in 🏀",
    likes: 12,
    liked: false,
    media: null
  },
  {
    id: 2,
    user: "Jaylen",
    handle: "@jay_ball",
    caption: "Ball handling session.",
    likes: 8,
    liked: false,
    media: null
  },
  {
    id: 3,
    user: "Mason",
    handle: "@masonb23",
    caption: "Working on my finishing.",
    likes: 15,
    liked: false,
    media: null
  }
];

let selectedMedia = null;
let postType = "Workout";

const app = document.getElementById("app");

/* =========================================================
   HELPERS
   ========================================================= */

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

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function show(section) {
  if (!app) return;

  document.querySelectorAll(".bottom-nav button").forEach(button => {
    button.classList.remove("active");

    if (button.dataset.tab === section) {
      button.classList.add("active");
    }
  });

  if (section === "home") {
    showHome();
  }

  if (section === "discover") {
    showDiscover();
  }

  if (section === "friends") {
    showFriends();
  }

  if (section === "profile") {
    showProfile();
  }

  if (section === "create") {
    showCreate();
  }
}

function showHome() {
  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <p class="eyebrow">WELCOME BACK</p>
        <h1>Home</h1>
        <p class="muted">See what's happening on the court.</p>
      </div>

      <div class="random-drill-box">
        <div>
          <p class="eyebrow">RANDOM DRILL</p>
          <h2>Need something to work on?</h2>
          <p class="muted">
            Get a random basketball drill whenever you need one.
          </p>
        </div>

        <button class="primary-btn" onclick="showRandomDrill()">
          Give Me a Drill 🏀
        </button>
      </div>

      <div class="section-title">
        <h2>Latest</h2>
      </div>

      <div id="home-posts">
        ${posts.map(card).join("")}
      </div>
    </section>
  `;
}

function showDiscover() {
  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <p class="eyebrow">DISCOVER</p>
        <h1>Find Your Next Drill</h1>
        <p class="muted">Explore workouts and basketball content.</p>
      </div>

      <div class="search-box">
        <input
          id="drillSearch"
          type="search"
          placeholder="Search drills..."
          oninput="filterDrills(this.value)"
        >
      </div>

      <div class="category-row">
        <button onclick="filterCategory('All')">All</button>
        <button onclick="filterCategory('Shooting')">Shooting</button>
        <button onclick="filterCategory('Ball Handling')">Handles</button>
        <button onclick="filterCategory('Finishing')">Finishing</button>
        <button onclick="filterCategory('Defense')">Defense</button>
      </div>

      <div id="drill-list">
        ${DRILLS.map(drill).join("")}
      </div>
    </section>
  `;
}

function showFriends() {
  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <p class="eyebrow">COMMUNITY</p>
        <h1>Friends</h1>
        <p class="muted">See what your friends are working on.</p>
      </div>

      <div class="friend-list">
        <div class="friend-card">
          <div class="avatar">J</div>
          <div>
            <strong>Jaylen</strong>
            <p>@jay_ball</p>
          </div>
          <button onclick="showToast('Following Jaylen')">Follow</button>
        </div>

        <div class="friend-card">
          <div class="avatar">M</div>
          <div>
            <strong>Mason</strong>
            <p>@masonb23</p>
          </div>
          <button onclick="showToast('Following Mason')">Follow</button>
        </div>
      </div>

      <div class="section-title">
        <h2>Recent Posts</h2>
      </div>

      ${posts.map(card).join("")}
    </section>
  `;
}

function showProfile() {
  app.innerHTML = `
    <section class="page">
      <div class="profile-header">
        <div class="large-avatar">I</div>

        <h1>Isaac</h1>
        <p class="muted">@isaac</p>

        <div class="profile-stats">
          <div>
            <strong>${posts.length}</strong>
            <span>Posts</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Followers</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Following</span>
          </div>
        </div>
      </div>

      <div class="section-title">
        <h2>Your Posts</h2>
      </div>

      ${posts.filter(p => p.handle === "@isaac").map(card).join("") ||
        `<p class="muted">You haven't posted anything yet.</p>`}
    </section>
  `;
}

function showCreate() {
  app.innerHTML = `
    <section class="page create-page">
      <div class="page-heading">
        <p class="eyebrow">CREATE</p>
        <h1>Create</h1>
        <p class="muted">Share your work with the CLUTCH community.</p>
      </div>

      <div class="create-card">

        <div class="upload-area">
          <input
            id="mediaInput"
            type="file"
            accept="image/*,video/*"
            onchange="handleFile(event)"
          >

          <label for="mediaInput" class="upload-button">
            📸 Choose Photo or Video
          </label>

          <div id="mediaPreview"></div>
        </div>

        <div class="post-type-row">
          <button
            class="type-button active"
            onclick="setType('Workout', this)"
          >
            Workout
          </button>

          <button
            class="type-button"
            onclick="setType('Game', this)"
          >
            Game
          </button>

          <button
            class="type-button"
            onclick="setType('Tips', this)"
          >
            Tips
          </button>
        </div>

        <textarea
          id="captionInput"
          placeholder="What are you working on?"
        ></textarea>

        <button class="primary-btn full" onclick="createPost()">
          Post
        </button>
      </div>
    </section>
  `;
}

/* =========================================================
   DRILLS
   ========================================================= */

function drill(d) {
  return `
    <article class="drill-card">
      <div class="drill-icon">🏀</div>

      <div class="drill-info">
        <p class="eyebrow">${esc(d.cat)}</p>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.description)}</p>

        <span class="level">
          ${esc(d.level)}
        </span>
      </div>

      <button
        class="small-btn"
        onclick="startDrill(${DRILLS.indexOf(d)})"
      >
        Start
      </button>
    </article>
  `;
}

function showRandomDrill() {
  const d = randomItem(DRILLS);

  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <p class="eyebrow">YOUR RANDOM DRILL</p>
        <h1>${esc(d.title)}</h1>
        <p class="muted">${esc(d.description)}</p>
      </div>

      <div class="drill-feature">
        <div class="big-ball">🏀</div>

        <p><strong>Category:</strong> ${esc(d.cat)}</p>
        <p><strong>Level:</strong> ${esc(d.level)}</p>

        <button
          class="primary-btn full"
          onclick="startDrill(${DRILLS.indexOf(d)})"
        >
          Start Drill
        </button>

        <button
          class="secondary-btn full"
          onclick="showRandomDrill()"
        >
          Try Another
        </button>
      </div>
    </section>
  `;
}

function startDrill(index) {
  const d = DRILLS[index];

  if (!d) return;

  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <p class="eyebrow">${esc(d.cat)}</p>
        <h1>${esc(d.title)}</h1>
        <p class="muted">${esc(d.description)}</p>
      </div>

      <div class="drill-feature">
        <div class="big-ball">🏀</div>

        <h2>Let's Work</h2>

        <p>
          Focus on good technique, controlled movements,
          and consistency.
        </p>

        <button
          class="primary-btn full"
          onclick="showToast('Drill started!')"
        >
          Start Timer
        </button>

        <button
          class="secondary-btn full"
          onclick="showRandomDrill()"
        >
          Pick Another Drill
        </button>
      </div>
    </section>
  `;
}

function filterDrills(query) {
  const value = query.toLowerCase().trim();

  const list = document.getElementById("drill-list");

  if (!list) return;

  const results = DRILLS.filter(d =>
    d.title.toLowerCase().includes(value) ||
    d.cat.toLowerCase().includes(value) ||
    d.level.toLowerCase().includes(value)
  );

  list.innerHTML = results.length
    ? results.map(drill).join("")
    : `<p class="muted">No drills found.</p>`;
}

function filterCategory(category) {
  const list = document.getElementById("drill-list");

  if (!list) return;

  const results =
    category === "All"
      ? DRILLS
      : DRILLS.filter(d => d.cat === category);

  list.innerHTML = results.map(drill).join("");
}

/* =========================================================
   POSTS
   ========================================================= */

function card(post) {
  return `
    <article class="post-card">

      <div class="post-header">
        <div class="avatar">
          ${esc(post.user.charAt(0))}
        </div>

        <div>
          <strong>${esc(post.user)}</strong>
          <p>${esc(post.handle)}</p>
        </div>
      </div>

      ${
        post.media
          ? post.media.type.startsWith("video/")
            ? `
              <video
                class="post-media"
                src="${post.media.url}"
                controls
                playsinline
              ></video>
            `
            : `
              <img
                class="post-media"
                src="${post.media.url}"
                alt="Post media"
              >
            `
          : `
            <div class="post-placeholder">
              🏀
            </div>
          `
      }

      <div class="post-content">
        <p>${esc(post.caption)}</p>

        <div class="post-actions">
          <button onclick="toggleLike(${post.id})">
            ${post.liked ? "❤️" : "♡"}
            ${post.likes}
          </button>

          <button onclick="sharePost(${post.id})">
            ↗ Share
          </button>
        </div>
      </div>
    </article>
  `;
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);

  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  showToast(post.liked ? "Liked ❤️" : "Like removed");

  show("home");
}

function sharePost(id) {
  const post = posts.find(p => p.id === id);

  if (!post) return;

  const text = `${post.user}: ${post.caption}`;

  if (navigator.share) {
    navigator.share({
      title: "CLUTCH",
      text
    }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    showToast("Post copied!");
  } else {
    showToast("Post ready to share 🔗");
  }
}

/* =========================================================
   CREATE POST
   ========================================================= */

function setType(type, element) {
  postType = type;

  document.querySelectorAll(".type-button").forEach(button => {
    button.classList.remove("active");
  });

  if (element) {
    element.classList.add("active");
  }
}

function handleFile(event) {
  const file = event.target.files[0];

  if (!file) return;

  selectedMedia = {
    file,
    url: URL.createObjectURL(file),
    type: file.type
  };

  const preview = document.getElementById("mediaPreview");

  if (!preview) return;

  if (file.type.startsWith("video/")) {
    preview.innerHTML = `
      <video
        class="preview-media"
        src="${selectedMedia.url}"
        controls
        playsinline
      ></video>
    `;
  } else {
    preview.innerHTML = `
      <img
        class="preview-media"
        src="${selectedMedia.url}"
        alt="Selected media"
      >
    `;
  }
}

function createPost() {
  const captionInput = document.getElementById("captionInput");

  const caption =
    captionInput?.value.trim() ||
    `Working on ${postType.toLowerCase()} 🏀`;

  const newPost = {
    id: Date.now(),
    user: "Isaac",
    handle: "@isaac",
    caption,
    likes: 0,
    liked: false,
    media: selectedMedia
  };

  posts.unshift(newPost);

  selectedMedia = null;

  showToast("Post created! 🏀");

  setTimeout(() => {
    show("home");
  }, 500);
}

/* =========================================================
   GLOBAL FUNCTIONS
   =========================================================
   These are important because index.html uses onclick=""
   ========================================================= */

window.show = show;
window.showHome = showHome;
window.showDiscover = showDiscover;
window.showFriends = showFriends;
window.showProfile = showProfile;
window.showCreate = showCreate;

window.showRandomDrill = showRandomDrill;
window.startDrill = startDrill;

window.handleFile = handleFile;
window.createPost = createPost;

window.setType = setType;

window.toggleLike = toggleLike;
window.sharePost = sharePost;

window.filterDrills = filterDrills;
window.filterCategory = filterCategory;

/* =========================================================
   START APP
   ========================================================= */

showHome();
