import React, {useState, useEffect} from 'react';
import {
    Group,
    Cell,
    Avatar,
    Header
} from "@vkontakte/vkui";
import axios from "axios";

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        axios.get('https://ch.24gim.ru/verbal-counting/?method=getTopUsers')
            .then(res => {
                setTopUsers(res.data.data);
            });
    }, []);

    return (
        <div>
            <Group header={<Header mode="secondary">Топ пользователей</Header>}>
                <table>
                    <tbody>
                        {topUsers.map((user, index) =>
                            <tr key={index}>
                                <td className='scoreTop'>{index+1}</td>
                                <td>
                                    <Cell before={
                                    <Avatar
                                        src={user.photo}
                                    />}
                                      description={user.score + ' баллов'}>
                                        {user.firstName} {user.lastName}
                                    </Cell>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Group>
        </div>
    )
}

export default TopUsers;