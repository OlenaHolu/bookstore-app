import { useParams } from "react-router-dom"
import BookDetails from "../components/BookDetails";
import Layout from "../components/Layout";

const BookPage = () => {
    const { isbn } = useParams();

    return (
        <Layout>
            <BookDetails />
        </Layout>
    );
};
export default BookPage;