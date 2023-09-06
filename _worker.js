const TELEGRAPH_URL = 'https://huggingface.co/spaces/qinglin96/chatgpt-academic-freeai';

export default {
  async fetch(request, env) {
    const NewResponse = await handleRequest(request);
    return NewResponse;
  },
};

async function handleRequest(request) {
  const url = new URL(request.url);
  const headers_Origin =
    request.headers.get('Access-Control-Allow-Origin') || '*';

  // 将整个 TELEGRAPH_URL 替换掉传入请求的 URL
  url.href = TELEGRAPH_URL;

  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow',
  });

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);

  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);

  return modifiedResponse;
}
