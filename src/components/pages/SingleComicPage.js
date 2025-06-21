import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Spinner from "../spiner/Spinner";
import Error from "../error/Error";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";

import "./singleComic.scss";

export const SingleComicPage = () => {
    const { comicId } = useParams();

    const [comic, setComic] = useState(null);

    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const updateComic = () => {
        clearError();
        getComics(comicId).then(onComicLoaded);
    };

    const skeleton = comic || loading || error ? null : <Skeleton />,
        errorMessage = error ? <Error /> : null,
        spinner = loading ? <Spinner /> : null,
        content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </>
    );
};
