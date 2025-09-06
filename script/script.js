const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn=document.getElementById(`lesson-btn-${id}`)
      
      clickBtn.classList.add('active')
      displayLevelWord(data.data)});
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full space-y-6 py-10">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-500 font-bangla rounded-xl ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white text-center py-10 px-5 p-5 rounded-xl shadow-sm space-y-4">
        <h2 class="p-2 font-bold text-2xl">${word.word ? word.word:"nothing to show"}</h2>
        <p class="p-2 font-semibold">${word.meaning ? word.meaning:" nothing to show"}/${word.pronunciation ? word.pronunciation:"nothing to show"}</p>
        <p class="font-medium text-xl font-bangla ">${word.meaning}</p>
        <div class="flex justify-between items-center py-5">
          <button onclick="loadWordDetail(${word.id})" class="btn btn-outline btn-primary"><i class="fa-solid fa-circle-exclamation"></i></button>

          <button onclick="my_modal_4.showModal()" class="btn btn-outline btn-secondary"><i class="fa-solid fa-volume-low"></i></button>
        </div>
    
    `;
    wordContainer.append(card);
  });
};
const removeActive=()=>{
  const lessonButtons= document.querySelectorAll('.lesson-btn')
  // console.log(lessonButtons);
  lessonButtons.forEach(btn=>btn.classList.remove('active'))
}

const loadWordDetail=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`;
  const res=await fetch (url);
  const details=await res.json();
  diplayWordDetails(details.data);
}
const diplayWordDetails=(word)=>{
  const detailsBox=document.getElementById('details-conatainer');
  detailsBox.innerHTML=`
  
  <div id="details-conatainer " class="space-y-10 p-5">

        <div>
          <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>

        </div>
        <div>
          <h2 class="text-2xl font-bold">Meaning</h2>
          <p>${word.meaning}</p>

        </div>
        <div>
          <h2 class="text-2xl font-bold">Example</h2>
          <p>${word.sentence}</p>

        </div>
        <div class="space-y-5">
          <h2 class="text-2xl font-bold ">সমার্থক শব্দ গুলো</h2>
          <p>The kids were eager to open their gifts.</p>
          <div class="flex gap-3">
            <button class="btn btn-primary text-center border-2 border-red-500 p-2">Enthasiastic</button>
            <button class="btn btn-primary text-center border-2 border-red-500 p-2">excited</button>
            <button class="btn btn-primary text-center border-2 border-red-500 p-2">keen</button>
          </div>

        </div>






        </div>
  
  
  
  
  `;
  document.getElementById('word_modal').showModal();
}



const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
        `;
    levelContainer.append(btnDiv);
  });
};
loadLessons();
