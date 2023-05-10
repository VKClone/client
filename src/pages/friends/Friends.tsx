import React from 'react'
import {
    Panel,
    Group,
    Separator,
    Placeholder,
    Button,
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';
  import {
    Icon56MentionOutline,
    Icon56UsersOutline
  } from '@vkontakte/icons';
  

export default function Friends(props:any) {
    const { id } = props

    return (
        <Panel id={id}>
            <Group>
                <Placeholder
                    icon={<Icon56UsersOutline />}
                    header="Друзья"
                    action={<Button size="m">Подключить сообщества</Button>}
                >
                    Подключите сообщества, от которых Вы хотите получать уведомления
                </Placeholder>
                <Separator />
                <Placeholder icon={<Icon56MentionOutline />}>
                    Введите адрес страницы в поле поиска
                </Placeholder>
            </Group>
        </Panel>
    )
}
