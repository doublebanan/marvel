import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spinner";
import Error from "../error/Error";

import "./charList.scss";

const CharList = (props) => {
    const [chars, setChar] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset = 0, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset).then(onCharLoaded);
    };

    const onCharLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChar((chars) => [...chars, ...newChars]);

        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    function onChar(items) {
        const arr = items.map((item, i) => {
            const isImageNotAvailable =
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            const imgStyle = {
                objectFit: isImageNotAvailable ? "contain" : "cover",
            };
            return (
                <li
                    className="char__item"
                    ref={(el) => (itemRefs.current[i] = el)}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return <ul className="char__grid">{arr}</ul>;
    }

    const items = onChar(chars);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {items}
            {spinner}
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                className="button button__main button__long"
                style={{ display: charEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
