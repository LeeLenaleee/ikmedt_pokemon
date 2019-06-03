// array initialiseren waar alle img elementen in komen zodat je er doorheen loopen kan, ook de sphere variable initialiseren
let imageArray = [];
let textArray = [];
let textArray0 = [];
let textArray1 = [];
let textArray2 = [];
let sphere;

function  $(elementId) {return document.getElementById(elementId);}

function addToArray(array, element) {
  for (let i = 0; i<3; i++) {
    array.push($("js--"+element+"--attack"+i))
  }
}

window.onload = () => {
  // de images ophalen uit de html en de elementrefs naar de array pushen, ook de element ref voor de sphere ophalen en in de sphere var zetten
  imageArray.push(document.getElementById('js--image1'));
  imageArray.push(document.getElementById('js--image2'));
  imageArray.push(document.getElementById('js--image3'));

  addToArray(textArray0, '1');
  addToArray(textArray1, '2');
  addToArray(textArray2, '3');

  textArray.push(textArray0);
  textArray.push(textArray1);
  textArray.push(textArray2);

  sphere = document.getElementById("sphere");

  for (let i = 0; i<3; i++) {
    setUnvisisble(i);
  }

  // actie aanmaken voor als de muis de sphere binnen gaat
  sphere.onmouseenter = () => {
	// voor elke element in de array voer de volgende code uit (methode makeApicAll), geef het element op huidige positie in array mee
    imageArray.forEach((element, index) => {
      makeApiCall(element, index);
    });
  };

  // om voor de eerste keer al te zorgen dat er images in staan voer de makeApicalls 1 keer uit, dit had ook met de foreach gekund zodat het iets dyer was,
  // nog beter was als je de foreach ook in een apparte methode gezet had dan zodat het helemaal dry was. Ook was het voor overzichtelijk heid beter geweest als je dit gelijk gedaan had na het initialiseren van de
  // elementen inplaats van na de onmouseneter.
  makeApiCall(imageArray[0]);
  makeApiCall(imageArray[1]);
  makeApiCall(imageArray[2]);

  imageArray.forEach( (element, index) => {
    element.onmouseenter = () => {
      for (let i = 0; i<3; i++) {
        setVissable(index);
      }
    };
    element.onmouseleave = () => {
      setUnvisisble(index);
    };
  });
};

setVissable = (index) => {
  for (let i = 0; i<3; i++) {
    textArray[index][i].setAttribute('visible', 'true');
  }
};

setUnvisisble = (index) => {
  for (let i = 0; i<3; i++) {
    textArray[index][i].setAttribute('visible', 'false');
  }
};

// methode om random images uit de pokedex op te halen, krijgt element mee (img in dit geval)
makeApiCall = (element, index) => {
  // random nummer genereren om die pokemon op te halen
  const randomNum = Math.floor(Math.random() * 800) + 1;
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  const request = new XMLHttpRequest();
  // waneer de request af gaat voer dit stuk code uit
  request.onreadystatechange = () => {
	// check of de request goed terug komt en niet met errors
    if(request.readyState === 4 && request.status === 200){
	  // parse de json response naar de vorm waarin je de data nodig hebt om er verder mee te werken
      let r = JSON.parse(request.response);
	  // src van de sprite zetten naar de data waardoor deze van plaatje veranderd
      element.setAttribute("src",r.sprites.front_default);
      for (let i = 0; i<3; i++) {
        if (r.abilities[i].ability.name === undefined) {
          textArray[index][i].setAttribute("Value", "Geen Ability");
        } else {
          textArray[index][i].setAttribute("Value", r.abilities[i].ability.name);
        }
      }
    }
  };

  // request maken met als call een GET, url waar die naartoe moet callen
  request.open("GET",BASE_URL + randomNum,true);
  // de request daadwerkelijk zenden
  request.send();
};

