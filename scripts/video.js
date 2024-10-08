function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = parseInt(time % 3600);
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour}hr ${minute}min ${remainingSecond}secs ago`;
}

function removeActiveClass() {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
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
    .then((data) => {
      // remove active class from all buttons
      removeActiveClass();
      // add active class from all buttons
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");

      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
};
// LOAD DETAILS
const loadDetails = async(videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

// DISPLAY DETAILS
const displayDetails = (video) => {
  // console.log(video);
  const modalContainer = document.getElementById('modal-content');
  modalContainer.innerHTML = `
   <img src="${video.thumbnail}" alt="">
            <h3 class="text-2xl font-bold">${video.title}</h3>
            <p>${video.description}</p>
  `
  // way 1
  document.getElementById('showModalData').click();
}

// DISPLAY VIDEOS
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
     <div class="w-11/12 md:8/12 lg:w-6/12 mx-auto flex flex-col items-center lg:h-[500px] justify-center gap-5">
          <img src="./assets/Icon.png" alt="">
          <h2 class="text-center font-bold text-3xl">Ooops!! Sorry,<br> No content's available here.</h2>
         </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
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
<button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-sm">Details</button>
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
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn w-[100px]">${item.category} </button>`;
    // add the dynamic button element to the container to show on the UI
    categoryContainer.appendChild(buttonContainer);
  });
};
// call the function
loadCategories();
loadVideos();
