import { useParams } from "react-router-dom"
import BookDetails from "../components/BookDetails";

const BookPage = () => {
    const { isbn } = useParams();

    return (
        <div>
            <BookDetails />
        </div>
    );
};
export default BookPage;