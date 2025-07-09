async function getCharactersRnM(query = '') {
    let url = `https://rickandmortyapi.com/api/character${query}`;
    let allCharacters = [];
    const container = document.getElementById("charactersContainer")
    container.innerHTML = "<p>Cargando personajes...</p>";
    try{
            while(url){
                const res = await fetch(url);
                if(!res.ok){
                throw new Error(`Error HTTP: ${res.status}`);
                }
                const data = await res.json();
                allCharacters = allCharacters.concat(data.results);
                url = data.info.next;
            }

            container.innerHTML = "";
            if(allCharacters.length === 0) {
                container.innerHTML = "<p>Ningún personaje encontrado</p>";
                return;
            }
            for (let i = 0; i < allCharacters.length; i += 20) {
            setTimeout(() => {
                allCharacters.slice(i, i+20).forEach(char => {
                const div = document.createElement('div');
                div.className = 'character';
                div.innerHTML = `
                    <img src="${char.image}" alt="${char.name}">
                    <h4>${char.name}</h4>
                    <p>${char.status} - ${char.species} - ${char.gender}</p>`;
                container.appendChild(div);
                });
            }, i * 20);
}
        }
    catch (error) {
        container.innerHTML = `<p>Ningun personaje encontrado</p>`;
    }
    }

document.getElementById('filterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const params = new URLSearchParams();
  if (form.name.value) params.append('name', form.name.value);
  if (form.status.value) params.append('status', form.status.value);
  if (form.species.value) params.append('species', form.species.value);
  if (form.type.value) params.append('type', form.type.value);
  if (form.gender.value) params.append('gender', form.gender.value);
  getCharactersRnM('?' + params.toString());
});

