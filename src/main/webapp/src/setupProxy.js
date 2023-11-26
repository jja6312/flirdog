const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (App) => {
    App.use(
        "/ws",
        createProxyMiddleware({ target: "http://localhost:8080", ws: true })
    );
};
