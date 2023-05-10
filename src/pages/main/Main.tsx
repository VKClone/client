import React from 'react';
import UserPage from '../userPage/UserPage'

import {
  SplitLayout,
  SplitCol,
  Panel,
  Group,
  Cell,
  useAdaptivityConditionalRender,
  Spacing,
  Separator
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {
  Icon20UserCircleOutline,
  Icon20NewsfeedOutline,
  Icon20MessageOutline,
  Icon20UsersOutline,
  Icon20DoorArrowRightOutline,
  Icon28Menu
} from '@vkontakte/icons';

import { Routes, Route, Link } from 'react-router-dom';

import Friends from '../friends/Friends';
import Feed from '../feed/Feed';
import Messanger from '../messanger/Messanger';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

//@ts-ignore
import styles from './Main.module.css'

export default function Main() {
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activePanelIndex, setActivePanelIndex] = React.useState(0);
  const authStatus = useSelector((state:RootState) => state.auth.authStatus)
  const uid = useSelector((state:RootState) => state.auth.uid)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(authStatus !== 'auth') navigate('/login')
  }, [authStatus]);

  const panels = [
    { icon: Icon20UserCircleOutline, text: 'Моя страница', link: `user/${uid}`},
    { icon: Icon20NewsfeedOutline, text: 'Новости', link: `feed/` },
    // { icon: Icon20MessageOutline, text: 'Мессенджер', link: `messanger`},
    // { icon: Icon20UsersOutline, text: 'Друзья', link: `friends/${uid}` }
  ];

  return (
    <SplitLayout
        style={{ justifyContent: 'center', marginTop: 30 }}
    >
        {viewWidth.tabletPlus && (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
            <Panel>
            <Spacing size={30} />
            <Group>
                {panels.map((p, i) => (
                  <Link key={i} to={p.link} className={styles.link}>
                    <Cell
                        // @ts-ignore
                        before={<p.icon />}
                        onClick={() => setActivePanelIndex(i)}
                    >
                        {p.text}
                    </Cell>
                  </Link>
                ))}
                <Separator></Separator>
                <Cell 
                  before={<Icon20DoorArrowRightOutline />}
                  onClick={() => dispatch(logout())}
                >Выйти</Cell>
            </Group>
            </Panel>
        </SplitCol>
        )}

        <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
          <Routes>
            <Route path="user/:uid" element={<UserPage />} />
            <Route path="feed" element={<Feed />} />
            {/* <Route path="messanger" element={<Messanger />} />
            <Route path="friends/:uid" element={<Friends />} /> */}
          </Routes>
        </SplitCol>
    </SplitLayout>
  );
};
