function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = parseInt(time % 3600);
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour}hr ${minute}min ${remainingSecond}secs ago`;
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
// LOAD CATEGORY VIDEOS
const loadCategoryVideos = (id) => {
  // alert(id)
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((err) => console.log(err));
};

// DISPLAY VIDEOS
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  if(videos.length == 0){
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = `
     <div class="w-11/12 md:8/12 lg:w-6/12 mx-auto flex flex-col items-center lg:h-[500px] justify-center gap-5">
          <img src="./assets/Icon.png" alt="">
          <h2 class="text-center font-bold text-3xl">Ooops!! Sorry,<br> No content's available here.</h2>
         </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add('grid');
  }
  videos.forEach((video) => {
    const divEl = document.createElement("div");
    divEl.classList.add("card", "card-compact");
    divEl.innerHTML = `
    <figure class="h-[200px] relative rounded-lg">
    <img
      class="h-full w-full object-cover"
      src="${video.thumbnail}"/>
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded-lg text-white p-2">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="px-0 py-6 flex gap-3">
  <div>
    <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}">
    </div>
    <div>
    <h2 class="font-bold text-lg">${video.title}</h2>
    <div class="flex items-center gap-3">
    <p class="text-gray-500">${video.authors[0].profile_name}</p>

    ${
      video.authors[0].verified === true
        ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"></img>'
        : ""
    }

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
  // get category container
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    // create button's dynamically
    const buttonContainer = document.createElement("div");
    // add inner Contents
    buttonContainer.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id})" class="btn w-[100px]">${item.category} </button>`;
    // add the dynamic button element to the container to show on the UI
    categoryContainer.appendChild(buttonContainer);
  });
};
// call the function
loadCategories();
loadVideos();
