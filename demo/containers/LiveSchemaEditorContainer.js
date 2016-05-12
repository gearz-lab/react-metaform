import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LiveSchemaEditor from '../components/LiveSchemaEditor';
import * as presetActions from '../actions/presets';

function mapStateToProps(state) {
    return {
        presets: state.presets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        presetActions: bindActionCreators(presetActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSchemaEditor);