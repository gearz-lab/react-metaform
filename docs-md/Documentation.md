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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#React-metaform#

For an introduction to the library, as well as instructions on how to install, run and build it, please refer to the [README.md](https://github.com/gearz-lab/react-metaform/blob/master/readme.md).

##Metadata##

Metadata is the single most important thing to understand in order to work with `react-metaform`. Basically, you pass a
`schema` to the `MetaForm` component and it renders itself. You can find examples of valid schema [here](https://github.com/gearz-lab/react-metaform/tree/master/src/components/liveSchemaEditorPresets).

These are the most important things you should know about Metadata:

 - The application `schema` is composed of `entities` and `layouts`.
 - `Entities` and `layouts` define `fields`.
 - A `field` is defined both in an `entity` and in a `layout`. However, the `field` exists in the `layout` just so the `MetaForm`
  knows where the `field` to be placed and so it's possible to *override* metadata about the field. For instance. If you
   redefine the `field's` `component` metadata in a particular layout, it's going to be displayed differently.
 - The metadata in a `field` is almost completely flexible, in a sense that almost everything is valid. It is responsibility of
 the component registered in the `ComponentFactory` to interpret that metadata.

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

Represents a `field`. `Fields` can exist in `entities`, `layouts` and `groups`. The resulting metadata for a `field` is
the merge of the `layout/group` and the `entity` it belongs to. Fields are merged based on the `name` metadata.

Metadata | Description
--- | ---
name | The `field` name. This is how a field is identified and merged.
type | The `field` type. This is the default way to determine which component should render this `field`.
 The list of possible values for `type` depends on which component is registered in the `ComponentFactory`. That is,
 `bolinha` is a valid value for `type`, as long as the `ComponentFactory` registered a component for `bolinha`.
 The list of valid values for the `DefaultComponentFactory` can be found [here](https://github.com/gearz-lab/react-metaform/blob/master/src/DefaultComponentFactory.js). 


The MetaForm itself only cares about some
very specific metadata like `name` and `type`. However, every metadata is considered valid by the MetaForm, it is responsibility
 of the component to interpret it.
 
For a component to work with the `MetaForm`, it has to comply with some standards, like being sensitive to some of the common
metadata. For this reason, you can choose to use whatever component you like, however, you should wrap the components
so their `props` are exactly what the `MetaForm` expects.
 
When you are creating a `MetaForm`, you need to pass a `ComponentFactory`. There are 2 available out of the box:

 - [ComponentFactory](https://github.com/gearz-lab/react-metaform/blob/master/src/lib/ComponentFactory.js): This is an
 empty factory. You should use it when you want **complete control** over what components should be rendered for each type.
 Defining your own components also has the advantage of minimizing the resulting bundle.
 - [DefaultComponentFactory](https://github.com/gearz-lab/react-metaform/blob/master/src/lib/DefaultComponentFactory.js):
 This is a `DefaultComponentFactory` already populated with the default components. Using this one may impact your bundle
 size.
 
The following documentation refers to the `DefaultComponentFactory`.
 
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

##Components##

###MetaForm###

A form component that renders itself based on metadata

Prop | Description
componentFactory | The `ComponentFactory` that should be used
schema | The application schema. See [Metadata](https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metadata)
entityName | The name of the `entity` in the `schema`
layoutName | The name of the `layout` in the `entity`
title | The title
