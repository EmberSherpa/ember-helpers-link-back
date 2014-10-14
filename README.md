# ember-helpers-link-back

**link-back** helper is similar to {{link-to}} except it takes **back=** argument that the link will link back to when on original path.

## Example

```handlebars
{{#link-to 'destination' back='path.to.link.back.to'}}Go to destination{{/link-to}}
```

## Caveats

* Doesn't accept query params for back parameters

## Installation

* `npm install --save ember-helpers-link-back`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `git clone git@github.com:embersherpa/ember-helpers-link-back.git`
* `npm install`
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
