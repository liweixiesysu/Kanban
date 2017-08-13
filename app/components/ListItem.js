import React from 'react';
import TaskActionCreator from '../actions/TaskActionCreator';

let taskNamePropType = (props, propName, componentName) => {
    if (!props[propName]) {
        return;
    }

    if (typeof props[propName] !== 'string' || props[propName].length > 10) {
        return new Error(`${propName} in ${componentName} is invalid!`);
    }
}

class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    handleChange(event) {
        if (event.target.checked) {
            this.setState({
                style: {color: 'red'}
            });
            return;
        }

        this.setState({
            style: {color: 'black'}
        });
    }

    render() {
        let checkBoxClass = 'check-box-not-selected';
        if (this.state.style && this.state.style.color === 'red') {
            checkBoxClass = 'check-box-selected';
        }

        return (
            <li>
                <div className={checkBoxClass}>
                    <input type="checkbox" style={{opacity: 0}} onChange={this.handleChange.bind(this)}/>
                </div>
                <span className="task-name" style={this.state.style}>{this.props.taskName}</span>
                <div className="delete-icon" onClick={TaskActionCreator.deleteTask.bind(null, this.props.cardId, this.props.taskId)}>x</div>
            </li>
        )
    }
}

export default ListItem;