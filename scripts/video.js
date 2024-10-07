// LOAD CATEGORIES
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
    .catch((err)=>(console.log(err)))
}
// LOAD VIDEOS
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch((err) => (console.log(err)))
}

// DISPLAY VIDEOS
const displayVideos = (videos) => {;
    videos.forEach((video)=> {
        const videoContainer = document.getElementById('videos-container');
         console.log(video);
         const divEl = document.createElement('div');
         divEl.classList.add("card","card-compact","border");
         divEl.innerHTML = `
           <figure>
    <img
      class="h-[200px]"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
  </div>
         `;
         videoContainer.appendChild(divEl);
    })
}

// DISPLAY CATEGORIES
const displayCategories = (categories) => {
    categories.forEach(item => {
        // get category container
        const categoryContainer = document.getElementById('category-container')
        // create button's dynamically
        const button = document.createElement('button');
        // add innerText or Contents
        button.innerText = `${item.category}`;
        // style button's using class(Tailwind)
        button.classList.add('btn','bg-[#FF1F3D]','text-white','w-[100px]');
        // add the dynamic button element to the container to show on the UI
        categoryContainer.appendChild(button)
    });
}
// call the function
loadCategories();
loadVideos();