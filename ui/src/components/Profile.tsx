import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Books/home.css";
import Button from '@mui/material/Button';
import { getToken } from './helper';
import jwtDecode from 'jwt-decode';
import { format } from 'date-fns';

type Borrow = {
    id?: number;
    attributes: {
        date_borrowing: Date;
        borrow?: boolean;
        book?: any;
        user?: any;
    }
}

export default function Profile() {

    useEffect(() => {
        fetchBorrowings();
    }, []);
    const [userBorrowings, setUserBorrowings] = useState<Borrow[] | null>(null);
    const fetchBorrowings = () => {
        // Get borrowings
        axios.get(`${import.meta.env.VITE_API_URL}/emprunts?populate=*`)
            .then(response => {
                const borrowings = response.data;
                setUserBorrowings(borrowings.filter((b: any) => b.attributes.user.data?.id === userInfo.id && b.attributes.borrow === true));
            })
            .catch((error) => console.error(error))
    };

    const giveBackBook = (borrowId: number | undefined) => {
        const dateReturn = new Date();
        axios.put(`${import.meta.env.VITE_API_URL}/emprunts/${borrowId}`, {
            data: {
                borrow: false,
                date_return: dateReturn
            }
        })
            .then(() => {
                fetchBorrowings();
            })
    };


    const userInfo: any = jwtDecode(getToken() ?? '');

    return (
        <div className="wrapper">
            {!userBorrowings ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {userBorrowings.length === 0 ? (
                        <h1>Vous n'avez emprunté aucun livre</h1>
                    ) : (
                        <ul className="card-grid">
                            {userBorrowings.map(({ id, attributes: {date_borrowing, book: { data: book } } }) => (
                                <li key={book.id}>
                                    <article className="card">
                                        <div className="card-image">
                                            {book.attributes?.book_cover?.data && (
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
                                            {console.log(date_borrowing)}
                                            <span>Date d'emprunt : {format(new Date(date_borrowing), 'dd MMMM yyyy HH:mm')}</span>
                                            <Button variant="contained" onClick={() => giveBackBook(id)}>Rendre le livre</Button>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}