import React, {useEffect, useState} from 'react';
import {platform, IOS} from '@vkontakte/vkui';

import {
    Panel,
    PanelHeader,
    PanelHeaderButton
} from "@vkontakte/vkui";

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';

import './calc-style.css';

import Effect from "./Effect";

import axios from 'axios';

const osName = platform();

const Calculating = ({id, user, go}) => {
    const [input, setInput] = useState('');
    const [equation, setEquation] = useState(undefined);
    // const [score, setScore] = useState(0);
    const [effect, setEffect] = useState(null);

    const addVal = (e) => {
        let val = e.currentTarget.dataset.num;
        if ((val === '.' && input.indexOf('.') === -1) || val !== '.')
            if (input === '0' && val === '.')
                setInput(input + '' + val);
            else if (input === '0')
                setInput(val);
            else
                setInput(input + '' + val);
    }

    const clear = () => setInput('');

    const deleteLastChar = () => setInput(input.slice(0, input.length - 1));

    const sendEq = () => {
        if (input.length > 0 && input[0] !== '.')
            axios.get('https://ch.24gim.ru/verbal-counting/?method=sendEquation&user_id=' +
                user.id + '&equation=' + equation + '&answer=' + input)
                .then(res => {
                    setEquation(res.data.eq);
                    // setScore(res.data.score);
                    setEffect(null);
                    setEffect(<Effect type={res.data.answer} />)
                    clear();
                    setTimeout(() => {
                        setEffect(null)
                    }, 2000);
                });
    }

    const getEq = () => {
        axios.get('https://ch.24gim.ru/verbal-counting/?method=getEquation&user_id=' + user.id)
            .then(res => {
                setEquation(res.data.eq);
                // setScore(res.data.score);
                // console.log(res);
            });
    }

    useEffect(() => {
        getEq();
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Тренировка
            </PanelHeader>
            {effect}
            <div className="equation">
                Найдите x:
                <br/>
                {equation} = x
            </div>
            <div className="input">
                {input}
            </div>
            <div className="panel">
                <table
                    className="btn-table"
                    align="center"
                >
                    <tbody>
                    <tr>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'7'}>
                                <div className="btn-text">
                                    7
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'8'}>
                                <div className="btn-text">
                                    8
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'9'}>
                                <div className="btn-text">
                                    9
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'4'}>
                                <div className="btn-text">
                                    4
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'5'}>
                                <div className="btn-text">
                                    5
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'6'}>
                                <div className="btn-text">
                                    6
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'1'}>
                                <div className="btn-text">
                                    1
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'2'}>
                                <div className="btn-text">
                                    2
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={addVal} data-num={'3'}>
                                <div className="btn-text">
                                    3
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className="buttons">
                        <td>
                            <div className="btn" onClick={addVal} data-num={'0'}>
                                <div className="btn-text">
                                    0
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn">
                                <div className="btn-text" onClick={addVal} data-num={'.'}>
                                    .
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="btn" onClick={clear}>
                                <div className="btn-text">
                                    С
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className="buttons">
                        <td colSpan="1" onClick={deleteLastChar}>
                            <div className="btn">
                                <div className="btn-text">
                                    <center>
                                        <Icon28ArrowLeftOutline/>
                                    </center>
                                </div>
                            </div>
                        </td>
                        <td colSpan="2" onClick={sendEq}>
                            <div className="btn ok">
                                <div className="btn-text">
                                    Ок
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Panel>
    );
}

export default Calculating;