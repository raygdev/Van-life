# Running the server

Start by opening a terminal and navigating to the
server folder.
`cd server`

## Install dependencies
`npm install`

## To run the server
`npm start`

The request is proxied from the *vite.config.js*

## The code that configures proxy in *vite.config.js*
```javascript
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:8080",
        cors: true,
        changeOrigin: true,
        secure: false,
        ws:true,
      },
    }
  }
})
```

Once the server is up and running, open another
terminal and run `npm run dev` in the root directory

**I work in node v14x(LTS)** so the config may be different for 
newer versions of node.


