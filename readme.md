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
  These are the [known issues scheduled for the 1.0.0 version](https://github.com/gearz-lab/react-metaform/milestones/1.0.0).

Demo
---

You can check the [online demo here](http://gearz-lab.github.io/react-metaform/demo.html).

Docs
---

[Docs are available here](https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md).

Installing
---

For now, `react-metaform` is only supports `npm`. [Bower supported is on the way](https://github.com/gearz-lab/react-metaform/issues/4).

Install:

    npm install react-metaform

Using
---

####MetaForm ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/MetaForm.js))####

The main React component.

    import MetaForm from 'react-metaform/lib/MetaForm';
    
The `MetaForm` props are listed [here](https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metaform).
    
Additionally, you need a `ComponentFactory`. The `ComponentFactory` is responsible for determining which React
component to use for a given field metadata. `React-metaform` comes with 2 `ComponentFactories`:

####ComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/ComponentFactory.js))####

This a *clean* factory. In order to use it, `import` it, register all your components and then pass it to the `componentFactory`
prop of the `MetaForm`.

    import ComponentFactory from 'react-metaform/lib/ComponentFactory';
    
####DefaultComponentFactory ([source](https://github.com/gearz-lab/react-metaform/blob/master/src/DefaultComponentFactory.js))####

This is a pre-populated factory, the same used in the [demo](http://gearz-lab.github.io/react-metaform/demo.html).
In order to use it, `import` it and just pass it to the `componentFactory` prop of the `MetaForm`.

    import DefaultComponentFactory from 'react-metaform/lib/DefaultComponentFactory';
    
Alternatively:

    import rmf from 'react-metaform';
    // now these are available:
    //  rmf.MetaForm
    //  rmf.ComponentFactory
    //  rmf.DefaultComponentFactory
    
Building and running the demo locally
---

This should work in every environment, except that environment variables are being set in the `npm` scripts which 
make them not platform-independent. [This should be fixed for the 1.0.0 release](https://github.com/gearz-lab/react-metaform/issues/5).
If you're on Linux or OSX, please remove the environment `SETs` from the package.json scripts before you proceed.

    git clone https://github.com/gearz-lab/react-metaform.git
    cd react-metaform
    npm install
    
In order to run the demo, while [this issue](https://github.com/gearz-lab/react-metaform/issues/6) is not fixed, you need to run 2 npm commands:

    npm run wpds
    npm run start-demo-dev
    
Now the demo should be available here: [http://localhost:4000/react-metaform/demo.html](http://localhost:4000/react-metaform/demo.html).
    
In order to run the `karma` tests:

    npm run test
    // OR, to run in Chrome instead of PhantomJS
    npm run test-chrome
     
   
Contributing
---

**Pull-requests are really really welcome**. If you don't know what to contribute with, please check the [1.0.0 issues](https://github.com/gearz-lab/react-metaform/milestones/1.0.0).
 
I'll be more than glad to invite frequent contributors to join the organization.
If you need help understanding the project, please post an issue and I'll do my best to reply and make sure you understand everything
you need.


License
---
`React-metaform` is [MIT](https://github.com/gearz-lab/react-metaform/blob/master/LICENSE) licensed.

