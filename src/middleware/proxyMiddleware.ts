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

const billApiProxy = createProxyMiddleware({
  target: process.env.BILL_API_URL,
  changeOrigin: true,
});

const subscriptionApiProxy = createProxyMiddleware({
  target: process.env.SUBSCRIPTION_API_URL,
  changeOrigin: true,
});

const commentApiProxy = createProxyMiddleware({
  target: process.env.COMMENT_API_URL,
  changeOrigin: true,
});

export { userApiProxy, groupApiProxy, billApiProxy, subscriptionApiProxy, commentApiProxy };
