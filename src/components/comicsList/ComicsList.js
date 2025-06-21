import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spinner";
import Error from "../error/Error";

import "./comicsList.scss";

const ComicsList = () => {
    const [comics, setComics] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(0);

    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequestComics(offset, true);
    }, []);

    const onRequestComics = (offset = 0, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onCharsLoading);
    };

    const onCharsLoading = (newChars) => {
        let ended = false;
        if (newChars.length < 8) {
            ended = true;
        }

        setComics((comics) => [...comics, ...newChars]);
        setOffset((offset) => offset + 8);
        setCharEnded(ended);
    };

    function onComics(items) {
        const arr = items.map((item) => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        });

        return <ul className="comics__grid">{arr}</ul>;
    }

    const items = onComics(comics);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {items}
            {spinner}
            <button
                onClick={() => onRequestComics(offset)}
                disabled={newItemLoading}
                className="button button__main button__long"
                style={{ display: charEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
