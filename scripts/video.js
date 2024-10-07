// LOAD CATEGORIES
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
    .catch((err)=>(console.log(err)))
}
// DISPLAY CATEGORIES
const displayCategories = (categories) => {
    categories.forEach(item => {
        const categoryContainer = document.getElementById('category-container')
        // console.log(item.category);
        const button = document.createElement('button');
        button.innerText = `${item.category}`;
        button.classList.add('btn','bg-[#FF1F3D]','text-white','w-[100px]');
        categoryContainer.appendChild(button)
    });
}
loadCategories();