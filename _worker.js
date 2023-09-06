export default {
  async fetch(request, env) {
    // 调用 handleRequest 函数
    const newResponse = await handleRequest(request);
    return newResponse;
  }
};

async function handleRequest(request) {
  // 定义目标URL
  const targetUrl = 'https://huggingface.co/spaces/qinglin96/chatgpt-academic-freeai';

  // 创建一个新的URL对象，使用目标URL
  const newUrl = new URL(targetUrl);

  // 创建一个新的请求对象，使用新的URL和原始请求的属性
  const modifiedRequest = new Request(newUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });

  // 发送修改后的请求到目标URL
  const response = await fetch(modifiedRequest);

  // 创建新的响应对象，将目标URL的响应内容和原始响应的一些属性复制到新响应中
  const modifiedResponse = new Response(response.body, response);

  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
