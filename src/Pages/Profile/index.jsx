import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { profile } from '../../actions/profileActions';
import Navbar from '../../components/Navbar';
import EventList from './components/userEventList/';
import Edit from './components/editableRow/';
import { updateProfile,updateImage } from '../../actions/profileActions';
import profileStyles from './index.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: '',
        }
    }
    componentDidMount() {
        this.props.checkToken();
    }
    edit= (value) =>{
        this.setState({edit:value})
        return value;
    }
    render() {
        return (
            <div className="main-content">
                <Navbar history={this.props.history} />
                <div className={"container " + profileStyles.profileContainer}>
                    <div className={profileStyles.profileUser}>
                        <div className={profileStyles.imgContainer}>
                            <img className={profileStyles.profileImg} src={this.props.profile.photoPath && this.props.profile.photoPath.data.secure_url} alt="" />
                            <FontAwesomeIcon icon="edit" className={profileStyles.editImage} onClick={() => { }} />
                            <a className="default-button">Update<input type="file" onChange={(e)=>{
                                this.props.updateImage(e.target.value).then((res)=>{console.log(res)})
                            }} className={'hidden'}/></a>
                        </div>
                        <form className={profileStyles.editUserForm}>
                            {/* <div className={profileStyles.userEmail}>{this.props.profile.firstname} {this.props.profile.lastname}</div> */}
                            <div className={profileStyles.userEmail}>{this.props.profile.email}</div>
                            <Edit param={['firstname',this.props.profile.firstname]} updateUser={this.props.updateUser} label={'First Name'} />
                            <Edit param={['lastname',this.props.profile.lastname]} updateUser={this.props.updateUser} edit={this.edit} label={'Last Name'} />

                            <button className={'button default-button ' + profileStyles.resetButton}>Reset Password</button>
                        </form>
                    </div>
                    <EventList />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    checkToken: () => {
        dispatch(profile());
    },
    updateUser:(params)=>{
        dispatch(updateProfile(params))
    } ,
    updateImage:(params)=>{
        dispatch(updateImage(params))
    }
});

const mapStateToProps = (state) => ({
    profile: state.profile,
});

Profile.propTypes = {
    profile: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
