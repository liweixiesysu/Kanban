class AppController {
    dipatcher(req) {
        switch (req.action) {
            case 'editCard': {
                console.log('Begin to edit card...');
                break;
            }
            case 'addCard': {
                console.log('Begin to add card...');
            }
        }
    }
}

export default AppController;
