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
  Header,
  Group,
  SimpleCell,
  FormLayout,
  FormItem,
  Input,
  FormLayoutGroup,
  CellButton
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export default function Login() {
  return (
    <View activePanel="new-user">
      <Panel id="new-user">
        <PanelHeader>Регистрация</PanelHeader>
        <Group>
          <FormLayout>
            <FormItem top="Логин">
              <Input />
            </FormItem>

            <FormItem top="Пароль">
              <Input type="password" placeholder="Введите пароль" />
            </FormItem>
            
          </FormLayout>
        </Group>
      </Panel>
    </View>
  )
}
