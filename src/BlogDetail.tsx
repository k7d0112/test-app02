import React from 'react';
import { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import { posts } from './data/posts';
import './BlogDetail.css';

type article = {
  id:number,
  title:string,
  content:string,
  categories:string[],
  createdAt:string,
  thumbnailUrl:string,
};

type ArticleProps = {
  article:article | null;
};

const BlogDetail = ({article}:ArticleProps) => {
  const formatDateHyphen = (dateString:string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
  const formatDateSlash = (dateString:string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }

// const article = posts.find(post => post.id === parseInt(id));
  if(!article){
    return <div>記事が見つかりませんでした。</div>
  }
  return (
    <>
      <img className='blogDetail__thumbnail' src={article.thumbnailUrl}/>
      <div className='blogDetail__contents'>
        <div className='blogDetail__tags'>
          <time className='blog__time' dateTime={formatDateHyphen(article.createdAt)}>{formatDateSlash(article.createdAt)}</time>
          <ul className='blog__tag-list'>
            {article.categories.map((category:string,index:number) => <li className='blog__tag' key={index}>{category}</li>)}
          </ul>
        </div>
        <h1 className='blog__title'>{article.title}</h1>
        <p className='blog__text'>{article.content}</p>
      </div>
    </>
  );
}

const BlogDetailShow = () => {
    const { id } = useParams();
    const location = useLocation();
    const [article, setArticle] = useState<article | null>(null);
    const [loading, setLoading] = useState<boolean>(location.state?.loading || true);

    useEffect(() => {
        const fetcher = async () => {
        try {
                const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
                const data = await res.json();
                setArticle(data.post);
            } finally {
            setLoading(false);
            }
        }

      fetcher();
    }, [id]);

    if(loading) {
        return <div>読み込み中です</div>
    }

    return (
        <div className='blogDetail__container'>
            <BlogDetail article={article} />
        </div>
    );
}

export default BlogDetailShow;