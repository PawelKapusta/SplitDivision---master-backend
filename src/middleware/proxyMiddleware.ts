import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";

dotenv.config();

const userApiProxy = createProxyMiddleware({
  target: process.env.USER_API_URL,
  changeOrigin: true,
});

const groupApiProxy = createProxyMiddleware({
  target: process.env.GROUP_API_URL,
  changeOrigin: true,
});

export { userApiProxy, groupApiProxy };
