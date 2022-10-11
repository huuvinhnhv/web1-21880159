const API = "https://web1-api.herokuapp.com/api";
const AUTHENTICATE_API = "https://web1-api.herokuapp.com/users";
async function loadData(request, templateId, viewId) {
  const respone = await fetch(`${API}/${request}`);
  const data = await respone.json();

  var source = document.getElementById(templateId).innerHTML;
  var template = Handlebars.compile(source);
  var context = { data: data };
  var view = document.getElementById(viewId);
  view.innerHTML = template(context);
}
function setActiveImagepath(img, imagepath, isActive = true) {
  if (isActive) {
    img.src = imagepath.replace(".", "-active.");
  } else {
    img.src = imagepath;
  }
  img.nextElementSibling.classList.toggle("web1-text-blue");
}
function disableLink(link) {
  let links = document.querySelectorAll("#gallery-categories a");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("disabled");
  }
  link.classList.toggle("disabled");
}

async function getAuthenticateToken(username, password) {
  let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  let result = response.json();
  if (response.status == 200) {
    return result.token;
  }
  throw new Error(result.message);
}
