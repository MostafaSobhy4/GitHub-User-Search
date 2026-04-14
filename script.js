let usercard = document.querySelector(".userCard");

usercard.innerHTML = `<p class="waiting text-gray-400 text-center mt-6">
    Search for a GitHub user!
</p>`;

async function getUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
        throw new Error("User not found");
    }
    return await res.json();
}

function renderUser(user) {
    usercard.innerHTML = `
    <div class="cardcontain min-w-120 min-w-md max-w-xl p-6 rounded shadow-lg text-center m-auto">

        <img src="${user.avatar_url}" 
            class="w-24 h-24 rounded-full mx-auto mb-4" />

        <h2 class="text-xl font-bold">
        ${user.name || user.login}
        </h2>

        <p class="text-gray-400 mb-3">
        @${user.login}
        </p>

        <p class="mb-4">
        ${user.bio || "No bio"}
        </p>

        <div class="flex justify-between mt-4 bg-gray-700 p-4 rounded-lg text-center">

        <div class="flex flex-col flex-1">
            <span class="text-gray-400 text-sm">Followers</span>
            <span class="font-bold text-xl">${user.followers}</span>
        </div>

        <div class="flex flex-col flex-1">
            <span class="text-gray-400 text-sm">Following</span>
            <span class="font-bold text-xl">${user.following}</span>
        </div>

        <div class="flex flex-col flex-1">
            <span class="text-gray-400 text-sm">Repos</span>
            <span class="font-bold text-xl">${user.public_repos}</span>
        </div>

        </div>

        <p class="mt-4">
        <i class="fa-solid fa-location-dot mr-1"></i> ${user.location || "Unknown"}
        </p>

        <a href="${user.html_url}" 
        target="_blank"
        class="inline-block mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
        View Profile
        </a>

    </div>
    `;
}

function showError() {
    usercard.innerHTML = `
        <p class="text-red-500 text-center mt-6">
            User not found!
        </p>
    `;
}

function showLoading() {
    usercard.innerHTML = `
        <p class="text-center mt-6">
            Loading...
        </p>
    `;
}

async function init(userName) {
    try {
        showLoading();
        const user = await getUser(userName);
        setTimeout(() => {
            renderUser(user);
        }, 1000)
    } catch {
        showError();
    }
}

let searchinput = document.querySelector(".inpsearch");
let searchbutt = document.querySelector(".search");

searchbutt.addEventListener("click", () => {
    const value = searchinput.value.trim();
    if (value !== "") {
        init(value);
    }
});

let darklightbutt = document.querySelector(".darklight");
let darklightbuttI = document.querySelector(".darklight i");
let nav = document.querySelector("nav");
let searchContent = document.querySelector(".searchContent");
let inpsearch = document.querySelector(".inpsearch");
let waiting = document.querySelector(".waiting");

let isLight = false;

darklightbutt.addEventListener("click", () => {
    isLight = !isLight;
    darkandlight();
});

function darkandlight() {
    if (isLight) {
        // LIGHT MODE
        darklightbuttI.className = "fa-solid fa-sun";

        document.body.classList.remove("bg-gray-900");
        document.body.classList.add("bg-white");

        nav.classList.remove("bg-gray-800");
        nav.classList.add("bg-gray-400");

        searchContent.classList.remove("bg-gray-800");
        searchContent.classList.add("bg-gray-400");

        usercard.classList.remove("bg-gray-800");
        usercard.classList.add("bg-gray-400");

        inpsearch.classList.remove("border-gray-900");
        inpsearch.classList.add("border-white");

        waiting.classList.remove("text-gray-400");
        waiting.classList.add("text-white");

    } else {
        // DARK MODE
        darklightbuttI.className = "fa-regular fa-moon";

        document.body.classList.remove("bg-white", "text-gray-900");
        document.body.classList.add("bg-gray-900", "text-white");

        nav.classList.remove("bg-gray-400");
        nav.classList.add("bg-gray-800");

        searchContent.classList.remove("bg-gray-400");
        searchContent.classList.add("bg-gray-800");
        
        usercard.classList.remove("bg-gray-400");
        usercard.classList.add("bg-gray-800");
        
        inpsearch.classList.remove("border-white");
        inpsearch.classList.add("border-gray-900");
        
        waiting.classList.remove("text-white");
        waiting.classList.add("text-gray-400");
    }
}

