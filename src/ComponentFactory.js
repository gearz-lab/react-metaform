import React from 'react';
import _ from 'underscore';

// component definitions

class ComponentFactory {

    constructor() {
        // this is expected to contain a property for each supported type
        // and this property's value is expected to be an array of ComponentBuilder
        this.fieldComponentsByType = { };

        // this is expected to contain a property for each component definition
        // and the value is expected to be the component definition itself
        this.fieldComponentsById = { };

        // defaultFieldComponents is expected to contain a property for each supported type
        // and this property's value is expected to be the component definition id
        this.defaultFieldComponents = { }
    }

    /**
     * Validates the given metadata
     * @param metadata
     */
    _validateMetadata(metadata) {
        if(!metadata)
            throw "Metadata should not be null or undefined";
        if(!metadata.type)
            throw "Metadata should have a type";
        if(!metadata.name)
            throw "Metadata should have a name";
    }

    /**
     * Registers a component definition
     * @param id
     * @param types
     * @param component
     */

    registerComponent(id, types, component) {
        // registers the component definition in each given type
        for(var i = 0; i < types.length; i++)
        {
            const type = types[i];
            if(!(type in this.fieldComponentsByType))
                this.fieldComponentsByType[type] = [];
            this.fieldComponentsByType[type].push(component);
        }
        // registers the component definition
        this.fieldComponentsById[id] = component;
    }

    /**
     * @param id The ComponentBuilder id
     */
    getComponent(id) {
        var component = this.fieldComponentsById[id];
        if(!component) {
            throw `Could not find the given component. Id: ${id}`;
        }
        return this.fieldComponentsById[id];
    }

    /**
     * Returns the current component definitions.
     * If a type is specified, returns the definitions for that type only
     * @returns {{}|*}
     */
    getComponents(type) {
        if(!type)
            return this.fieldComponentsByType;
        return this.fieldComponentsByType[type];
    }

    /**
     * Returns the default component definition for the given type
     * @param type
     */
    getDefaultComponent(type) {
        if(!type) throw 'type should have a value';
        if(this.defaultFieldComponents[type])
            return this.getComponent(this.defaultFieldComponents[type]);
        const componentsForType = this.getComponents(type);
        const component = _.first(componentsForType);
        if(!component)
            throw new Error(`Couldn't find any component for the given type. Type: ${type}. Make sure the proper component was registered in the ComponentFactory.`);
        return component;
    }

    /**
     * Sets the default component per type.
     * @param components - An object that should contain a type as a key and a ComponentBuilder as value
     */
    setDefaultComponents(components) {
        this.defaultFieldComponents = components;
    }

    /**
     * Gets the appropriate component based on the given metadata
     * @param props
     * @returns {*}
     */
    buildComponent(props) {
        if(!props) {
            throw Error('The metadata parameter is required');
        }

        this._validateMetadata(props);
        let componentType;
        if(props.component) {
            // if the metadata explicitly specify a component, let's use it
            componentType = this.getComponent(props.component);
        }
        else
        {
            // If the metadata doesn't explicitly specify a component, let's return
            // the default component for type. If there's no default, let's take the first
            // that matches the type
            componentType = this.getDefaultComponent(props.type);
        }
        if(!componentType)
            throw new Error(`Could not resolve the component for type type. Type: ${props.type}`);

        return React.createElement(componentType, props);
    }
}

export default new ComponentFactory();