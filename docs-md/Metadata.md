<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Metadata](#metadata)
  - [Common](#common)
  - [Input](#input)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Metadata
===

This document describes what is the metadata available for each component. The MetaForm itself only cares about some
very specific metadata like `name` and `type`. Every metadata is considered valid by the MetaForm, it is responsibility
 of the component to interpret it.
 
Common
---

Metadata | Description
--- | ---
name | The field name.
displayName | The user-friendly name for the field.
type | The field type. The `ComponentFactory` is responsible for mapping which component should be rendered based on the `type`.
subType | Sometimes the `type` is not enough and some built-in components will read the `subType` for additional info.
value | The component value. When `value` is set, the components should normally assume the field is calculated and that it is in read-only mode.
readOnly | Whether or not the component should be in read-only state.
onChange | Handles the component change. The callback function receives 2 parameters: The field name and an event which value is the new value for the component. To get the new value you need to access `e.value`.

Input
---

Metadata | Description
--- | ---
maxLength | The maximum number of characters that is allowed.
placeholder | The text that should be displayed as a hint when there's no value.
help | Additional help so the end-user knows what the field is about.
addonBefore | The text that should be added-on before the component.
addonBeforeGlyphicon | The Bootstrap glyphicon that should be added-on before the component. The supported values are available [here](http://getbootstrap.com/components/#glyphicons).
addonAfter | The text that should be added-on after the component.
addonAfterGlyphicon | The  Bootstrap glyphicon that should be added-on after the component. The supported values are available [here](http://getbootstrap.com/components/#glyphicons).
hasFeedback | Whether or not the component should display as invalid. Defaults to true.
groupClassName | The CSS class that should be added to the Bootstrap field group.
labelClassName | The CSS class that should be added to the Bootstrap field label.


 
 