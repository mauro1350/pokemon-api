document.getElementById('fetchAbilities').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    if (pokemonName === '') {
        resultDiv.innerHTML = 'Por favor, ingresa un nombre de Pokémon.';
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado.');
            }
            return response.json();
        })
        .then(data => {
            const hiddenAbilities = data.abilities
                .filter(ability => ability.is_hidden)
                .map(ability => ability.ability.name);

            if (hiddenAbilities.length === 0) {
                resultDiv.innerHTML = 'No se encontraron habilidades ocultas.';
            } else {
                resultDiv.innerHTML = `
                    <h2>Habilidades Ocultas:</h2>
                    <ul>
                        ${hiddenAbilities.map(ability => `<li>${ability}</li>`).join('')}
                    </ul>
                `;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `Error: ${error.message}`;
        });
});
