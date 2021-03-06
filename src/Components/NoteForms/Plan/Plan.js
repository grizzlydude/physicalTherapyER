import React, { Component } from 'react'
import { connect } from 'react-redux';
import { planUpdateAction } from '../../redux/reducer';
import './Plan.css';

class Plan extends Component {

    initialState = {
        diagnosisInput: '',
        planOfCareInput: '',
        numberOfVisitsInput: 0
    };

    constructor() {
        super()
        this.state = this.initialState
    };

    componentDidMount() {
        this.setState(this.props.plan);
    };

    handleChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    };

    previous = () => {
        this.props.history.push('/webnote/assessment');
    };

    goToSaveNote = () => {
        console.log('Submitting Plan');
        this.props.planUpdateAction(this.state);
        this.props.history.push('/webnote/savenote');
    };

    render() {
        return (
            <div className='planBody'>
                <div className='planWrapper'>
                    <div className='planTitle'>
                        <h1>Plan</h1>
                    </div>
                    <div className='planInput'>
                        <span>Diagnosis</span>
                        <input type='text'
                            value={this.state.diagnosisInput}
                            onChange={(e) => this.handleChange(e, 'diagnosisInput')} />
                        <span>Number of Visits a Week</span>
                        <input type='text'
                            value={this.state.numberOfVisitsInput}
                            onChange={(e) => this.handleChange(e, 'numberOfVisitsInput')} />
                        <span>Plan of Care</span>
                        <input type='number'
                            value={this.state.planOfCareInput}
                            onChange={(e) => this.handleChange(e, 'planOfCareInput')} />
                    </div>
                    <div className='planButton'>
                        <button onClick={this.previous}>Previous</button>
                    <button onClick={this.goToSaveNote}>View Note</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { plan } = reduxState;
    return { plan };
}

const mapDispatchToProps = {
    planUpdateAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);