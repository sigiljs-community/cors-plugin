# Sigil CORS Plugin

Simple SigilJS plugin that provides middleware 
that intercepts any OPTIONS requests and respond 
on them with configurable CORS headers

## Installation

```bash
npm install @sigiljs-community/cors-plugin
# or
yarn add @sigiljs-community/cors-plugin
```


## Usage

**Import and register the plugin**

```typescript
import { Sigil } from "@sigiljs/sigil"
import { CorsPlugin } from "@sigiljs-community/openapi-plugin"

const app = new Sigil()

// Register the OpenAPI plugin with optional settings
app.addPlugin(CorsPlugin, {
  // Optional plugin configuration, by default
  // any request is allowed
})
```

## License

You can copy and paste the MIT license summary from below.

```text
MIT License

Copyright (c) 2022 Kurai Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

