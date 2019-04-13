import request from './request'
// export default request(ddd);

const instance = request;

instance.interceptors.response.use(
  response => response.data,
)

const instance = request.extend({
  baseURL: '/file',
  responseType: 'arraybuffer',
  headers: {
    Accept: 'application/pdf',
  },
});

export default function (para) {
    instance({
      url: '/article/list'
    }).then((res) => {
      console.log(res);

    });

    console.log(instance(para), '========');
    return instance(para);
};


