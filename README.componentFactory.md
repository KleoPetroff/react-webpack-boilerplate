# componentFactory: declaring React components more like Vue

React components are built in a very loosely structured way. Vue components
are declared using a spec with discrete sections that make it clear what is
playing what role.

I've created a structure to declare reactive state (implemented with Mobx)
and have it reliably bound to the render function.

## Spec sections

### `state(initialProps)`

Like the `data` section of a Vue spec, the `state` section declares and
initializes the variables that are owned by the component. Because `props`
are managed by React outside the control of the component, they are given
as a parameter to state to allow initialization from them if needed.

Ordinary variable naming conventions apply. Names beginning with `$` should
be considered reserved and not part of reactive state.

### `actions`

Like Vue's `methods`, actions are functions that are bound to the component
context. They should be declared with functional notation, *not* as arrow
functions. Any variable, action, or computed declared in `state` can be referred
to using `this.`*name*.

Props are available as `this.$props.`*propname*.

### `computed`

As in Vue, computed getters can be declared with a plain function (*not* an
arrow function). Settable computeds are declared as an object with `get` and
`set` function (again, *not* arrow functions) members. Any variable, action, or
computed declared in `state` can be referred to using `this.`*name*, and props
are available as `this.$props.`*propname*.

Props are not managed by Mobx, so you might expect that computeds based on props
would not update properly, but in practice, they do. However, a `watch` on a
prop based computed will not fire when props update. You will need to use a
lifecycle hook to detect prop changes.

### `watch`

`watch` is a section of functions with the names of reactive state items
(variables or computeds). When a state item changes, the watch function of the
same name will fire, receiving the new value as an argument. Any variable,
action, or computed declared in `state` can be referred to using `this.`*name*,
and props are available as `this.$props.`*propname*.

In Vue, you can name the `watch` function for any expression; here, you must use
a state item name. The way to watch an expression is to create an computed for
the expression and watch the computed.

**`watch` will not fire on prop-based computeds.**

### Lifecycle hooks

The React lifecycle hooks are declared as plain functions (*not* arrow
functions) with the React names minus the word "component":
```
willMount
willReceiveProps
willUpdate
didUpdate
didCatch
didMount
willUnmount
shouldUpdate
```

They are declared at the top level, not inside `actions`, but are otherwise like
actions in terms of being bound to state and accessing state members and props.

Note: if lifecycle hooks are not used, the factory will make a functional
component, which is somewhat lighter weight than a class-based component. It's
not stateless, as functional components are, because its state is handled
separately.

### `render`

This is the familiar `render` function. It receives `props` as its argument,
like a function-based component, even if it is implemented with a class, so you
can rely on that behavior without worrying about the implementation. You can
also use `this.$props.`*propname* just like any other of the function types in
the spec.

## Refs and `$el`

Refs are not currently supported. Since all actions, etc. are bound to the
state object, and not to the React class (if any) implementing the view, even if
you include a `ref` in your `render` function, you would have no access to it
from the programming side.

For access to the associated DOM element, you can use `this.$el` *if* you have
attached `data-el-id={this.$elId}` to the root node of your component. You can
put it on any node of your component you want to be `this.$el`, but convention
suggests you put it on the root node.

Use `this.$el.querySelector` to pick nodes of interest within your component as
you need them.

## License

componentFactory is available under MIT.
