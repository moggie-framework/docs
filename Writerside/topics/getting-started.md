# Getting Started

<link-summary>
Welcome to Moggie; An opinionated but modular web framework
</link-summary>

Moggie is an opinionated server framework for building web apps and APIs with Node.js. It provides a batteries included
experience, while allowing you to swap in your own batteries with minimal hassle.

<warning>
    These docs are under heavy construction, and aren't yet in a usable state. Feel free to browse, but expect little.
</warning>

### Situations where Moggie works well

- You are working on a greenfield project that needs a number of external services - databases, caches, mail, etc.

### Situations where you shouldn't use Moggie

- You are deploying your project to a FaaS environment such as Lambda or Cloud Run
  - Moggie works most effectively in environments with a persistent server instance, though you could structure your application around the request lifecycle rather than the server lifecycle
- You are creating a BFF for an existing API - this is the domain of projects like Next.js, Remix, Sveltekit, etc. 
- You are producing a primarily content-based site that makes heavy use of pre-rendering and CDNs
  - You could use Moggie for this sort of site, but should first evaluate purpose-built alternatives

## Quickstart

Run the Moggie wizard to create a new moggie project with the default folder structure

<code-block lang="shell" prompt="$">
npm init @moggie
</code-block>

## Manual Setup

If you want to integrate moggie into an existing project, or if you need to use a radically different directory structure,
there are only a few steps required to set up a new Moggie app

### Install dependencies

<code-block lang="shell" prompt="$">
npm install --save @moggie/core @moggie/helpers @moggie/runtime
</code-block>

### Set Commands

Get improved stack traces and enable the correct stage-3 proposals by importing the runtime and enabling inline source
map recombination

<code-block lang="json" validate="true">
{
    "scripts": {
        "start": "node --enable-source-maps --import @moggie/runtime index.js",
        "test": "node --test --enable-source-maps --import @moggie/runtime"
    }
}
</code-block>

Moggie Runtime - Required
: Core framework classes require the `--import @moggie/runtime` flag to enable certain tc39 stage-3 proposals. This causes
a once-per-import cost when importing modules, though it is unlikely to cause any noticeable impact on your application

Source Maps - Optional
: The Moggie runtime will also add inline source maps to imported files. While not a hard requirement, enabling Node.js'
source map feature will greatly enhance the utility of any error stack traces by pointing to the correct source line