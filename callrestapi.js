var pokeAPIurl ="http://localhost:5000/api/pokemon"; 
var lastPokeUrl ="http://localhost:5000/api/pokemonLast";

function postPokemon() {

    console.log(pokeAPIurl);

    var pokemonName = $('#pokemonName').val().trim();
    
    if (pokemonName === '') {
        alert('Llene el campo.');
        return;
    }

    var newPokemon = {
        pokemonName: pokemonName
    };

    console.log(newPokemon);

    $.ajax({
        url: pokeAPIurl,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(newPokemon),
        success: function (data) {
            console.log('success', data);
           
            $.ajax({
                url: lastPokeUrl,
                type: 'get',
                dataType: 'json',
                success: function(latestData) {

                    console.log('Último Pokémon guardado:', latestData);

                    if (latestData){
                        //var pokeSave = $('#pokeGuardar').attr('src', latestData);
                    } else {
                        console.error('No se realizó registro.');
                    }
                }
            })
        },

        error: function (xhr, status, error) {
            console.error('Error al enviar solicitud.', error);
        }
    });
}

function getPokemon() {
    $.getJSON(lastPokeUrl, function (json) {
       var arrPoke = json.pokes;

       var $ol = $('<ol>');
       (console.log('probando...'))
       arrPoke.forEach(function (item) {
        
        var $li = $('<li>');
        $li.append('<span>Name:' + item.name + '</span>');
        $li.append('<span>ID:' + item.pokeId + '</span>');
        $li.append('<span>Abilities:' + item.abilities.join(', ') + '</span>');
        $li.append('<span>Type:' + item.types.join(', ') + '</span>');

        var $img = $('<img>').attr('src', item.imageUrl);
        $li.append($img);

        $ol.append($li);
        
       });

       $('#pokes').empty().append($ol);

    });
}

