
# View

  Higher level views built on [reactive](https://github.com/component/reactive).

## Installation

    $ component install component/view

## Demo Example

    $ component build
    $ open examples/todo.html

## API

### View()

  Initialize a view with the given `obj` / `el`.
  
     function ItemView(item) {
       View.call(this, item, tmpl.cloneNode(true));
     }

### View#bind(str:String, method:String)

  Bind to an event with the given `str`, and invoke `method`:
  
     this.bind('click .remove', 'remove')
     this.bind('click .complete', 'complete')
     this.bind('dblclick .info a', 'showDetails')

### View#unbind([str]:String)

  Unbind all listeners, all for a specific event, or 
  a specific combination of event / selector.
  
     view.unbind()
     view.unbind('click')
     view.unbind('click .remove')
     view.unbind('click .details')

## License

  MIT
