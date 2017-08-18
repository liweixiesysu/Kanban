import React from 'react';
import CheckList from './CheckList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {DragSource, DropTarget} from 'react-dnd';
import Constants from '../Constants';
import {Link} from 'react-router';
import {connect} from 'react-redux';

let spec = {
    beginDrag(props) {
        return {
            cardId: props.cardId
        }
    }
}

let specForDrop = {
    hover(props, monitor) {
        let cardId = monitor.getItem().cardId;
        props.updateCardPosition(cardId, props.cardId);
    }
}

let collectDrop = (connector, monitor) => {
    return {
        connectDropTarget: connector.dropTarget()
    }
}

let collectDrag = (connector, monitor) => {
    return {
        connectDragSource: connector.dragSource()
    }
}

let mapStateToProps = (state, ownProps) => {
    return {};
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCardPosition: (cardId, dropCardId) => {
            dispatch({
                type: Constants.UPDATE_CARD_POSITION,
                payload: {
                    cardId: cardId,
                    dropCardId: dropCardId
                }
            });
        }
    }
}

class Card extends React.Component {
    constructor() {
        super();
        this.state = {showDetail: false};
    }

    handleClick(event) {
        this.setState({showDetail: !this.state.showDetail})
    }

    render() {
        const {connectDragSource, connectDropTarget} = this.props;

        let checkList;
        if (this.state.showDetail)
        {
            checkList = <CheckList tasks={this.props.tasks} callbacks={this.props.callbacks} cardId={this.props.cardId}/>;
        }

        return connectDropTarget (connectDragSource (
            <div className="card">
                <div className="edit-card"><Link to={"edit/" + this.props.cardId}>#</Link></div>
                <div className="card-title"><h3>{this.props.title}</h3></div>
                <div className="card-description" onClick={this.handleClick.bind(this)}>
                    <div className={this.state.showDetail ? 'card-description-open' : 'card-description-close'}></div>
                    <span>{this.props.description}</span>
                </div>
                <ReactCSSTransitionGroup transitionName="check-list-item" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {checkList}
                </ReactCSSTransitionGroup>
            </div>
        ));
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(Constants.CARD, specForDrop, collectDrop)(DragSource(Constants.CARD, spec, collectDrag)(Card)));
