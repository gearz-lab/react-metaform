import React from 'react';
import Router from 'react-router';
import Routes from '../Routes.js';

const ClientLoader = React.createClass({

    render: function () {

        let browserInitScriptObj = {
            __html:`console.log('fuuuu');`
        };

        return (
            <div>
                <div id="content_place_holder">
                </div>
                <script dangerouslySetInnerHTML={browserInitScriptObj} />
            </div>
        );
    }
});

export default ClientLoader;
