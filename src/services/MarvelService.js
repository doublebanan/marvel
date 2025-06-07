class MarvelService {
    // _apiBase = "https://gateway.marvel.com:443/v1/public/";
    // _apiKey = "apikey=3fcaf45892a33848fc2de68e2ff8c0fe";

    _apiBase = "https://marvel-server-zeta.vercel.app/";
    _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    _baseOffset = 0;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (char) => {
        console.log(char);

        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };
}

export default MarvelService;
