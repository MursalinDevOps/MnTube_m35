function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = parseInt(time % 3600);
  const minute = parseInt(remainingSecond/60);
  remainingSecond = remainingSecond % 60;
  return `${hour}hr ${minute}min ${remainingSecond}secs ago`
}

// LOAD CATEGORIES
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};
// LOAD VIDEOS
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};
// {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }

// DISPLAY VIDEOS
const displayVideos = (videos) => {
  videos.forEach((video) => {
    const videoContainer = document.getElementById("videos-container");
    console.log(video);
    const divEl = document.createElement("div");
    divEl.classList.add("card", "card-compact");
    divEl.innerHTML = `
    <figure class="h-[200px] relative rounded-lg">
    <img
      class="h-full w-full object-cover"
      src="${video.thumbnail}"/>
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded-lg text-white p-2">${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-6 flex gap-3">
  <div>
    <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}">
    </div>
    <div>
    <h2 class="font-bold text-lg">${video.title}</h2>
    <div class="flex items-center gap-3">
    <p class="text-gray-500">${video.authors[0].profile_name}</p>

    ${video.authors[0].verified === true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"></img>' : ''}

    </div>
    <p class="text-gray-500">${video.others.views} Views</p>
    </div>
    
  </div>
         `;
    videoContainer.appendChild(divEl);
  });
};

// DISPLAY CATEGORIES
const displayCategories = (categories) => {
  categories.forEach((item) => {
    // get category container
    const categoryContainer = document.getElementById("category-container");
    // create button's dynamically
    const button = document.createElement("button");
    // add innerText or Contents
    button.innerText = `${item.category}`;
    // style button's using class(Tailwind)
    button.classList.add("btn", "bg-[#FF1F3D]", "text-white", "w-[100px]");
    // add the dynamic button element to the container to show on the UI
    categoryContainer.appendChild(button);
  });
};
// call the function
loadCategories();
loadVideos();
