<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Change log](#change-log)
  - [History](#history)
    - [0.3.2 (Oct 4, 2015)](#032-oct-4-2015)
    - [0.3.1 (Oct 3, 2015)](#031-oct-3-2015)
    - [0.3.0 (Oct 2, 2015)](#030-oct-2-2015)
    - [0.2.11 (Sep 30, 2015)](#0211-sep-30-2015)
    - [0.2.10 (Sep 30, 2015)](#0210-sep-30-2015)
    - [0.2.9 (Sep 29, 2015)](#029-sep-29-2015)
    - [0.2.8 (Sep 26, 2015)](#028-sep-26-2015)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#Change log#

`React-metaform` uses **SemVer 2.0**. Given a version number MAJOR.MINOR.PATCH, increment the:

 - MAJOR version when you make incompatible API changes,
 - MINOR version when you add functionality in a backwards-compatible manner, and
 - PATCH version when you make backwards-compatible bug fixes.
 
However, before the 1.0.0 release, I'm *not changing* the major version, even if the change breaks compatibility.
 
##History##

###0.3.2 (Oct 4, 2015)

 - Bug fixes: The ArrayContainer and the EntityContainer were not using the ComponentBuilder to resolve the group component.
 - There was a bug in the MetadataProvider that was making it impossible to create layout groups inside inner entities.

###0.3.1 (Oct 3, 2015)

 - Bug fixes. The ArrayContainer and the EntityContainer were not working since version 0.3.0.

###0.3.0 (Oct 2, 2015)

 - Now it's possible to define components for the groups (before it was only for fields).
 - Resulting bundle is now smaller. The CodeEditor has been moved out to the demo.

###0.2.11 (Sep 30, 2015)

 - Removing the LiveSchemaEditor from the library (it's now part of the demo).
 - The LiveSchemaEditor version is now dynamic.

###0.2.10 (Sep 30, 2015)

 - Improving the MetaForm resilience to schema errors.

###0.2.9 (Sep 29, 2015)

 - Adding support for text-expressions.


###0.2.8 (Sep 26, 2015)

 - First public release.
