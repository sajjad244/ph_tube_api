//? 1- fetch , load and show categories on html

// !    create loadCategories & videoCategories

// ?! create loadCategories
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

// removeActiveClassButton
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// ? loadCategoryId ?

const loadCategoryId = (id) => {
  //   alert(id);
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      // remove active color
      removeActiveClass();

      //   add active color
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// !    create displayCategories  in html
// const displayCategories = (categories) => {
//   // add data in html
//   const categoryContainer = document.getElementById("categories");
//   //? using forEach array function
//   categories.forEach((item) => {
//     // console.log(item);
//     // create a button in html
//     const button = document.createElement("button");
//     button.classList = "btn";
//     button.innerText = item.category;
//     //? add button to categoryContainer
//     categoryContainer.append(button);
//   });
// };

const displayCategories = (categories) => {
  // add data in html
  const categoryContainer = document.getElementById("categories");
  //? using forEach array function
  categories.forEach((item) => {
    // console.log(item);
    // create a button in html
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick ="loadCategoryId(${item.category_id})" class = "btn category-btn">
        ${item.category}
        </button>
    `;
    //? add button to categoryContainer
    categoryContainer.append(buttonContainer);
  });
};

// ?! create videoCategories
const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// ? card demo

// const cardDemo = {
//   category_id: "1001",
//   video_id: "aaaa",
//   thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//   title: "Shape of You",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//       profile_name: "Olivia Mitchell",
//       verified: "",
//     },
//   ],
//   others: {
//     views: "100K",
//     posted_date: "16278",
//   },
//   description:
//     "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
// };

// ! create display video in html
const displayVideos = (videos) => {
  // add data in html
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
        <div class= "min-h-[300px] w-full flex justify-center items-center gap-5">
        <img src="./assets/icon.png"/>
            <h2 class="text-center font-extrabold text-xl"> 
                No Content Here In This category !!!
            </h2>
        </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  //  foEach loop for single element
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class = "h-[200px] relative" >
    <img 
      class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes"/>
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `
         <span class=" absolute right-2 bottom-2 bg-black rounded p-1 text-white">${video.others.posted_date}</span>
      `
      }
      
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div> 
        <img class="w-10 h-10 rounded-full object-cover" src=${
          video.authors[0].profile_picture
        }/>
            <h2 class="font-bold">${video.title}</h2>
    <div class=" flex items-center gap-2">
         <p class=" text-gray-400">${video.authors[0].profile_name}</p>
         
         ${
           video.authors[0].verified == true
             ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
             : ""
         }
    </div>
         <p>
         <button class= "btn btn-sm btn-error">Details</button>
        </p>
    </div>

  </div>
    `;
    videoContainer.append(card);
  });
};

loadCategories();
loadVideos();
