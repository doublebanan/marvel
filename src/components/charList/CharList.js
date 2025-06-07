import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spinner";
import Error from "../error/Error";

import "./charList.scss";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset = this.state.offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    onCharLoaded = (newChars) => {
        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
        }));
    };

    onChar = (items) => {
        console.log(items);
        const arr = items.map((item) => {
            const isImageNotAvailable =
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            const imgStyle = {
                objectFit: isImageNotAvailable ? "contain" : "cover",
            };
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return <ul className="char__grid">{arr}</ul>;
    };

    render() {
        const { chars, loading, error, offset, newItemLoading } = this.state;
        const items = this.onChar(chars);
        const errorMessage = error ? <Error /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}

                {content}

                {spinner}
                <button
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;

// updateStateChars = (newChars) => {
//     // const charsNew = [this.state.chars, ...chars];
//     // this.setState({ chars: charsNew, loading: false });
//     this.setState(({ chars }) => ({
//         chars: [...chars, ...newChars],
//         loading: false,
//     }));
// };
//    // componentDidUpdate(prevState) {
//     if (this.state.chars !== prevState.chars) {
//         this.updateChar();
//     }
// }
