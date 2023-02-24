import { EditAttributes } from '@mui/icons-material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useDebounce from "../useDebounce";
import "./home.css";
import Button from '@mui/material/Button';
import { getToken } from '../helper';
import jwtDecode from 'jwt-decode';

type Book = {
    id?: number;
    attributes?: {
        title?: string;
        author?: string;
        book_cover?: string;
        borrow?: boolean;
    }
}

type Borrow = {
    id?: number;
    borrow?: boolean;
    books?: number;
}

export default function Books() {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const debouncedValue = useDebounce(searchTerm, 500);

    const [paginate, setPaginate] = useState(8);

    const [availableBooks, setAvailableBooks] = useState<any[]>([]);
    const [unavailableBooks, setUnavailableBooks] = useState<any[]>([]);

    const [error, setError] = useState<string>();

    const [borrowings, setBorrowings] = useState<Borrow[]>([]);


    const fetchBooks = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/livres?populate=*`)
            .then(response => {
                const fetchedBooks: any[] = response.data;
                setAvailableBooks(fetchedBooks.filter(b => !b.attributes.borrow.data?.attributes.borrow));
                setUnavailableBooks(fetchedBooks.filter(b => b.attributes.borrow.data?.attributes.borrow));

            })
            .catch((error) => {
                setError(error);
            });
    }

    const fetchBorrowings = () => {
        // Get borrowings
        axios.get(`${import.meta.env.VITE_API_URL}/emprunts?populate=*`)
            .then(response => setBorrowings(response.data))
            .catch((error) => console.error(error))
    };

    useEffect(() => {
        fetchBooks();
        fetchBorrowings();
        availableBooks;
        unavailableBooks;
    }, []);

    // const items = Object.values([books]);

    // const search_parameters = Object.keys(Object.assign({}, ...items));

    // function search(books: any[]) {
    //     return books.filter((item) =>
    //         search_parameters.some((parameter) =>
    //             item[parameter].toString().toLowerCase().includes(searchTerm)
    //         )
    //     );
    // }

    const load_more = (_event: any) => {
        setPaginate((prevValue: number) => prevValue + 8);
    };


    const handleBorrow = (bookId: number) => {
        const tokenInfo: any = jwtDecode(getToken() ?? '');
        axios.post(`${import.meta.env.VITE_API_URL}/emprunts`, {
            data: {
                book: bookId,
                user: tokenInfo.id ?? 0,
                date_borrowing: new Date()
            }
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(({ data }) => {
                fetchBorrowings();
            }).catch(e => setError(e.response.data));


    }

    useEffect(() => {
        console.log(debouncedValue)
    }, [debouncedValue])

    return (
        <div className="wrapper">
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Rechercher"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="sr-only">Recherche</span>
                </label>
            </div>
            <div>
                <Button variant="contained" className="createBook"
                    href="/createBook">Ajouter un livre</Button>
                <div>
                    <h2>Livres disponibles</h2>
                    <ul className="card-grid">
                        {borrowings && availableBooks
                            .filter((book) => {
                                return book.attributes.title?.toLowerCase().includes(debouncedValue.toLowerCase())
                            })
                            // .sort((a,b) => )
                            .map((book: any) => (
                                <li key={book.id}>
                                    <article className="card">
                                        <div className="card-image">
                                            {book.attributes.book_cover?.data && (
                                                <img
                                                    src={`${import.meta.env.VITE_STRAPI_URL}${book.attributes.book_cover.data.attributes.url}`}
                                                    alt="Cover_book"
                                                />
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-name">{book.attributes.title}</h3>
                                            <ol className="card-list">
                                                <li>
                                                    Auteur:{" "}
                                                    <span>{book.attributes.author}</span>
                                                </li>
                                            </ol>
                                            {/* Dans borrowings, pour ceux qui ont l'id du livre courant (array filter js), regarder si au moins un d'eux à une valeur à true pour "eumprunté", si oui emprunté, sinon disponible */}
                                            {borrowings.filter((b: any) => b?.attributes?.book?.data?.id === book.id && b.attributes.borrow).length > 0 ? (
                                                <Button variant="contained" disabled>Emprunté</Button>
                                            ) : (
                                                <Button variant="contained" onClick={() => handleBorrow(book.id)}>Emprunter</Button>)}
                                        </div>
                                    </article>
                                </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <h2>Livres empruntés</h2>
                    <ul className="card-grid">
                        {borrowings && unavailableBooks
                            .filter((book) => {
                                return book.attributes.title?.toLowerCase().includes(debouncedValue.toLowerCase())
                            })
                            // .sort((a,b) => )
                            .map((book: any) => (
                                <li key={book.id}>
                                    <article className="card">
                                        <div className="card-image">
                                            {book.attributes.book_cover?.data && (
                                                <img
                                                    src={`${import.meta.env.VITE_STRAPI_URL}${book.attributes.book_cover.data.attributes.url}`}
                                                    alt="Cover_book"
                                                />
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-name">{book.attributes.title}</h3>
                                            <ol className="card-list">
                                                <li>
                                                    Auteur:{" "}
                                                    <span>{book.attributes.author}</span>
                                                </li>
                                            </ol>
                                            {/* Dans borrowings, pour ceux qui ont l'id du livre courant (array filter js), regarder si au moins un d'eux à une valeur à true pour "eumprunté", si oui emprunté, sinon disponible */}
                                            {borrowings.filter((b: any) => b?.attributes?.book?.data?.id === book.id && b.attributes.borrow).length > 0 ? (
                                                <Button variant="contained" disabled>Emprunté</Button>
                                            ) : (
                                                <Button variant="contained" onClick={() => handleBorrow(book.id)}>Emprunter</Button>)}
                                        </div>
                                    </article>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {/* <button onClick={load_more}>Voir plus</button> */}
        </div>
    )
}