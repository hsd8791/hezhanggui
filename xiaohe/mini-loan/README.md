develop remind

src/js/public.js export publicFun for some common function

!! always use `bus.$emit('account_change',account,uniqueId)` for account change 
	not `bus.account=phone; bus.uniqueId=res.body.uniqueId`

publicFun.checkSession(this) //检查是否登录，未登录则跳转至登录

# mini-loan-manage

> 禾掌柜

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
