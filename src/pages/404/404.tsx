import React from 'react'
import {
    Group,
    Placeholder,
    Button,
    Link
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';
import { Icon56GhostOutline } from '@vkontakte/icons';

// @ts-ignore
import styles from './404.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
        <Group>
            <Placeholder
                icon={<Icon56GhostOutline />}
                header="404"
                action={<Button size="m"><Link href="/feed">На главную</Link></Button>}
            >
                Такой страницы не существует
            </Placeholder>
        </Group>
    </div>
  )
}
