const saveBtn = document.getElementById("savebtn");
const nameid = document.getElementById("name");
const scoreid = document.getElementById("score");

nameid.oninput = () => {
  if (nameid.value != "") {
    saveBtn.classList.remove("disabled");
  } else {
    saveBtn.classList.add("disabled");
  }
};

const score = localStorage.getItem("mostRecentScore"); //string type
scoreid.innerHTML = score;

saveBtn.onclick = () => {
  if (!saveBtn.classList.contains("disabled")) {
    let inputName = nameid.value;
    let names2dStr = localStorage.getItem("leaderboard"); //string from local storage
    let names2dArr = JSON.parse(names2dStr); //2d arr obj
    if (names2dStr == null) {
      let names = [];
      names.push([inputName, score]);
      localStorage.setItem("leaderboard", JSON.stringify(names));
      return;
    } else {
      names2dArr.push([inputName, score]);
      localStorage.setItem("leaderboard", JSON.stringify(names2dArr));
      window.location.assign("index.html");
      return;
    }
  }
  return;
};
