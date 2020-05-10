import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import {ConfigProvider} from '@vkontakte/vkui';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Settings from './panels/Settings';
import Calculating from './panels/Сalculating';
import Accepted from './panels/Accepted'
import axios from "axios";

const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [fetchedUser, setUser] = useState(null);
    const [serverUser, setServerUser] = useState(null);
    const [isAcceptedVal, setIsAccepted] = useState(false);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_dark';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            return user;
        }

        async function isAccepted() {
            setIsAccepted(false);
            try {
                const data = await bridge.send('VKWebAppStorageGet', {'keys': ['isAccepted']});
                if (data.keys[0].key === 'isAccepted' && data.keys[0].value === 'true') {
                    setIsAccepted(true);
                    window.history.pushState({page: 'home'}, 'home', 'home');
                } else {
                    setActivePanel('accepted');
                }
            } catch (e) {
                setIsAccepted(false);
                setActivePanel('accepted');
            }
        }

        fetchData().then((user) => {
            getData(user);
        });
        isAccepted();

    }, []);


    const accepted = () => {
        setActivePanel('home');
        setIsAccepted(true);
        bridge.send('VKWebAppStorageSet', {'key': 'isAccepted', 'value': 'true'});
    }

    const getData = (user) => {
        setPopout(<ScreenSpinner size='large'/>);
        axios.get('https://ch.24gim.ru/verbal-counting/?method=getUserData&user_id=' +
            (fetchedUser ? fetchedUser.id : user.id))
            .then(res => {
                setServerUser(res.data);
                setPopout(null);
            });
    }

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
        let history = window.history;
        if(!history.state) {
            history.pushState({page: 'home'}, 'home', 'home');
        }
    };

    window.onpopstate = function (e) {
        if (isAcceptedVal)
            setActivePanel('home');
    };

    return (
        <ConfigProvider
            isWebview={true}
        >
            <View
                activePanel={activePanel}
                popout={popout}
            >
                <Home
                    id='home'
                    go={go}
                    user={fetchedUser}
                    serverUser={serverUser}
                />
                <Settings
                    id='settings'
                    go={go}
                    user={fetchedUser}
                    serverUser={serverUser}
                    updateServer={getData}
                />
                <Calculating
                    id='calculating'
                    go={go}
                    user={fetchedUser}
                />
                <Accepted
                    id='accepted'
                    func={accepted}
                />
            </View>
        </ConfigProvider>
    );
}

export default App;

