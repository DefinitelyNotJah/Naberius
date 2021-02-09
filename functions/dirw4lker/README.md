#### [!] Legal disclaimer: Usage of this tool for scanning targets without prior mutual consent is illegal.

# dirW4lker.js

**dirw4lker** is an asynchronous directories/files web-sites scanner. 


Implemented directly on top of TCP, improving performance avoiding headers-stripping and getting a lot of chunks from websites containing a lot of content. 

It works with HTTP and HTTPS protocols and it allows to find hidden files hosted on target url using a dictionary-list.

You can use this for CTFs or to test your web applications or to automate your own multiple hosts monitoring. 

Pure written in NodeJs and **without** dependencies.

## Install with npm

```bash
npm install -g dirw4lker
```
or 

```bash
npm i dirw4lker
```

## HowTo

dirW4lker can used as Command Line Tool and is really simple to use.

```bash
dirw4lker --host=<TARGET_URL> --listDir=<PATH_TO_DICTIONARY_LIST>
```

You can omit the `--listDir` option to use the default list includes in this module.

*The default list is not really effective, but will cover common used page names*


# Js API

```javascript
const dirWalker = require('dirw4lker');

(async function scan() {
    const config = {
        host: 'http://testphp.vulnweb.com/',
        ext: 'php,txt,xml',
        asyncRequests: true
    };

    const result = await dirWalker.launch(config);
    console.log('\nFOUNDS:', result.founds.length, '/', result.sent);
    if (result.founds.length) {
        console.log('=>', result.founds.map((r) => (r.target)));
    }
})();
```

More examples in [examples folder](https://github.com/gr3p1p3/dirw4lker/tree/master/examples). 

### Config Object

The method launch need a configuration object with the follow parameters:

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
|host | <code>String</code> |  The receiver hostname. |
|[listDir]| <code>String</code> | Path to the dictionary-file to use. |
|[list]| <code>Array</code> | Array of strings to use instead opening local file. |
|[appendSlashAfter]| <code>Boolean</code> | Append `/` character on first loop. Default as true. |
|[ext]| <code>String/Array</code> | The extra extensions name to combine with the hostname. ex: 'php,txt' or '.php,.txt' |
|[dns]| <code>String</code> | Used dns to resolve hostname. You can use multiple dns splitting with `,`. (Ex: '8.8.8.8,8.8.4.4') *THIS OPTION WILL BE IGNORED IF PROXY IS USED*  |
|[proxy]| <code>String</code> | The used proxy. The form must be the follow (Ex: http://proxyIp:proxyPort).   |
|[ignoreResponseWith]| <code>String</code> | The string to ignore on response received. If response contains given parameter, then will be ignored.|
|[asyncRequests]| <code>Boolean</code> | Starting attack in async way. As Default false.|
|[maxConcurrency]| <code>Number</code> | The maximal number of sent parallel asynchronous requests (only if asyncRequests is true). As default 100.|
|[verbose]| <code>Boolean</code> | Activate verbose. As default false. **THIS OPTION WILL BE IGNORED ON CLI**  |

@returns

| Type                | Description  |
| ------------------- | ------------ |
| <code>Promise<Array<Object>></code> |  The found results. {sent:Number, founds:[{target:<host:port/foundPage>, response:String, ms:Number}, ...]} |

# CLI: Quickstart

```bash
npm install -g dirw4lker
dirw4lker --host=http://testphp.vulnweb.com --asyncRequests
```
Output:
```bash
    .___.__        __      __  _____ .__   __                         __        
  __| _/|__|______/  \    /  \/  |  ||  | |  | __ ___________        |__| ______
 / __ | |  \_  __ \   \/\/   /   |  ||  | |  |/ // __ \_  __ \       |  |/  ___/
/ /_/ | |  ||  | \/\        /    ^   /  |_|    <\  ___/|  | \/       |  |\___ \ 
\____ | |__||__|    \__/\  /\____   ||____/__|_ \\___  >__|    /\/\__|  /____  >
     \/                  \/      |__|          \/    \/        \/\______|    \/ 

                                                                        by Gr3p


[!] Legal disclaimer: Usage of this tool for scanning targets without prior mutual consent is illegal.


┌───────────────┬──────────────────────────────┐
│    (index)    │            Values            │
├───────────────┼──────────────────────────────┤
│     host      │ 'http://testphp.vulnweb.com' │
│ asyncRequests │             true             │
└───────────────┴──────────────────────────────┘

--listDir parameter is not used or empty. Using default list will not be really effective!


(1) [ 2020-03-27T20:22:13.098Z ] http://testphp.vulnweb.com/images/ => HTTP/1.1 200 OK
(2) [ 2020-03-27T20:22:13.115Z ] http://testphp.vulnweb.com/cgi-bin/ => HTTP/1.1 403 Forbidden
(3) [ 2020-03-27T20:22:13.156Z ] http://testphp.vulnweb.com/Templates/ => HTTP/1.1 200 OK
(4) [ 2020-03-27T20:22:13.234Z ] http://testphp.vulnweb.com/admin/ => HTTP/1.1 200 OK
(5) [ 2020-03-27T20:22:13.258Z ] http://testphp.vulnweb.com/Flash/ => HTTP/1.1 200 OK
(6) [ 2020-03-27T20:22:13.270Z ] http://testphp.vulnweb.com/AJAX/ => HTTP/1.1 200 OK
(7) [ 2020-03-27T20:22:13.288Z ] http://testphp.vulnweb.com/hpp/ => HTTP/1.1 200 OK
(8) [ 2020-03-27T20:22:13.294Z ] http://testphp.vulnweb.com/CVS/ => HTTP/1.1 200 OK
(9) [ 2020-03-27T20:22:13.347Z ] http://testphp.vulnweb.com/secured/ => HTTP/1.1 200 OK

FOUNDS: 9 / 184
Time: 458.629ms
```

*Compared to sync way => `Time: 13308.580ms`*

The CLI accept same parameters as API-Module.

# Using proxy

It may happen to test a web application with the need to use a proxy to access it.
For this reason, the ability to encapsulate requests behind a *proxy* has been implemented. It works with HTTP & HTTPS targets as well.

This mode can be used with proxies working with [HTTP Tunnel](https://en.wikipedia.org/wiki/HTTP_tunnel) mechanism.
    
- Example: [using TOR as HTTP-Proxy](https://tor.stackexchange.com/questions/16554/this-is-a-socks-proxy-not-an-http-proxy)


```bash
dirw4lker --host=http://example.com --proxy=http://127.0.0.1:9080
```

*[!] Proxy must be written like url.*

# Examples

You can use your own list with the option `--listDir`

```bash
dirw4lker --host=http://example.com --listDir=/tmp/directory.txt
```

The option `--ext` can used to combine the string on list with file-extensions. Use `,` for multiple extensions.

```bash
dirw4lker --host=http://example.com --ext=php,txt,html
```

dirW4lker will use your local-dns to resolve hostname as default. But you can change this with the option `--dns`.
Use `,` for multiple dns servers.

```bash
dirw4lker --host=http://example.com --listDir=/tmp/directory.txt --dns=8.8.8.8
```

To ignore response with custom string, use the option ```--ignoreResponseWith=<stringToIgnore>```
For example, ignoring all responses containing code 301.

```bash
dirw4lker --host=http://example.com --listDir=/tmp/directory.txt --ignoreResponseWith=301
```

## Special Thanks

Inspired by [dirBuster](https://tools.kali.org/web-applications/dirbuster).


## Updates

#### Issues & Bug-Reports are welcome

- [2020.04] @1.8.x Add maxConcurrency to avoid problem on other platforms (ex: win10).
- [2020.03] @1.7.x Bug Fixing & Code Refactor.
- [2020.03] @1.7.x implemented `list` option to use custom array.
- [2020.03] @1.6.4 Fixed problem using proxy to http-targets
- [2020.03] Moved repository to [https://github.com/gr3p1p3/dirw4lker](https://github.com/gr3p1p3/dirw4lker)
- [2020.03] @1.6.x `--proxy` option works on **https**-Targets too.
- [2020.03] @1.5.x `--proxy` option is now implemented. It will only work on **http**-Targets.
- [2020.03] Improved a lot of performance.
- [2020.03] @1.4.4 `--asyncRequests` option is now stable.
- [2020.03] @1.4.x Implemented `--asyncRequests`: possibility to start a scan in an async way.
- [2020.03] @1.3.x Implemented new option `--ignoreResponseWith`.
- [2020.02] @1.2.x Removed option `--limit`. This will be ignored.