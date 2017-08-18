import React from 'react';
import ListItem from './ListItem';
import {connect} from 'react-redux';
import Constants from '../Constants';

class CheckList extends React.Component {
    constructor() {
        super();
    }

    handleKeyPress(event) {
        if (event.key !== 'Enter') {
            return;
        }

        this.props.addTask(this.props.cardId, event.target.value);
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

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addTask: (cardId, taskName) => {
            dispatch({
                type: Constants.ADD_TASK,
                payload: {
                    cardId: cardId,
                    taskName: taskName
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
