webpackJsonp([2,3],{

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CardForm = function (_React$Component) {
	    _inherits(CardForm, _React$Component);

	    function CardForm() {
	        _classCallCheck(this, CardForm);

	        return _possibleConstructorReturn(this, (CardForm.__proto__ || Object.getPrototypeOf(CardForm)).apply(this, arguments));
	    }

	    _createClass(CardForm, [{
	        key: 'handleClose',
	        value: function handleClose(event) {
	            this.props.callbacks.handleClose(event);
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            this.props.callbacks.handleSubmit();
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(field, event) {
	            this.props.callbacks.handleChange(field, event.target.value);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var mask = document.createElement('div');
	            mask.className = 'mask';
	            document.body.appendChild(mask);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            var mask = document.querySelector('.mask');
	            document.body.removeChild(mask);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'form',
	                { className: 'card-form', onSubmit: this.handleSubmit.bind(this) },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'close-button', onClick: this.handleClose.bind(this) },
	                    'X'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(
	                        'label',
	                        { htmlFor: 'title' },
	                        'Title'
	                    ),
	                    _react2.default.createElement('input', { id: 'title', type: 'text', name: 'title', onChange: this.handleChange.bind(this, 'title'),
	                        className: 'title-input', placeholder: 'Enter card title', value: this.props.default.title, autoFocus: true })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(
	                        'label',
	                        { htmlFor: 'description' },
	                        'Description'
	                    ),
	                    _react2.default.createElement('input', { id: 'description', type: 'text', name: 'description', onChange: this.handleChange.bind(this, 'description'),
	                        className: 'description-input', value: this.props.default.description, placeholder: 'Enter card description' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(
	                        'label',
	                        { htmlFor: 'status' },
	                        'Status'
	                    ),
	                    _react2.default.createElement(
	                        'select',
	                        { id: 'status', className: 'status-select', value: this.props.default.status,
	                            onChange: this.handleChange.bind(this, 'status'), name: 'status' },
	                        _react2.default.createElement(
	                            'option',
	                            { value: 'to-do' },
	                            'To do'
	                        ),
	                        _react2.default.createElement(
	                            'option',
	                            { value: 'doing' },
	                            'Doing'
	                        ),
	                        _react2.default.createElement(
	                            'option',
	                            { value: 'done' },
	                            'Done'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'submit-button' },
	                        'Confirm'
	                    )
	                )
	            );
	        }
	    }]);

	    return CardForm;
	}(_react2.default.Component);

	exports.default = CardForm;

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _CardForm = __webpack_require__(509);

	var _CardForm2 = _interopRequireDefault(_CardForm);

	var _reactRedux = __webpack_require__(249);

	var _Constants = __webpack_require__(248);

	var _Constants2 = _interopRequireDefault(_Constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EditCard = function (_React$Component) {
	    _inherits(EditCard, _React$Component);

	    function EditCard() {
	        _classCallCheck(this, EditCard);

	        return _possibleConstructorReturn(this, (EditCard.__proto__ || Object.getPrototypeOf(EditCard)).apply(this, arguments));
	    }

	    _createClass(EditCard, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            if (this.props.initialData) {
	                return;
	            }

	            var initialData = document.body.querySelector('#initialData');
	            if (initialData && initialData.textContent) {
	                this.props.initAppContainer(JSON.parse(initialData.textContent));
	            }

	            console.log(this.props.params.id);
	            this.props.createDraft(parseInt(this.props.params.id));
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(field, value) {
	            this.props.updateDraft(field, value);
	        }
	    }, {
	        key: 'handleClose',
	        value: function handleClose() {
	            this.props.history.pushState(null, '/');
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit() {
	            var websocket = this.props.websocket;
	            if (websocket) {
	                websocket.send(JSON.stringify({
	                    action: 'editCard',
	                    card: this.props.card
	                }));
	            }

	            this.props.updateCard(this.props.card);
	            this.props.history.pushState(null, '/');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var card = this.props.card;
	            if (this.props.initialData) {
	                var cardIdx = this.props.initialData.findIndex(function (e) {
	                    return e.id === parseInt(_this2.props.params.id);
	                });
	                card = this.props.initialData[cardIdx];
	            }

	            return _react2.default.createElement(_CardForm2.default, { 'default': card, callbacks: {
	                    handleChange: this.handleChange.bind(this),
	                    handleClose: this.handleClose.bind(this),
	                    handleSubmit: this.handleSubmit.bind(this)
	                } });
	        }
	    }]);

	    return EditCard;
	}(_react2.default.Component);

	function mapStateToProps(state, ownProps) {
	    var cardIdx = state.cards.findIndex(function (e) {
	        return e.id === parseInt(ownProps.params.id);
	    });
	    return {
	        card: state.draft || state.cards[cardIdx],
	        websocket: state.websocket
	    };
	}

	function mapDispatchToProps(dispatch, ownProps) {
	    return {
	        initAppContainer: function initAppContainer(cards) {
	            dispatch({
	                type: _Constants2.default.APP_CONTAINER_INIT,
	                payload: cards
	            });
	        },
	        createDraft: function createDraft(cardId) {
	            dispatch({
	                type: _Constants2.default.CARETE_DRAFT,
	                payload: cardId
	            });
	        },
	        updateDraft: function updateDraft(field, value) {
	            dispatch({
	                type: _Constants2.default.UPDATE_DRAFT,
	                payload: {
	                    field: field,
	                    value: value
	                }
	            });
	        },
	        updateCard: function updateCard(card) {
	            dispatch({
	                type: _Constants2.default.UPDATE_CARD,
	                payload: card
	            });
	        }
	    };
	}

	EditCard.requestInitialData = function () {};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EditCard);

/***/ })

});