import React, {useEffect} from 'react';
import {platform, IOS} from '@vkontakte/vkui';

import {
    Panel,
    PanelHeader,
    PanelHeaderButton,
    Group,
    Cell,
    Switch,
    FormLayout,
    Select
} from "@vkontakte/vkui";

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import './calc-style.css';

import axios from 'axios';

const osName = platform();

const Calculating = ({id, user, go, serverUser, updateServer}) => {
    let refDisplay = React.createRef();
    const complexity = [
        {
            val: -1,
            name: '0) В зависимости от баллов'
        },
        {
            val: 0,
            name: '1) Легчайший'
        },
        {
            val: 1,
            name: '2) Лёгкий'
        },
        {
            val: 2,
            name: '3) Нормальный'
        },
        {
            val: 3,
            name: '4) Сложный'
        },
        {
            val: 4,
            name: '5) Сложный+'
        },
        {
            val: 5,
            name: '6) Сложный++'
        }
    ];

    const displayTop = () => {
        axios.get('https://ch.24gim.ru/verbal-counting/?method=setUserVisibility&user_id=' +
            user.id + '&display=' + (refDisplay.current.checked ? '1' : '0'));
        updateServer();
    }

    const equationLevel = (e) => {
        console.log(e.target.value);
        axios.get('https://ch.24gim.ru/verbal-counting/?method=setUserLevel&user_id=' +
            user.id + '&level=' + e.target.value);
        updateServer();
    }

    useEffect(() => {
        refDisplay.current.checked = serverUser.display_top === 1;
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Настройки
            </PanelHeader>
            <Group>
                <Cell asideContent={<Switch onChange={displayTop} getRef={refDisplay}/>}>
                    Отображать в общем рейтинге
                </Cell>
                <FormLayout>
                    <Select
                        top="Выберите уровень сложности (баллы начисляются с за уровни: 0, 2-6)"
                        value={complexity[serverUser.equation_level + 1]['val']}
                        onChange={equationLevel}
                    >
                        {
                            complexity.map((data, index) =>
                                <option key={index} value={data.val}>{data.name}</option>
                            )
                        }
                    </Select>
                </FormLayout>
            </Group>
        </Panel>
    );
}

export default Calculating;