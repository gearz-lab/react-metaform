<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Metadata](#metadata)
  - [Common](#common)
  - [Input](#input)
  - [CheckBox](#checkbox)
  - [CodeEditor](#codeeditor)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Metadata
===

This document describes what is the metadata available for each component. The MetaForm itself only cares about some
very specific metadata like `name` and `type`. However, rvery metadata is considered valid by the MetaForm, it is responsibility
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
 
Common
---

Metadata that is common to most of the components.

Metadata | Description
--- | ---
name | The field name.
displayName | The user-friendly name for the field.
type | The field type. The `ComponentFactory` is responsible for mapping which component should be rendered based on the `type`.
subType | Sometimes the `type` is not enough and some built-in components will read the `subType` for additional info.
value | The component value. When `value` is set, the components should normally assume the field is calculated and that it is in read-only mode.
readOnly | Whether or not the component should be in read-only state.
onChange | Handles the component change. The callback function receives 2 parameters: The field name and an event which value is the new value for the component. To get the new value you need to access `e.value`.
help | Additional help so the end-user knows what the field is about.

Input
---

Metadata for the `Input` component.

Metadata | Description
--- | ---
maxLength | The maximum number of characters that is allowed.
placeholder | The text that should be displayed as a hint when there's no value.
addonBefore | The text that should be added-on before the component.
addonBeforeGlyphicon | The Bootstrap glyphicon that should be added-on before the component. The supported values are available [here](http://getbootstrap.com/components/#glyphicons).
addonAfter | The text that should be added-on after the component.
addonAfterGlyphicon | The  Bootstrap glyphicon that should be added-on after the component. The supported values are available [here](http://getbootstrap.com/components/#glyphicons).
hasFeedback | Whether or not the component should display as invalid. Defaults to true.
groupClassName | The CSS class that should be added to the Bootstrap field group.
labelClassName | The CSS class that should be added to the Bootstrap field label.

CheckBox
---

Metadata for the CheckBox component. The CheckBox doesn't have any specific metadata.

CodeEditor
---

Metadata for the `CodeEditor` component

The `CodeEditor` wraps the [react-ace](https://github.com/securingsincity/react-ace). This is useful if you want the end-user
 to be able to write code.
 
Metadata | Description
--- | ---
mode | The language the `CodeEditor` should support. The modes are available in the [react-ace documentation](https://github.com/securingsincity/react-ace).
theme | The theme the `CodeEditor` should be rendered in. The themes are available in the [react-ace documentation](https://github.com/securingsincity/react-ace).
width | The width of the editor. Values have to be passed as string and both `px` and `%` values are supported. Defaults to `100%`.
height | The height of the editor. Values have to be passed as string and only `px` is supported.
fontSize | The numeric value of the font size. Defaults to 12.



 
 