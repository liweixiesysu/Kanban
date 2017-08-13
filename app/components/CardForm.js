import React from 'react';

class CardForm extends React.Component {
    handleClose(event) {
        this.props.callbacks.handleClose(event);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.callbacks.handleSubmit();

    }

    handleChange(field, event) {
        this.props.callbacks.handleChange(field, event.target.value);
    }

    componentDidMount() {
        let mask = document.createElement('div');
        mask.className = 'mask';
        document.body.appendChild(mask);
    }

    componentWillUnmount() {
        let mask = document.querySelector('.mask');
        document.body.removeChild(mask);
    }

    render() {
        return <form className="card-form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="close-button" onClick={this.handleClose.bind(this)}>X</div>
            <div className="row">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" onChange={this.handleChange.bind(this, 'title')}
                       className="title-input" placeholder="Enter card title" value={this.props.default.title} autoFocus={true}/>
            </div>
            <div className="row">
                <label htmlFor="description">Description</label>
                <input id="description" type="text" name="description" onChange={this.handleChange.bind(this, 'description')}
                       className="description-input" value={this.props.default.description} placeholder="Enter card description"/>
            </div>
            <div className="row">
                <label htmlFor="status">Status</label>
                <select id="status" className="status-select" value={this.props.default.status}
                       onChange={this.handleChange.bind(this, 'status')} name="status">
                    <option value="to-do">To do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div className="row">
                <button className="submit-button">Confirm</button>
            </div>
        </form>
    }
}

export default CardForm;