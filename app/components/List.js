import React from 'react';
import Card from './Card';
import {DropTarget} from 'react-dnd';
import Constants from '../Constants';
import CardActionCreator from '../actions/CardActionCreator';

let spec = {
    hover(props, monitor) {
        let cardId = monitor.getItem().cardId;
        CardActionCreator.updateCardStatus(cardId, props.className);
    }
}

let collectDrop = (connector, monitor) => {
    return {
        connectDropTarget: connector.dropTarget()
    }
}

class List extends React.Component {
    render(){
        let {connectDropTarget} = this.props;
        let cards = this.props.cards.map(e => {
            return <Card key={e.id} cardId={e.id} title={e.title}
                         description={e.description} tasks={e.tasks} callbacks={this.props.callbacks}/>
        });

        return connectDropTarget (
            <div className={this.props.className}>
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

export default DropTarget(Constants.CARD, spec, collectDrop)(List);
