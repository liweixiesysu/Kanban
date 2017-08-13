import React from 'react';
import App from './components/App';
import CardActionCreator from './actions/CardActionCreator';
import {Container} from 'flux/utils';
import CardStore from './stores/CardStore';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            cards:[]
        }
    }

    componentDidMount() {
        CardActionCreator.createWebSocket();

        let initialData = document.body.querySelector('#initialData');
        if (initialData && initialData.textContent) {
            CardActionCreator.initAppContainer(JSON.parse(initialData.textContent));
            return;
        }

        CardActionCreator.fetchCards();
    }

    render() {
        return (
            <App cards={this.props.initialData ? this.props.initialData : this.state.cards} callbacks={
                {
                }
            } children={this.props.children}/>
        )
    }
}

AppContainer.requestInitialData = () => {
}

AppContainer.getStores = () => {return [CardStore]};
AppContainer.calculateState = (prevState) => {
    return {
        cards: CardStore.getState()
    }
}

export default Container.create(AppContainer);
