import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainStyles from './editableRow.css';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: '',
            isEdit: false,
        };
    }

    editUserParametr = (userParam) => {
        let userParamValue = this.props.profile[userParam];
    }

    isEdit = () => { this.setState({ isEdit: !this.state.isEdit }); }

    render() {

        return (
            // <form action="" onClick={() => { this.isEdit() }}>
            <>

                <label>
                    <span>{this.props.label}: </span>
                    {!this.state.isEdit ? (
                        <span className={mainStyles.editContainer}>
                            <div>{this.props.param[1]}</div>
                            <FontAwesomeIcon icon="edit" onClick={() => { this.isEdit(); }} />
                        </span>
                    ) : (
                        <span>
                            <input value={this.state.edit} onChange={e => { this.setState({ edit: e.target.value }); }} className='default-input' />
                            <button className={'default-button'} onClick={e => {
                                e.preventDefault();
                                this.isEdit();
                                this.props.updateUser({[this.props.param[0]]:this.state.edit});
                            }
                            }>Save</button>
                        </span>
                    )}

                </label>
            </>
            // </form>
        );
    }
}
