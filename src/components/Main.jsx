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

export default function Main() {
    const [posts, setPosts] = useState(InitialPosts)
    function fetchPosts() {
        axios.get('http://localhost:3000/posts')
            .then((res) => {
                // console.log(res.data);

                setPosts(res.data);
                console.log(posts);


            })
    }

    useEffect(fetchPosts, []);

    return (
        <>
            <main>

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

