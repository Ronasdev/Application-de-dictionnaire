
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const sound = document.getElementById("sound")

const search = document.getElementById("search-word");
const btn = document.getElementById("btn-search");

const result = document.getElementById("result");

btn.addEventListener('click', (event) => {
    const searchWord = search.value;


    fetch(`${apiUrl}${searchWord}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            result.innerHTML = `
                <div class="word">
                <h3> ${searchWord} </h3>
                <button onclick="playSound()" ><i class="fas fa-volume-up    "></i></button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0]?.phonetic || ""}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0]?.meanings[0]?.definitions[0]?.example ||
                     data[0]?.meanings[0]?.definitions[1]?.example || 'No example available'}
            </p>
                `;

                sound.setAttribute("src", `
                ${ data[0]?.phonetics[1]?.audio || data[0]?.phonetics[0]?.audio || ''} 
                `)

        })
        .catch(error =>{
            result.innerHTML =  `
                <h3 class="error">No result found</h3>
            `
        })
})

function playSound(){
    sound.play();
}