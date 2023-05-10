import React from 'react'
import { Icon28LikeOutline } from '@vkontakte/icons';
import { Icon28LikeFillRed } from '@vkontakte/icons';

// @ts-ignore
import styles from './Like.module.css';

export interface ILikeProps {
    count: number,
    isLiked: boolean
}

export default function Like(props: ILikeProps) {
  return (
    <div className={styles.container}>
        <div className={styles.icon}>
            {props.isLiked ? (<Icon28LikeFillRed />) : (<Icon28LikeOutline />)}
        </div>
        {props.count}
    </div>
  )
}
