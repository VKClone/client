import React from 'react'
import {
    Panel
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';
import Post from '../../components/post/Post';
import NewPost from '../../components/newPost/NewPost';
import UserInfo from '../../components/userInfo/UserInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { clearUser, getUserData, loadPosts } from '../../store/slices/userpage';

export default function UserPage() {
    const { uid } = useParams();

    const dispatch = useAppDispatch();
    const isMe = useSelector((state: RootState) => state.auth.uid === uid)
    const jwt = localStorage.getItem('token') || ''

    const handleScroll = () => {
        let pageNumber = 0

        console.log(pageNumber)
        return () => {
            if (
                (pageNumber == 0 || 
                (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) 
                && uid
            ) {
                dispatch(loadPosts({uid, jwt, page: pageNumber}))
                    .then(() => pageNumber += 1)
            }
        }
    }

    React.useEffect(() => {
        if (uid) {
            dispatch(getUserData({uid, jwt}))
        }
        return () => {dispatch(clearUser())} 
    }, [uid])

    React.useEffect(() => {
        const hs = handleScroll()
        hs()
        window.addEventListener("scroll", hs)

        return () => window.removeEventListener("scroll", hs)
    }, []);

    const userData = useSelector((state:RootState) => state.userpage.userData)
    const posts = useSelector((state: RootState) => state.userpage.posts)

    return (
        <Panel >
            {userData && (
                <UserInfo 
                    isMe={isMe}
                    imgUrl={userData.img_url}
                    lastName={userData.last_name}
                    firstName={userData.first_name}
                    description={userData.profile_description}
                />
            )}
            {isMe && userData && (
                <NewPost author={userData} />
            )}
            {posts.map((post, i) => (
                <Post
                    key={i}
                    authorUID={post.authorUID.toString()}
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
