React-metaform
===

[![Join the chat at https://gitter.im/gearz-lab/react-metaform](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gearz-lab/react-metaform?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![Travis](https://travis-ci.org/gearz-lab/react-metaform.svg)

`React-metaform` is a [React](https://facebook.github.io/react/) library for dynamically generating forms based on metadata.
This is particularly useful for creating data-centric business applications in which the schema is flexible and needs
to be stored in the database. This is also useful in other scenarios in which the forms are dynamic and cannot be hard-coded.
 
This project is similar to [Meteor Autoform](https://github.com/aldeed/meteor-autoform).

**Alpha version disclaimer**

`React-metaform` is under active development. APIs will change and things may still not work as expected. If you find
  any issue, please [report it](https://github.com/gearz-lab/react-metaform/issues). I'll do my best to fix it.

Demo
---

You can check the online demo [here](http://gearz-lab.github.io/react-metaform/demo.html).

Installing
---

For now, `react-metaform` is only supports `npm`. [Bower supported is on the way](https://github.com/gearz-lab/react-metaform/issues/4).

Install:

    npm install react-metaform

Using
---

####MetaForm####

The main React component.

    import MetaForm from 'react-metaform/lib/MetaForm';
    
Additionally, you need a `ComponentFactory`. The `ComponentFactory` is responsible for determining which React
component to use for a given field metadata. `React-metaform` comes with 2 `ComponentFactories`:

####ComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/lib/ComponentFactory.js))####

This a *clean* factory. In order to use it, `import` it, register all your components and then pass it to the `componentFactory`
prop of the `MetaForm`.

    import ComponentFactory from 'react-metaform/lib/ComponentFactory';
    
####DefaultComponentFactory` ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/lib/DefaultComponentFactory.js))####

This is a pre-populated factory, the same used in the [demo](http://gearz-lab.github.io/react-metaform/demo.html).
In order to use it, `import` it and just pass it to the `componentFactory` prop of the `MetaForm`.

    import DefaultComponentFactory from 'react-metaform/lib/DefaultComponentFactory';
    
Alternatively:

    import rmf from 'react-metaform';
    // now these are available:
    //  rmf.MetaForm
    //  rmf.ComponentFactory
    //  rmf.DefaultComponentFactory
    

License
---
`React-metaform` is [MIT](https://github.com/gearz-lab/react-metaform/blob/master/LICENSE) licensed.

