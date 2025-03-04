import { useParams } from "react-router-dom"; // For accessing dynamic URL parameters

// Higher-order component to access route parameters using useParams
export default function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() }; // Getting URL params (course and quiz ID)
        return <Children {...props} match={match} />;
    };
}