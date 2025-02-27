import axios from 'axios'
import { useEffect, useState } from 'react'

const InitialPosts = [
    {
        id: 0,
        titolo: "Nessun post ancora caricato",
        img: 'aa',
        tags: ''
    }
];

const InitialFormData =
{
    titolo: "",
    author: "",
    contenuto: "",
    tags: ""
};


export default function Main() {
    const [posts, setPosts] = useState(InitialPosts)
    const [NewPost, setNewPost] = useState(InitialFormData);
    function fetchPosts() {
        axios.get('http://localhost:3000/posts')
            .then((res) => {
                // console.log(res.data);

                setPosts(res.data);
                // console.log(posts);


            })
    }

    function handleFormData(e) {
        const value = e.target.value;
        setNewPost((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();


        axios.post("http://localhost:3000/posts", NewPost)
            .then((res) =>
                setPosts((post) => [...post, res.data])

            )
            .catch(err => {
                console.log(err)
            })

        setNewPost(InitialFormData);
    }

    useEffect(fetchPosts, []);

    return (
        <>
            <main>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="titolo"
                        value={NewPost.titolo}
                        onChange={handleFormData}
                        placeholder="nome" />
                    <input
                        type="text"
                        name="author"
                        value={NewPost.author}
                        onChange={handleFormData}
                        placeholder="autore" />
                    <input
                        type="text"
                        name="tags"
                        value={NewPost.tags}
                        onChange={handleFormData}
                        placeholder="categoria" />
                    <textarea
                        name="contenuto"
                        id=""
                        placeholder="contenuto post"
                        value={NewPost.contenuto}
                        onChange={handleFormData}
                    ></textarea>

                    <button>Invia</button>
                </form>

                {
                    posts.map((post) => (
                        <div key={post.id}>
                            <h2>{post.titolo}</h2>
                            <img src={post.img} alt={post.titolo} />
                            <p>{post.tags}</p>
                        </div>
                    ))
                }


            </main >
        </>
    )
}

