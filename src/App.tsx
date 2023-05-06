import React from 'react';
import './App.css';
import Login from './pages/auth/Login'

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
  Platform
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {
  Icon56MentionOutline,
  Icon56UsersOutline,
  Icon56MessageReadOutline
} from '@vkontakte/icons';


function App() {
  // return (
  //   <Routes>
  //     <Route path="/login" element={<Login />} />
  //   </Routes>
  // );
  const panels = ['Моя страница', 'Новости', 'Мессенджер'];
  const modals = ['modal 1', 'modal 2'];

  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [panel, setPanel] = React.useState(panels[0]);
  const [modal, setModal] = React.useState(null);
  const [popout, setPopout] = React.useState(null);

  const modalRoot = (
    <ModalRoot activeModal={modal}>
      <ModalPage
        id={modals[0]}
        onClose={() => setModal(null)}
        header={<ModalPageHeader>Modal 1</ModalPageHeader>}
      >
        <Group>
          {/* @ts-ignore */}
          <CellButton onClick={() => setModal(modals[1])}>Modal 2</CellButton>
        </Group>
      </ModalPage>
      <ModalPage
        id={modals[1]}
        onClose={() => setModal(null)}
        header={<ModalPageHeader>Modal 2</ModalPageHeader>}
      >
        <Group>
          {/* @ts-ignore */}
          <CellButton onClick={() => setModal(modals[0])}>Modal 1</CellButton>
        </Group>
      </ModalPage>
    </ModalRoot>
  );

  const isVKCOM = platform === Platform.VKCOM;

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
        <SplitLayout
          style={{ justifyContent: 'center' }}
          header={!isVKCOM && <PanelHeader separator={false} />}
          popout={popout}
          modal={modalRoot}
        >
          {viewWidth.tabletPlus && (
            <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
              <Panel>
                {!isVKCOM && <PanelHeader />}
                <Group>
                  {panels.map((i) => (
                    <Cell
                      key={i}
                      disabled={i === panel}
                      style={
                        i === panel
                          ? {
                              backgroundColor: 'var(--vkui--color_background_secondary)',
                              borderRadius: 8,
                            }
                          : {}
                      }
                      onClick={() => setPanel(i)}
                    >
                      {i}
                    </Cell>
                  ))}
                  <Separator />
                  {/* @ts-ignore */}
                  <Cell onClick={() => setModal(modals[0])}>modal 1</Cell>
                  {/* @ts-ignore */}
                  <Cell onClick={() => setModal(modals[1])}>modal 2</Cell>
                  <Cell
                  // @ts-ignore
                    onClick={() => setPopout(<Alert header="Alert!" onClose={() => setPopout(null)} />)}
                  >
                    alert
                  </Cell>
                </Group>
              </Panel>
            </SplitCol>
          )}

          <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
            <View activePanel={panel}>
              <Panel id={panels[0]}>
                <PanelHeader after={<Avatar size={36} />}>Panel 1</PanelHeader>
                <Group>
                  <Placeholder
                    icon={<Icon56UsersOutline />}
                    header="Уведомления от сообществ"
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

              <Panel id={panels[1]}>
                <PanelHeader after={<Avatar size={36} />}>Panel 2</PanelHeader>
                <Group>
                  <Placeholder>Доступ запрещён</Placeholder>
                  <Separator />
                  <Placeholder header="Находите друзей" action={<Button size="m">Найти друзей</Button>}>
                    Здесь будут отображаться люди, которых вы добавите в друзья
                  </Placeholder>
                </Group>
              </Panel>

              <Panel id={panels[2]}>
                <PanelHeader after={<Avatar size={36} />}>Panel 3</PanelHeader>
                <Group>
                  <Placeholder
                    icon={<Icon56MessageReadOutline />}
                    action={
                      <Button size="m" mode="tertiary">
                        Показать все сообщения
                      </Button>
                    }
                  >
                    Нет непрочитанных
                    <br />
                    сообщений
                  </Placeholder>
                </Group>
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
