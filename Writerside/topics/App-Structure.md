# App Structure

When creating a Moggie application, we require several components; an Application, a Kernel, and zero or more Plugins. 
Each one handles either part of your app's core functionality or extensibility.

>
> On this page, we will create a functional application by progressively expanding our example after introducing 
> each new topic 
> { style = 'note' }

## Application

The `Application` type acts as storage for all of our application's resources and data, as well as handling its lifecycle.
You will create a single base application and then call a variety of methods to configure it. The application does not
interact with any external resources and will mostly act as a black box that you wrap around your own code.

We require a Kernel and Plugins to do anything interesting with our app.

```javascript
import { Application } from '@moggie/core/framework'

const app = new Application(/* [[[some kernel|#kernel]]] */)

/* Register your [[[app plugins|#plugins]]] */

app.launch()
```

## Kernel

Each application is generic over a `Kernel`. The Kernel is responsible for managing some connection to the world outside
 your Moggie application. The combination of the Application resources and the Kernel connection is what makes up a
full Moggie app.

The application scaffold imports the `ServerKernel` as standard, but you may want to wrap your application building logic
in a factory function that accepts a Kernel parameter to avoid duplicating this logic if you're running the same app in
multiple forms (e.g. a web server and queue worker nodes)

```javascript
import { Application } from '@moggie/core/framework'
import { ServerKernel } from '@moggie/core/http' // NEW

const app = new Application(ServerKernel) // CHANGED

/* Register your app plugins */

app.launch()
```

## Plugins

An application and kernel combo is all you need to get a working application, but all the functionality that will
do anything noteworthy comes from one or more `Plugin` instances.

// TODO: Detailed information about application plugins

```javascript
import { Application } from '@moggie/core/framework'
import { ServerKernel, HttpPlugin, RoutePlugin } from '@moggie/core/http' // CHANGED

const app = new Application(ServerKernel)
app.register(HttpPlugin, RoutePlugin) // NEW

app.launch()
```


## Minimum Useful Prototype

We can combine the previous concepts to create our first application that can perform some basic tasks. We won't be
performing any operations like parsing request bodies or deserialising query strings, so instead we'll put together a
key-value store API, where we use headers to specify the keys and values that we're operating over.

<warning>
 This example intentionally uses as few concepts from the framework as possible to show how you might use applications, 
 kernels, and plugins. While it is fully functional, you will likely want to use ideas from 
 the <a href="Routing.md">Dependency Injection</a> section.
</warning>

<code-block lang="javascript" src="structure-mup/index.js" collapsible="true" collapsed-title="index.js" />
<code-block lang="json" src="structure-mup/package.json" collapsible="true" collapsed-title="package.json" />

### A Generic Kernel

Very little of your application code should concern itself with the Kernel loaded into your application. A console kernel
might still need to access mounted routes to show route metadata, or you might need to DRY out your services by sharing
business logic between different app types.

A simple way to achieve this is to construct your application in an exported builder function, and then create multiple
entry points for different application types, which simply pass a different Kernel into that builder. This is how we
could rewrite the M.U.P to function this way:

<compare type="left-right">
<code-block lang="javascript">
async function main() {
    const app = new Application(ServerKernel, config)
    app.register(HttpPlugin, Router)
    await app.launch()
}
</code-block>
<code-block lang="javascript">
function buildApplication(kernelType) {
    const app = new Application(kernelType, config)
    app.register(HttpPlugin, Router)
    return app
}
async function runServer() {
    await buildApplication(ServerKernel).launch()
}
async function runCli() {
    await buildApplication(TerminalKernel).launch()
}
</code-block>
</compare>