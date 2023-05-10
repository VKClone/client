import React from 'react'
import {
    Panel,
    Group,
    Title
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';
  
import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { loadPosts } from '../../store/slices/feed';

export default function Feed() {
    const dispatch = useAppDispatch();

    const handleScroll = () => {
        let pageNumber = 0

        return () => {
            console.log(pageNumber)
            if (
                pageNumber == 0 || 
                (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
            ) {
                
                dispatch(loadPosts({page: pageNumber}))
                    .then(() => pageNumber += 1)
            }
        }
    }
    React.useEffect(() => {
        const hs = handleScroll()
        hs()
        window.addEventListener("scroll", hs)

        return () => window.removeEventListener("scroll", hs)
    }, []);

    const posts = useSelector((state: RootState) => state.feed.posts)

    return (
        <Panel>
            <Group>
                <Title level="1" style={{margin: 15}}>
                    Новости
                </Title>
            </Group>
            {posts.map((post, i) => (
                <Post
                    key={i}
                    authorUID={post.authorUID}
                    authorFirstName={post.authorFirstName}
                    authorLastName={post.authorLastName}
                    authorImgUrl={post.authorImg || ''}
                    date={post.date}
                    content={post.text || ''}
                    postImgUrl={post.imgUrl || ''}
                    isLiked={true}
                    likesCnt={34}
                />
            ))}
        </Panel>
    )
}
