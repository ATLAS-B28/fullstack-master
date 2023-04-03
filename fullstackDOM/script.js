const blogContainer = document.querySelector(".blog_container");
let globalblogData = [];
//array containing the blog
//the below are used for creating ,edit and deleting cards
//save to loaclestorage
const saveToStorage = () => {
  localStorage.setItem("blogs", JSON.stringify({ card: globalblogData }));
};
//while dispalying insert card to dom
const insertDOM = (content) =>
  blogContainer.insertAdjacentHTML("beforeend", content);
//we will genetrate html dynamically
const generateblogHTML = (blogData) => {
  //use template literals
  return `<div class="col-md-6 col-lg-4 my-4" id=${blogData.id}>
 <div class="card">
   <div class="card-header gap-2 d-flex justify-content-end">
     <button class="btn btn-outline-info" name=${blogData.id} onclick="editCard.apply(this, args)">
      <i class="fal fa-pencil" name=${blogData.id} ></i>
     </button>
     <button class="btn btn-outline-danger" name=${blogData.id} onclick="deleteCard.apply(this, args)">
      <i class="far fa-trash-alt" name=${blogData.id}></i>
     </button>

   </div>
   <div class="card-body">
     <img src=${blogData.image} alt="image" class="card-img">
   </div>
   <h5 class="card-title mt-4">${blogData.title}</h5>
   <p class="card-text">
     ${blogData.desc}
   </p>
   <span class="badge bg-primary">${blogData.type}</span>
 </div>
 <div class="card-footer">
   <button class="btn btn-outline-primary" name=${blogData.id}>Open blog/button>
 </div>
</div>`;
};
//new card
const addNewCard = () => {
  const blogData = {
    id: `${Date.now()}`,
    title: document.getElementById("blogTitle").value,
    image: document.getElementById("imageURL").value,
    type: document.getElementById("blogType").value,
    desc: document.getElementById("blogDescription").value,
  };
  globalblogData.push(blogData);
  saveToStorage();
  const newCard = generateblogHTML(blogData);
  console.log(newCard);
  insertDOM(newCard); //instantenously shows the new blog
  //clear form
  document.getElementById("taskTitle").value = "";
  document.getElementById("imageURL").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDescription").value = "";

  return;
};
//load existing ones
const loadCard = () => {
  const getData = localStorage.getItem("blog");
  if (!getData) return;
  const blogCards = JSON.parse(getData);
  globalblogData = blogCards.card;
  globalblogData.map((data) => {
    const newCard = generateblogHTML(data);
    insertDOM(newCard);
  });
  return;
};

//delete
const deleteCard = (event) => {
  const target = event.target.getAttribute("name");
  const type = event.type.tagName;
  const remove = globalblogData.filter((blog) => blog.id !== target); //use filter()
  globalblogData = remove;
  saveToStorage();
  if (type === "BUTTON") {
    return blogContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return blogContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

//edit form populating event
const editCard = (event) => {
  const type = event.target.tagName;
  let blogTitle;
  let blogType;
  let blogDescription;
  let parentElement;
  let submitButton;
  if (type === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
  blogTitle = parentElement.childNodes[3].childNodes[3];
  blogDescription = parentElement.childNodes[3].childNodes[5];
  blogType = parentElement.childNodes[3].childNodes[7];
  submitButton = parentElement.childNodes[5].childNodes[1];
  //set the attribute
  blogTitle.setAttribute("contenteditable", true);
  blogDescription.setAttribute("contenteditable", true);
  blogType.setAttribute("contenteditable", true);
  submitButton.setAttribute("onclick", "saveEdit.apply(this, args)");
  submitButton.innerHTML = "SaveChanges";
};
//save edit
const saveEdit = (event) => {
  const target = event.target.getAttribute("name");
  const type = event.type.tagName;
  let parentElement;

  if (type === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  const blogTitle = parentElement.childNodes[3].childNodes[3];
  const blogDescription = parentElement.childNodes[3].childNodes[5];
  const blogType = parentElement.childNodes[3].childNodes[7];
  const submitButton = parentElement.childNodes[5].childNodes[1];
  const updatedData = {
    title: blogTitle.innerHTML,
    type: blogType.innerHTML,
    desc: blogDescription.innerHTML,
  };
  console.log(updatedData, target);
  const gloabalUpdate = globalblogData.map((blog) => {
    if (blog.id === target) {
      console.log({ ...blog, updatedData });
      return { ...blog, updatedData };
    }
    return blog;
  });
  globalblogData = gloabalUpdate;
  saveToStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = "Open Task";
};

/**
 some common dom terms
 -document
 -querySelector
 -getElementById
 -childNodes
 -parendNode
 -innerHTML
 -innerText
 -localStorage.setItem/.getItem
 -insertAdjacentHTML
 --appendChild
 -target
 -getAttribute
 -setAttribute
 */
