import React from 'react';
import {
    Panel,
    PanelHeader,
    Div, Button
} from "@vkontakte/vkui";

const Accepted = ({id, func}) => {
    return (
        <Panel id={id}>
            <PanelHeader>
                Соглашение
            </PanelHeader>
            <Div>
                При нажатии кнопки "Я согласен", Вы подтверждаете, что даёте согласие
                на обработку персональных данных таких как "Фамилия", "Имя" и уникальный
                идентификатор (id). Если вы не хотите, чтобы ваши данные отображались в
                общей статистике пользователей, Вы можете изменить это в настройках
                этой игры.
                <br/><br/><br/>
                <Button size='xl' level='2' onClick={func}>Я согласен</Button>
            </Div>
        </Panel>
    )
}

export default Accepted;