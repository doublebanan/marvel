import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spinner";
import Error from "../error/Error";

import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar(), 60000);
        clearInterval(timerId);
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (20 - 1) + 1);
        getCharacter(id).then(onCharLoaded);
    };

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    className="button button__main"
                    onClick={() => updateChar()}
                >
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    if (!char) return null;

    const { name, description, thumbnail, homepage, wiki } = char;

    const isImageNotAvailable =
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    const textStyle = isImageNotAvailable
        ? { objectFit: "contain" }
        : { objectFit: "cover" };

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={textStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description
                        ? description.slice(0, 150) + "..."
                        : "No description"}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
