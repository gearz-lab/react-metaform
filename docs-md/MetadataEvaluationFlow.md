Metadata evaluation flow
===

Metadata is evaluated according to the following flow:

Phase | What happens | Where it happens
--- | --- | ---
Merge fields | Metadata from the layout is merged into the entity. Entity properties are also processed into a tree. |  MetadataProvider.getFields
Evaluate fields | Metadata properties can be expressed as a function. At this phase, functions are evaluated to values | MetadataEvaluator.evaluate

