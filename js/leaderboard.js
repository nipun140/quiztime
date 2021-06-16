const btnid = document.querySelector("a.btn");

let names2dStr = localStorage.getItem("leaderboard"); //string from local storage
let maxScore = -1;

if (names2dStr != null) {
  let names2dArr = JSON.parse(names2dStr); //2d arr obj

  names2dArr.forEach((nameData) => {
    let [name, score] = nameData; //array destructuring
    maxScore = Math.max(score, maxScore); //calculate max off all scores
    //create the new element
    let newNameElement = document.createElement("h1");
    newNameElement.classList.add("name");
    newNameElement.innerHTML = `${name} - <span>${score}</span>`;

    document.getElementById("leader").insertBefore(newNameElement, btnid); //each new elem inserted before go home button
  });

  displayMaxScore(maxScore);
}

//loops over all names and updates the color to red if their score is equal to max score
function displayMaxScore(num) {
  //finding all names of players
  document.querySelectorAll(".name").forEach((name) => {
    let scoreid = name.querySelector("span");
    if (scoreid.innerHTML == num) {
      name.classList.add("maxscore");
    }
  });
}
