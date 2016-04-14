// import ReactTestUtils from 'react/lib/ReactTestUtils';
// import ComponentFactory from '../src/DefaultComponentFactory.js';
// import chai from 'chai';
// const assert = chai.assert;
//
// describe('ComponentFactory', function () {
//
//
//     describe('getFieldComponents', function() {
//         it('Should return all definitions', function () {
//             const definitions = ComponentFactory.getFieldComponents();
//             assert.isObject(definitions);
//         });
//         it('Should return definitions for the string type', function () {
//             const definitions = ComponentFactory.getFieldComponents('string');
//             assert.isArray(definitions);
//             assert.isAbove(definitions.length, 0);
//         });
//         it('Should return definitions for the int type', function () {
//             const definitions = ComponentFactory.getFieldComponents('int');
//             assert.isArray(definitions);
//             assert.isAbove(definitions.length, 0);
//         });
//         it('Should return definitions for the float type', function () {
//             const definitions = ComponentFactory.getFieldComponents('int');
//             assert.isArray(definitions);
//             assert.isAbove(definitions.length, 0);
//         });
//     });
//
//     describe('_validateMetadata', function() {
//         it('Should throw an exception when the given metadata is null or undefined', function() {
//             assert.throws(() => ComponentFactory._validateMetadata(null), /Metadata should not be null or undefined/);
//         });
//         it('Should throw an exception when the the type property of the metadata is null or undefined', function() {
//             assert.throws(() => ComponentFactory._validateMetadata({type: null}), /Metadata should have a type/);
//         });
//     });
//
//     describe('getDefaultFieldComponent', function() {
//         describe('Should get default component for primitive types', function() {
//
//             it('string', function() {
//                     let defaultComponent = ComponentFactory.getDefaultFieldComponent('string');
//                     ReactTestUtils.isElement(defaultComponent);
//                 });
//
//             it('float', function() {
//                     let defaultComponent = ComponentFactory.getDefaultFieldComponent('float');
//                     ReactTestUtils.isElement(defaultComponent);
//                 });
//
//             it('int', function() {
//                     let defaultComponent = ComponentFactory.getDefaultFieldComponent('int');
//                     ReactTestUtils.isElement(defaultComponent);
//             });
//         });
//     });
//
//     describe('buildFieldComponent', function() {
//         it('Should throw exception when getting a component definition specifying an unknown component', function () {
//             const metadata = {
//                 name: 'name',
//                 type: 'string',
//                 component: 'foo',
//                 onChange: e => {}
//             };
//             assert.throws(() => ComponentFactory.buildFieldComponent(metadata), /Could not find the given component/);
//         });
//
//         it('Should return the component when specifying the component explicitly', function() {
//             const metadata = {
//                 name: 'name',
//                 type: 'string',
//                 component: 'TextBox',
//                 onChange: e => {}
//             };
//             const component = ComponentFactory.buildFieldComponent(metadata);
//             assert.isTrue(ReactTestUtils.isElement(component));
//         });
//
//         it('Should return the component when specifying the type only', function() {
//             const metadata = {
//                 name: 'name',
//                 type: 'string',
//                 onChange: e => {}
//             };
//             const component = ComponentFactory.buildFieldComponent(metadata);
//             assert.isTrue(ReactTestUtils.isElement(component));
//         });
//
//         it('Should throw an exception when the type doesn\'t exist', function() {
//             const metadata = {
//                 name: 'name',
//                 type: 'foo',
//                 onChange: e => {}
//             };
//             assert.throws(() => ComponentFactory.buildFieldComponent(metadata), /Couldn't find any component for the given type/);
//         });
//
//         it('Should work with integers', function() {
//             const metadata = {
//                 name: 'number',
//                 type: 'int',
//                 onChange: e => {}
//             };
//             const component = ComponentFactory.buildFieldComponent(metadata);
//             assert.isTrue(ReactTestUtils.isElement(component));
//         });
//     });
// });
