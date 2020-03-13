import React, { useState, useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';
import PostService from '../../services/post.service';


const DemoPage = () => {

    const [posts, setPosts] = useState([]);
    
    const getPosts = async () => {
        try {
            const res = await PostService.getPosts();
            setPosts(res.data);
        
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getPosts();
        console.log(localStorage.getItem("accessToken"));
    }, []);

    return (
        <UserLayout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 mx-auto">
                        <table className="table table-stried table-hover text-center">
                            <thead>
                               <tr>
                                    <th>#</th>
                                    <th>id</th>
                                    <th>userId</th>
                                    <th>title</th>
                               </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post.id}>
                                        <td>{index + 1}</td>
                                        <td>{post.id}</td>
                                        <td>{post.userId}</td>
                                        <td>{post.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};


export default DemoPage;
