import AutoForm from '../../src/AutoForm';

var schema = {
    entities: [
        {
            name: 'contact',
            fields: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'email',
                    type: 'string'
                }
            ]
        }
    ]
};

export default <AutoForm schema={schema} />;
