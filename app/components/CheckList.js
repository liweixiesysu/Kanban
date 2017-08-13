import React from 'react';
import ListItem from './ListItem';
import TaskActionCreator from '../actions/TaskActionCreator';

class CheckList extends React.Component {
    constructor() {
        super();
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') {
            return;
        }

        TaskActionCreator.addTask(this.props.cardId, event.target.value);
        event.target.value = '';
    }

    render() {
        let listItems = this.props.tasks.map(e => {
            return <ListItem key={e.id} cardId={this.props.cardId} taskId={e.id} taskName={e.taskName} callbacks={this.props.callbacks}/>
        });

        return (
            <div className="check-list">
                <ul>
                    {listItems}
                    <input type="text" placeholder="Add a new task" className="add-task"
                           onKeyPress={this.handleKeyPress.bind(this)}/>
                </ul>
            </div>
        )
    }
}

export default CheckList;
