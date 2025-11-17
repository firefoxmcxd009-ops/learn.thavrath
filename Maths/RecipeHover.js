const recipeBtn = document.querySelector(".Recipe");
const recipePopup = document.getElementById("Recipe");

// show when hover on button
recipeBtn.addEventListener("mouseenter", () => {
    recipePopup.classList.add("show-popup");
});

// hide when leave
recipeBtn.addEventListener("mouseleave", () => {
    recipePopup.classList.remove("show-popup");
});

// prevent flicker: keep showing when mouse is inside popup
recipePopup.addEventListener("mouseenter", () => {
    recipePopup.classList.add("show-popup");
});

recipePopup.addEventListener("mouseleave", () => {
    recipePopup.classList.remove("show-popup");
});
function handleAnswer(answer,e){
  const btn=e.currentTarget;
  // ripple effect
  const rect=btn.getBoundingClientRect();
  const circle=document.createElement('span');
  circle.className='ripple';
  const size=Math.max(rect.width,rect.height);
  circle.style.width=circle.style.height=size+'px';
  circle.style.left=(e.clientX - rect.left - size/2)+'px';
  circle.style.top=(e.clientY - rect.top - size/2)+'px';
  btn.appendChild(circle);
  setTimeout(()=>circle.remove(),600);

  if(answer===questions[index].a){
    // ✅ correct answer
    popup.classList.add('show');
    burstConfetti(confettiCanvas,30);

    setTimeout(()=>{
      popup.classList.remove('show');
      index++;
      if(index < questions.length){
        loadQuestion();
      } else {
        // finished all questions
        questionP.textContent = "✅ សំនួរបានបញ្ចប់!";
        choicesDiv.innerHTML = "";
      }
    },1200);

  } else {
    // ❌ wrong answer
    // temporary shake / jump animation
    questionP.style.transition = "transform 0.3s ease";
    questionP.style.transform = "translateY(-20px)";
    setTimeout(()=>{ questionP.style.transform="translateY(0)"; },300);

    // highlight the wrong button
    btn.style.background = "linear-gradient(90deg,#ff0000,#ff5c5c)";
    btn.style.transform = "scale(1.05)";
    setTimeout(()=>{
      btn.style.background = "";
      btn.style.transform = "";
    },600);
  }
}
