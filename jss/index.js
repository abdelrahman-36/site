var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");

var siteList = [];
if (localStorage.getItem("siteList") !== null) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaySite();
}

function addSite() {
  if (siteName.value == "" && siteUrl.value == "") {
    alert(`Site Name or Url is not valid, Please follow the rules below :
    Site name must contain at least 3 characters
    Site URL must be a valid one`);
  } else {
    if (
      siteName.classList.contains("is-valid") &&
      siteUrl.classList.contains("is-valid")
    ) {
      site = {
        name: siteName.value,
        url: siteUrl.value,
      };

      if (
        localStorage
          .getItem("siteList", JSON.stringify(siteList))
          .toLowerCase()
          .includes(siteName.value.toLowerCase())
      ) {
        alert("this site already exists");
      } else {
        siteList.push(site);
        localStorage.setItem("siteList", JSON.stringify(siteList));
        clearSite();
        displaySite();
        console.log(siteList);
      }
    } else {
      alert(`Site Name or Url is not valid, Please follow the rules below :

      Site name must contain at least 3 characters
      Site URL must be a valid one`);
    }
  }
}

function clearSite() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}
function displaySite() {
  var cartoona = ``;
  for (i = 0; i < siteList.length; i++) {
    cartoona += `
              <tr>
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>              
                <td>
                  <button class="btn btn-warning"onclick="visitWebsite(${i})" >
                    <i class="fa fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger  pe-2"  onclick="deleteSite(${i})" >
                    <i class="fa fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  }
  document.getElementById("tableContent").innerHTML = cartoona;
}

function deleteSite(deleteIndex) {
  siteList.splice(deleteIndex, 1);
  displaySite();
  localStorage.setItem("siteList", JSON.stringify(siteList));

  console.log(siteList);
}

function visitWebsite(Visit) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(siteList[Visit].url)) {
    open(siteList[Visit].url);
  } else {
    open(`https://${siteList[Visit].url}`);
  }
}
function validateForm(element) {
  var regex = {
    bookmarkName: /^\w{3,}(\s+\w+)*$/,
    bookmarkURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
