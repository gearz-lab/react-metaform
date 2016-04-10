import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import * as counterActions  from '../actions/counter';

function mapStateToProps(state) {
    return {
        counter: state.counter,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        counterActions: bindActionCreators(counterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
