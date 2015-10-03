<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [React-metaform](#react-metaform)
  - [Metadata](#metadata)
    - [Schema](#schema)
    - [Entity](#entity)
    - [Layout](#layout)
    - [Group](#group)
    - [Field](#field)
      - [Common](#common)
      - [Input](#input)
      - [CheckBox](#checkbox)
      - [Select and Lookup](#select-and-lookup)
  - [Lib](#lib)
    - [Component factories](#component-factories)
      - [ComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/ComponentFactory.js))](#componentfactory-sourcehttpsgithubcomgearz-labreact-metaformblobmastersrccomponentfactoryjs)
      - [DefaultComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/DefaultComponentFactory.js))](#defaultcomponentfactory-sourcehttpsgithubcomgearz-labreact-metaformblobmastersrcdefaultcomponentfactoryjs)
  - [Components](#components)
    - [MetaForm](#metaform)
    - [Third party](#third-party)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#React-metaform#

> Be patient. This documentation is still under construction. Pull-requests are welcome.

For an introduction to the library, as well as instructions on how to install, run and build it, please refer to the [README.md](https://github.com/gearz-lab/react-metaform/blob/master/readme.md).

##Metadata##

Metadata is the single most important thing to understand in order to work with `react-metaform`. Basically, you pass a
`schema` to the `MetaForm` component and it renders itself. You can find examples of valid schema [here](https://github.com/gearz-lab/react-metaform/tree/master/demo/components/liveSchemaEditorPresets).

These are the most important things you should know about Metadata:

 - The application `schema` is composed of `entities` and `layouts`.
 - `Fields` are defined in `entities` and `layouts`.
 - Each `field` is going to become a component.
 - `Field`'s metadata is passed to the components as `props`.
 - `Field` metadata is merged from the `layout` to the `entity` before being passed to the components. It's possible to override `field` metadata in the `layout`. 
 - Each `Field` metadata can be either a literal or a function. When it's a function, it's evaluated automatically every time the
 form changes.

###Schema###

The root of all metadata. It may represent your entire application schema or just a subset of it. If you choose to pass only
a subset to the `MetaForm`, make sure it contains all the referenced `entities`.
 
Metadata | Description
--- | ---
entities | An array of `entity`.

###Entity###

Represents an `entity`. 

Metadata | Description
--- | ---
name | The `entity` name
fields | An array or `field`.
layouts | An array or `layout`.

###Layout###

Represents a visualization of an `entity`. Examples of layouts would be `edit` and `details`.  Every `entity` field that
 should be displayed in a `layout`  should be declared both in the `entity.fields` and in the `layout.fields` or `layout.someGroup.fields`.
  Fields are  merged based on the `name` metadata.
  
Metadata | Description
--- | ---
name | The `layout` name
orientation | How the fields to should be layed out. Valid values are "horizontal" and "vertical". Defaults to "vertical".
fields | An array of `field`. These `fields` are merged with the fields from the `entity` this layout belongs to. Fields are
merged based on the `name` metadata.
groups | (optional) An array of `group`.

###Group###

Represents a group in the `layout`. Groups exist just so the `layouts` are flexible and customizable.

Metadata | Description
--- | ---
orientation | How the fields to should be layed out. Valid values are "horizontal" and "vertical". Defaults to "vertical".
fields | An array of `field`. These `fields` are merged with the fields from the `entity` this layout belongs to. Fields are
merged based on the `name` metadata.
groups | (optional) An array of `group`.

###Field###

Represents a `field`. `Fields` can exist in `entities`, `layouts` or `groups`. `Field` metadata are passed to the component as `props`.
 
 Each `field` metadata's value can be in one of the following formats:
 
 Format | Description
 --- | ---
 Literal | Example: 'Andre' or 2.
 Function | When a field metadata value is a function, it's evaluated and the value is passed to the target component as a `prop`.  Functions receive two parameters: `m`, which is the current model, and `h`, which is a collection of helper methods for dealing with number formats, for instance.  Example: function(m, h) { return m.name }
 Text expression | Functions are not that easy to store in the database. For this reason, a field can be defined as a text expression. Text expressions are `strings` that start with `_exp`. Example: _exp:m.name
 
Fields can have any sorts of metadata, as long as the component registered in the `ComponentFactory` takes this metadata
into account.

These are the metadata that are component agnostic: 

Metadata | Description
--- | ---
name | The `field` name. This is how a field is identified and merged.
type | The `field` type. This is the default way to determine which component should render this `field`.
 The list of possible values for `type` depends on which component is registered in the `ComponentFactory`. That is,
 `bolinha` is a valid value for `type`, as long as the `ComponentFactory` registered a component for `bolinha`.
 The list of valid values for the `DefaultComponentFactory` can be found [here](https://github.com/gearz-lab/react-metaform/blob/master/src/DefaultComponentFactory.js). 

Other `field` metadata will depend on the component.
 
####Common####

Metadata that is common to most of the components.

Metadata | Description
--- | ---
name | The field name.
displayName | The user-friendly name for the field.
type | The field type. The `ComponentFactory` is responsible for mapping which component should be rendered based on the `type`.
subType | Sometimes the `type` is not enough and some built-in components will read the `subType` for additional info.
value | The component value. When `value` is set, the components should normally assume the field is calculated and that it is in read-only mode.
component | Which component to use. 
readOnly | Whether or not the component should be in read-only state.
onChange | Handles the component change. The callback function receives 2 parameters: The field name and an event which value is the new value for the component. To get the new value you need to access `e.value`.
help | Additional help so the end-user knows what the field is about.

####Input####

Metadata for the `Input` component.

Metadata | Description
--- | ---
maxLength | The maximum number of characters that is allowed.
placeholder | The text that should be displayed as a hint when there's no value.
addonBefore | The text that should be added-on before the component.
addonBeforeGlyphicon | The Bootstrap glyphicon that should be added-on before the component. The supported values are available [here](http://getbootstrap.com/components/#glyphicons).
addonAfter | The text that should be added-on after the component.
addonAfterGlyphicon | The  Bootstrap glyphicon that should be added-on after the component. The supported values are available [here](http://getbootstrap.com/components/#glyphicons).
feedback | Whether or not the component should show whether it's valid. Possible values are: `true`: Always show. `false`: Never show. `success`: Show only if it's valid. `error`: Show only if it's not valid. Defaults to `error`.
hasFeedbackIcon | If feedback should be displayed, `hasFeedbackIcon` determines whether or not glyphicons should be used as well. Defaults to `true`.
groupClassName | The CSS class that should be added to the Bootstrap field group.
labelClassName | The CSS class that should be added to the Bootstrap field label.

####CheckBox####

Metadata for the CheckBox component. The CheckBox doesn't have any specific metadata.

####Select and Lookup####

Metadata for the Select and Lookup components.

Metadata | Description
--- | ---
options | The options to display. Options are an array of objects with two properties: **value**: The actual value that is stored in the model. **text**: What is displayed to the user

##Lib##

###Component factories###

Component factories are how `react-metaform` knows which component to render for a particular field or group metadata.

####ComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/ComponentFactory.js))####

This a *clean* factory. In order to use it, `import` it, register all your components and then pass it to the `componentFactory`
prop of the `MetaForm`.

    import ComponentFactory from 'react-metaform/lib/ComponentFactory';

####DefaultComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/DefaultComponentFactory.js))####

This is a pre-populated factory, the same used in the [demo](http://gearz-lab.github.io/react-metaform/demo.html).
In order to use it, `import` it and just pass it to the `componentFactory` prop of the `MetaForm`.

    import DefaultComponentFactory from 'react-metaform/lib/DefaultComponentFactory';
    
The `DefaultComponentFactory` relies on [these third-party components](#third-party).

##Components##

###MetaForm###

A form component that renders itself based on metadata

Prop | Description
--- | ---
componentFactory | The `ComponentFactory` that should be used
schema | The application schema. See [Metadata](https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metadata)
entityName | The name of the `entity` in the `schema`
layoutName | The name of the `layout` in the `entity`
title | The title
model | The object used as the model. This object is changed on user interaction.
showBottomBar | Whether or not the bottom bar should be displayed
onModelChange | Function called whenever the model changes 
onSave | Function called when the Save button is clicked
onCancel | Function called when the Cancel button is clicked

###Third party###

The `DefaultComponentFactory` relies on third-party components. Here's the list:

 - [react-bootstrap](http://react-bootstrap.github.io/).
 - [react-select](https://github.com/JedWatson/react-select).
 - [react-widgets](https://github.com/jquense/react-widgets).