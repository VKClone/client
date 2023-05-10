import React from 'react'
import {
    SplitLayout,
    SplitCol,
    Group,
    Button,
    Avatar,
    Paragraph,
    Title,
    Div,
    ButtonGroup
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';

export interface IUserInfo {
    isMe: boolean,
    isFriend?: boolean,
    imgUrl?: string|null,
    lastName: string,
    firstName: string,
    description: string
}  

export default function UserInfo(props: IUserInfo) {
    const initials = (props.firstName[0] + props.lastName[0]).toUpperCase();
    return (
        <Group>
            <Div style={{padding: 30}}>
                <SplitLayout>
                    <SplitCol width={180} maxWidth={180}>
                        <Avatar src={props.imgUrl || ''} size={150} initials={initials}/>
                    </SplitCol>
                    <SplitCol>
                        <Title style={{marginBottom: 15, marginTop: 15}}>
                            {props.firstName + ' ' + props.lastName}
                        </Title >
                        <Paragraph>{props.description}</Paragraph>
                        {/* {!props.isMe && (
                            <ButtonGroup mode="horizontal" gap="m" style={{ marginTop: 20 }}>
                                <Button size="l" appearance="accent" >
                                    Написать
                                </Button>
                                {!props.isFriend ? (
                                    <Button size="l" appearance="accent" mode='secondary'>
                                        Добавить в друзья
                                    </Button>
                                ):(
                                    <Button size="l" appearance="accent" mode='secondary'>
                                        Удалить из друзей
                                    </Button>
                                )}
                            </ButtonGroup>
                        )} */}
                    </SplitCol>
                </SplitLayout>
            </Div>
        </Group>
    )
}
