# Routing

<link-summary>
    One of the basic features of a Moggie application, HTTP routing allows you to respond to web requests.
</link-summary>
<card-summary>
    One of the basic features of a Moggie application, HTTP routing allows you to respond to web requests. Learn about
    static and dynamic paths, routers, groups, and middleware.
</card-summary>
<web-summary>
    One of the basic features of a Moggie application, HTTP routing allows you to respond to web requests. Learn about
    static and dynamic paths, routers, groups, and middleware.
</web-summary>

>
> Like most parts of Moggie, you can easily switch out the Router with a different implementation. Replacing the router
> requires more steps than some other Moggie services; refer to the ["Bring your own"](#bring-your-own-router) section
> for detailed notes
>
{style="tip"}

Almost all Moggie based applications aim to accept and process HTTP requests. 
Routing is a fundamental aspect of any web framework, as it determines how incoming requests are handled and directed to 
the appropriate handlers or controllers. Our framework offers a straightforward and minimalistic approach to routing, 
focusing on simplicity and ease of use. It supports static paths and matching segments of a URL, making it easy to define 
routes for your application.

## Creating a router

```javascript
app.register(class extends RoutePlugin {
    routes(router) {
        router.get("/hello", () => console.log("Handling route!"))
    }
})
```

## Path Handling

### Static Paths

```javascript
router.get("/hello", /* handler */)
```

### Dynamic Paths

Specify dynamic path segments by prefixing them with a colon `:`

```javascript
router.get("/hello/:name", /* handler */)
```


### Path Specificity

Static paths are the simplest form of routing, where a specific URL path is mapped directly to a handler. This is useful 
for defining routes that don’t change, such as the homepage or about page. For example, a static path might look like 
`/home` or `/about`, and these paths will be directly routed to their respective handlers.

### Matching URL Segments

In addition to static paths, our framework allows for matching segments of a URL. This feature enables you to define 
dynamic routes that can capture specific parts of the URL as parameters. For instance, a route defined as `/user/:id` 
would match any URL that follows the pattern `/user/123`, capturing `123` as a parameter that can be used within the 
handler.

### Simplicity and Limitations

While our framework provides these essential routing features, it intentionally avoids more complex routing mechanisms 
such as arbitrary captures using regular expressions. This design choice keeps the routing system simple and easy to 
understand, ensuring that developers can quickly define and manage routes without dealing with the intricacies of 
regular expressions.

By focusing on these core routing capabilities, our framework aims to provide a balance between functionality and 
simplicity, making it an ideal choice for developers who need a straightforward routing solution for their web 
applications.

## Example

To demonstrate the basic usage of our routing system, let's create a simple route that handles a GET request to `/hello`.

A minimal server application with routing requires two plugins; the `HttpPlugin`, and our own class that extends `RoutePlugin`.
We also need to boot the application with the `ServerKernel` to accept web requests.

<code-block lang="javascript" src="basic-router.js" collapsible="true" collapsed-title="Class Based Router" />
<code-block lang="javascript" src="basic-functional-router.js" collapsible="true" collapsed-title="Functional Router" />

For this example, we may want to customise the port that we're listening to - include this [basic configuration]() to us a 
non-default port:

```json
{
  "http": {
    "server": {
      "port": 8000
    }
  }
}
```

## Bring your own Router