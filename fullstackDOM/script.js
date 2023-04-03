const blogContainer = document.querySelector(".blog__container");
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
  return ` <div id=${blogData.id} class="col-md-6 col-lg-4 my-4">
  <div class="card">
    <div class="card-header gap-2 d-flex justify-content-end">
      <button class="btn btn-outline-info" name=${blogData.id} onclick="editCard.apply(this, arguments)" >
        <i class="fal fa-pencil" name=${blogData.id}></i>
      </button>
      <button class="btn btn-outline-danger" name=${blogData.id} onclick="deleteCard.apply(this, arguments)">
        <i class="far fa-trash-alt" name=${blogData.id}></i>
      </button>
    </div>
    <div class="card-body">
      <img
        src=${blogData.image}
        alt="image"
        class="card-img"
      />
      <h5 class="card-title mt-4">${blogData.title}</h5>
      <p class="card-text">
        ${blogData.description}
      </p>
      
    </div>
    <div class="card-footer">
    <span class="badge bg-primary">${blogData.type}</span>
    </div>
  </div>
  </div>`;
};
// <button class="btn btn-outline-primary" name=${blogData.id}>Open Task</button>
//new card
const addNewCard = () => {
  const blogData = {
    id: `${Date.now()}`,
    title: document.getElementById("blogTitle").value,
    image: document.getElementById("imageURL").value,
    type: document.getElementById("blogType").value,
    description: document.getElementById("blogDescription").value,
  };
  globalblogData.push(blogData);
  saveToStorage();
  const newCard = generateblogHTML(blogData);
  console.log(newCard);
  insertDOM(newCard); //instantenously shows the new blog
  //clear form
  document.getElementById("blogTitle").value = "";
  document.getElementById("imageURL").value = "";
  document.getElementById("blogType").value = "";
  document.getElementById("blogDescription").value = "";

  return;
};
//load existing ones
const loadCard = () => {
  const getData = localStorage.getItem("blogs");
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

  if (type === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
  console.log(parentElement);
  //blogTitle = parentElement.childNodes[3].childNodes[3];
  //blogDescription = parentElement.childNodes[3].childNodes[5];
  //blogType = parentElement.childNodes[3].childNodes[7];
  //submitButton = parentElement.childNodes[5].childNodes[1];
  const cardBody = parentElement.querySelector(".card-body");
  const blogTitle = cardBody.querySelector(".card-title");
  const blogDescription = cardBody.querySelector(".card-text");
  const blogType = cardBody.querySelector(".badge");
  const submitButton = parentElement.querySelector(".btn-outline-info");
  //set the attribute
  blogTitle.setAttribute("contenteditable", "true");
  blogDescription.setAttribute("contenteditable", "true");
  blogType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.innerHTML = "Save Changes";
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

  ///const blogTitle = parentElement.childNodes[3].childNodes[3];
  //const blogDescription = parentElement.childNodes[3].childNodes[5];
  //const blogType = parentElement.childNodes[3].childNodes[7];
  //const submitButton = parentElement.childNodes[5].childNodes[1];
  const cardBody = parentElement.querySelector(".card-body");
  const blogTitle = cardBody.querySelector(".card-title");
  const blogDescription = cardBody.querySelector(".card-text");
  const blogType = cardBody.querySelector(".badge");
  const submitButton = parentElement.querySelector(".btn-outline-info");
  const updatedData = {
    title: blogTitle.innerHTML,
    type: blogType.innerHTML,
    description: blogDescription.innerHTML,
  };
  console.log(updatedData, target);
  const globalUpdate = globalblogData.map((blog) => {
    if (blog.id === target) {
      console.log({ ...blog, ...updatedData });
      return { ...blog, ...updatedData };
    }
    return blog;
  });
  globalblogData = globalUpdate;
  saveToStorage();
  const blogData = {
    id: `${Date.now()}`,
    title: document.getElementById("blogTitle").value,
    image: document.getElementById("imageURL").value,
    type: document.getElementById("blogType").value,
    description: document.getElementById("blogDescription").value,
  };
  blogTitle.setAttribute("contenteditable", "false");
  blogDescription.setAttribute("contenteditable", "false");
  blogType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = `<i class="fal fa-pencil" name=${blogData.id}></i>`;
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
