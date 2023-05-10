import React from 'react'
import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
    Group,
    CellButton,
    ModalRoot,
    ModalPage,
    Alert,
    ModalPageHeader,
    Cell,
    Separator,
    Placeholder,
    Button,
    Avatar,
    usePlatform,
    useAdaptivityConditionalRender,
    Platform,
    PanelHeaderClose
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';
  import {
    Icon56UsersOutline,
  } from '@vkontakte/icons';
  

export default function Messanger(props:any) {
    const { id } = props

    return (
        <Panel id={id}>
            <Group>
                <Placeholder
                    icon={<Icon56UsersOutline />}
                    header="Мессенджер"
                    
                >
                    Пока нет сообщений
                </Placeholder>

            </Group>
        </Panel>
    )
}
