//? 1- fetch , load and show categories on html

// !    create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// {
//     "category_id": "1001",
//     "category": "Music"
// }

// !    create displayCategories
const displayCategories = (categories) => {
  // add data in html
  const categoryContainer = document.getElementById("categories");
  //? using forEach array function
  categories.forEach((item) => {
    // console.log(item);
    // create a button in html
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    //? add button to categoryContainer
    categoryContainer.append(button);
  });
};

loadCategories();
