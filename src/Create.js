import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('john');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const blog = { title, body, author };

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('New Blog Add!');
            setIsPending(false);
        });

        history.push('/');
    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />

                <label>Blog body:</label>
                <textarea onChange={(e) => setBody(e.target.value)} value={body} required ></textarea>

                <label>Blog author:</label>
                <select onChange={(e) => setAuthor(e.target.value)} value={author}>
                    <option value="john">John</option>
                    <option value="david">David</option>
                </select>
                {!isPending && <button>Add New blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
}

export default Create;