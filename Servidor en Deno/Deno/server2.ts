import React, { useState } from 'https://dev.jspm.io/react/index.js';
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server.js';
import { createApp } from 'https://deno.land/x/servest@v1.3.1/mod.ts';

const app = createApp();
const validColors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];
let colors: string[] = [];

app.handle('/', async (req) => {
  if (req.method === 'POST') {
    const params = await req.formData();
    const color = params.get('color') || '';
    if (validColors.includes(color)) {
      colors.push(color);
    }
  }

  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servest con React</title>
        </head>
        <body>
          <form method="POST" action="/">
            <label htmlFor="color">Ingrese un color:</label>
            <input type="text" id="color" name="color" />
            <button type="submit">Agregar</button>
          </form>
          {colors.length > 0 && (
            <ul>
              {colors.map((color, index) => (
                <li key={index} style={{ color: color }}>
                  {color}
                </li>
              ))}
            </ul>
          )}
        </body>
      </html>
    ),
  });
});

app.listen({ port: 8080 });
