import { useEffect, useState } from "react"
import { useParams } from "react-router";

export default function DetailsComments({
    refresh
}) {
    const [comments, setComments] = useState([]);
    const { gameId } = useParams();

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/comments")
            .then(res => res.json())
            .then(data => {
                const gameComments = Object.values(data)
                    .filter(comment => comment.gameId === gameId);
    
                setComments(gameComments);
            })
            .catch(err => console.log(err));
    }, [gameId, refresh]);
    

    return(
        <div className="details-comments">
        <h2>Comments:</h2>
        <ul>
            {comments.map(comment => (<li key={comment._id} className="comment">
                <p>{comment.author}: {comment.message}</p>
            </li>))}
        </ul>
        {comments.length === 0 && <p className="no-comment">No comments.</p>}
    </div> 
    )
}