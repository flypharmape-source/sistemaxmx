# Sistema XMX — protótipo (Fase 1)

Protótipo navegável (Dashboard + Colaboradores). É só front-end: os dados voltam ao estado inicial ao recarregar. Serve pra validar as telas. O login e o banco entram na versão real (ver `guia-railway.md`).

## Testar no seu computador

Precisa do Node.js instalado.

```bash
npm install
npm run dev        # abre em http://localhost:5173
```

Pra gerar a versão publicável:

```bash
npm run build      # cria a pasta dist/
```

## Publicar no Railway

O protótipo **não usa banco** — pode ir num projeto novo, separado dos seus apps (FlyPharma / hawks-box).

1. Suba esta pasta para um repositório no **GitHub**.
2. No Railway: **New → Deploy from GitHub repo** e escolha esse repositório (pode criar um projeto novo pra não misturar com os existentes).
3. O Railway detecta o Vite e roda o build sozinho. O start já está configurado (`serve -s dist`), que serve os arquivos na porta que o Railway define.
4. No serviço → **Settings → Networking → Generate Domain**. Pronto, você tem a URL.

> Se por acaso a página não abrir (porta não detectada), vá em **Settings → Deploy → Custom Start Command** e coloque:
> `serve -s dist -l tcp://0.0.0.0:$PORT`

## Publicar sem Railway (alternativa mais rápida, grátis)

Rode `npm run build` e arraste a pasta `dist/` em **app.netlify.com/drop**. Dá uma URL na hora, sem conta. Bom pra mandar pro pessoal validar sem gastar créditos do Railway.

## Estrutura

```
index.html
vite.config.js
package.json
src/
  main.jsx      → ponto de entrada
  App.jsx       → o sistema (Dashboard + Colaboradores)
  index.css     → reset mínimo
```
