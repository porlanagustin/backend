import { serve } from 'https://deno.land/std/http/mod.ts';
import { readFileStr } from 'https://deno.land/std/fs/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import { parseForm } from 'https://deno.land/x/parsec/mod.ts';
import { Application, Router } from 'https://deno.land/x/servest/mod.ts';

const app = new Application();
const router = new Router();

let colors: string[] = [];

router.post('/', async (req) => {
  const body = await parseForm(req);
  const color = body.value('color');
  if (color) {
    colors.push(color);
  }
  req.redirect('/');
});

router.get('/', async (req) => {
  const html = await getHTML();
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html',
    }),
    body: html,
  });
});

app.use(router);

async function getHTML() {
  const indexFile = await readFileStr(join(Deno.cwd(), 'index.html'));
  const colorsList = colors.map((color) => {
    return `<li style="color: ${color}">${color}</li>`;
  }).join('');
  const html = indexFile.replace('<!-- COLORS_LIST -->', colorsList);
  return html;
}

await app.listen({ port: 8000 });

