import { useState } from "react";
import { useParams } from "react-router"

export default function CreateComments({
    user,
}) {

    const { gameId } = useParams();
    const [commnent, setComment] = useState("");

    const changeHandler = (e) => {
        setComment(e.target.value);
    }

    const submitHandler = async () => {
        try {
            const response = await fetch("http://localhost:3030/jsonstore/comments", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    author: user.email,
                    message: commnent,
                    gameId
                })
            });
            await response.json();

        } catch (err) {
            alert(err.message)
        }
    }
    return (
        // {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={submitHandler}>
                <textarea name="comment" value={commnent} onChange={changeHandler} placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment" disabled={!user} />
            </form>
        </article>
    )
}