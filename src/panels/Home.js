import React, {useState} from 'react';

import {
    Group,
    Panel,
    PanelHeader,
    Button,
    Div,
    Card,
    Avatar, Cell
} from "@vkontakte/vkui";

import axios from 'axios';

import './style.css';
import TopUsers from "./TopUsers";


const Home = ({id, go, user, serverUser}) => {
    const [score, setScore] = useState(undefined);

    const getData = () => {
        axios.get('https://ch.24gim.ru/verbal-counting/?method=getUserData&user_id=' + user.id)
            .then(res => {
                setScore(res.data.score);
            });
        return true;
    }

    return (
        <Panel id={id}>
            <PanelHeader>
                Устный счёт
            </PanelHeader>
            {(user && serverUser && getData()) &&
            <>
                <Group title="Navigation Example">
                    <Div>
                        <Card className="main-score">
                            <center>
                                <Avatar
                                    size={100}
                                    src={user.photo_max_orig}/>
                            </center>
                            {score} баллов
                        </Card>
                        <Cell>
                            <Button size="xl" level="2" onClick={go} data-to="calculating">
                                Начать тренироваться
                            </Button>
                        </Cell>
                        <Cell>
                            <Button size="xl" level="2" onClick={go} data-to="settings">
                                Настройки
                            </Button>
                        </Cell>
                    </Div>
                </Group>
                <Group>
                    <TopUsers/>
                </Group>
            </>
            }
        </Panel>
    );
};

export default Home;
