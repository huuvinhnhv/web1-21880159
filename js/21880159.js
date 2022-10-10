const API = "https://web1-api.herokuapp.com/api";
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
