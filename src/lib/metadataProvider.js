import _ from 'underscore';
import console from '../lib/helpers/consoleHelpers.js';

class MetadataProvider {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata(metadata) {
        if(!metadata) throw Error('metadata should not be null or undefined');
        if(!metadata.name) throw Error('metadata\'s "name" property is required');
        if(!metadata.type) throw Error('metadata\'s "type" property is required');
    }

    getEntityAndLayout(schema, entityName, layoutName) {
        if (schema === null || schema === undefined) {
            throw new Error(`'getEntityAndLayout' received invalid parameters. Parameter should not be not or undefined. Parameter name: schema`);
        }

        if(schema.entities === undefined || schema.entities === null) {
            throw new Error('Parameter should not be null or undefined. Parameter: ' + schema.entity);
        }

        if (entityName === null || entityName === undefined) {
            throw new Error(`'getEntityAndLayout' received invalid parameters. Parameter should not be not or undefined. Parameter name: entityName`);
        }

        if (layoutName === null || layoutName === undefined) {
            throw new Error(`'getEntityAndLayout' received invalid parameters. Parameter should not be not or undefined. Parameter name: layoutName`);
        }

        let entity = _.find(schema.entities, e => e.name === entityName);
        if(!entity) {
            throw new Error(`Could not find entity. Entity name: ${entityName}`);
        }
        let layout = _.find(entity.layouts, l => l.name === layoutName);
        if(!layout) {
            throw new Error(`Could not find layout. Layout name: ${layoutName}`);
        }
        return {
            entity: entity,
            layout: layout
        }
    }

    getFieldsInternal(schema, entityFields, group, partialResult, fieldPrefix) {
        if(!partialResult) {
            partialResult = [];
        }

        let thisGroupFields = [];

        if(!group.fields && !group.groups) {
            throw Error('a layout can either have fields or groups. Never both.');
        }

        if(group.groups) {
            for(let i = 0; i < group.groups.length; i++) {
                thisGroupFields = _.union(thisGroupFields, this.getFieldsInternal(schema, entityFields, group.groups[i], partialResult, fieldPrefix));
            }
        }
        else if (group.fields) {

            for(let i = 0; i < group.fields.length; i++) {
                let groupField = group.fields[i];

                let existingEntityProperty = _.find(entityFields, field => field.name == groupField.name);

                if(!existingEntityProperty) {
                    throw Error(`cannot find entity field. Field: ${groupField.name}. Group: ${group}`);
                }

                let field = _.extend({}, existingEntityProperty, groupField);
                this.validateFieldMetadata(field);

                field.name = fieldPrefix ? `${fieldPrefix}.${field.name}` : field.name;
                thisGroupFields.push(field);

                if(field.type == 'entity') {
                    field.fuckingShit = 2;
                    if(!field.entityName) {
                        throw Error('when a field is of type \'entity\', it needs to specify an \'entityName\'')
                    }
                    if(!field.layout) {
                        throw Error('when a field is of type \'entity\', it needs to specify a \'layout\'');
                    }
                    let entityAndLayout = this.getEntityAndLayout(schema, field.entityName, field.layout);

                    let thisGroupInnerFields = this.getFieldsInternal(schema, entityAndLayout.entity.fields, entityAndLayout.layout, partialResult, field.name);
                    thisGroupFields = _.union(thisGroupFields, thisGroupInnerFields);
                }
            }
        }
        else {
            throw Error('a layout must have either fields or groups.');
        }
        return _.union(partialResult, thisGroupFields);

    }

    /**
     * Merges the given field collection
     * @param schema
     * @param entityName
     * @layoutName layoutName
     */
    getFields(schema, entityName, layoutName) {
        let entityAndLayout = this.getEntityAndLayout(schema, entityName, layoutName);
        return this.getFieldsInternal(schema, entityAndLayout.entity.fields, entityAndLayout.layout);
    }

    processLayoutField(schema, entityFields, field, fieldPrefix) {
        let entityFieldName = fieldPrefix ? `${fieldPrefix}.${field.name}` : field.name;
        let entityField = _.find(entityFields, f => f.name == entityFieldName);
        if(!entityField) {
            throw Error(`cannot find field. field: ${entityFieldName}. field list: ${entityFields.map(f => f.name)}`);
        }
        let resultingField = {};
        if(entityField.type != 'entity') {
            resultingField.name = entityField.name;
            return resultingField;
        } else {
            // in this case, the field is an entity field
            resultingField.name = entityField.name;
            let entityAndLayout = this.getEntityAndLayout(schema, entityField.entityName, entityField.layout);
            let newFieldPrefix = fieldPrefix ? `${fieldPrefix}.${field.name}` : field.name;
            resultingField.layout = this.processLayoutGroup(schema, entityFields, entityAndLayout.layout, newFieldPrefix);
        }
        return resultingField;
    }

    processLayoutGroup(schema, entityFields, layoutGroup, fieldPrefix) {
        let layoutGroupCopy = _.extend({}, layoutGroup);
        if(layoutGroupCopy.fields) {
            for(let i = 0; i < layoutGroupCopy.fields.length; i++) {
                layoutGroupCopy.fields[i] = this.processLayoutField(schema, entityFields, layoutGroupCopy.fields[i], fieldPrefix);
            }
        }
        else if (layoutGroupCopy.groups){
            for(let i = 0; i < layoutGroupCopy.groups.length; i++) {
                layoutGroupCopy.groups[i] = this.processLayoutGroup(schema, entityFields, layoutGroupCopy.groups[i], fieldPrefix);
            }
        }

        // remove every property that is not 'groups' and 'fields'
        _.each(_.keys(layoutGroupCopy), i => {
            if(i == 'groups' || i == 'fields') {
                return;
            }
            delete layoutGroupCopy[i];
        });

        return layoutGroupCopy;

    }

    processLayout(schema, entityName, layoutName) {
        let fields = this.getFields(schema, entityName, layoutName);
        let entityAndLayout = this.getEntityAndLayout(schema, entityName, layoutName);
        return this.processLayoutGroup(schema, fields, entityAndLayout.layout);
    }
}

export default new MetadataProvider();
