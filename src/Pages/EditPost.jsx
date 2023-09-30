import React, { useState, useEffect } from "react";
import service from "../appwrite/Config";
import { Container, PostCard, PostForm } from "../Components";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams;
  const navigate = useNavigate();

  useEffect(()=>{
    if(slug){
        service.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
        })
    }else{
        navigate("/")
    }

  }, [slug, navigate])

  return posts ? (
    <div className="py-8">
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ): null;
};

export default EditPost;
