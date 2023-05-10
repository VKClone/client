import React from 'react'
import {
    Group,
    Avatar,
    SimpleCell,
    Text,
    Paragraph,
    Footnote
  } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Like from '../like/Like';

// @ts-ignore
import styles from './Post.module.css';
import { Link } from 'react-router-dom';

export interface IPost {
    pid?: string,
    authorUID: string,
    authorFirstName: string,
    authorLastName: string,
    authorImgUrl: string,
    date: string,
    postImgUrl?: string,
    content?: string,
    isLiked: boolean,
    likesCnt: number
}

export default function Post(props: IPost) {
    const date = new Date(props.date)
    const formattedDate = date.toLocaleString()

    return (
        <Group style={{padding: 20}}>
            <Link to={'../user/' + props.authorUID}>
                <SimpleCell 
                    before={<Avatar src={props.authorImgUrl || ''} 
                        initials={(props.authorFirstName[0] + props.authorLastName[0]).toUpperCase()}/>}
                    style={{marginBottom: 10, padding: 0}}
                >
                    <Text weight='1'>{props.authorFirstName + ' ' + props.authorLastName}</Text>
                    <Footnote>{formattedDate}</Footnote>
                </SimpleCell>
                {props.postImgUrl && (
                    <img
                        style={{width: '100%', marginBottom: 10}} 
                        src={props.postImgUrl || ''} 
                    />
                )}
            </Link>
            
            
            {props.content && <Paragraph className={styles.content}>{props.content}</Paragraph >}
            {/* <Like count={props.likesCnt} isLiked={props.isLiked}/> */}
        </Group>
    )
}
