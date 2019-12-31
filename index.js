const express = require('express');
const fetch = require('node-fetch');

const guardianApiKey = "05572908-fc58-4061-a4e7-2f9cc2e990f1";

const app = express();
app.listen(3000, () => console.log("Server ceka zahteve na portu 3000."));
app.use(express.static('public'));

app.get('/drzava/:latlon', async (zah, odg) => {
    var apikey = '0b47275ff17b4922bc17fef296eede57';
    var api_url = 'https://api.opencagedata.com/geocode/v1/json';

    const latlon = zah.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];

    var request_url = api_url
        + '?'
        + 'key=' + apikey
        + '&q=' + encodeURIComponent(lat + ',' + lon)
        + '&pretty=1'
        + '&no_annotations=1';

    const fetchOdg = await fetch(request_url);
    const jsonGeolok = await fetchOdg.json();
    odg.json(jsonGeolok);
});


app.get('/desetclanaka/:drzava', async (zah, odg) => {
    const drzava = zah.params.drzava;

    console.log(drzava);

    const urlD = `https://content.guardianapis.com/search?q=${drzava}&api-key=${guardianApiKey}`;

    const guardianOdgD = await fetch(urlD);
    const jsonGuardD = await guardianOdgD.json();

    console.log(jsonGuardD.response.userTier);

    //vracamo niz clanaka
    odg.json(jsonGuardD.response.results);
});

app.get('/desetclanakasvet', async (zah, odg) => {
    const urlS = `https://content.guardianapis.com/search?api-key=${guardianApiKey}`;

    const guardianOdgS = await fetch(urlS);
    const jsonGuardS = await guardianOdgS.json();

    console.log(jsonGuardS.response.userTier);

    //vracamo niz clanaka
    odg.json(jsonGuardS.response.results);
});