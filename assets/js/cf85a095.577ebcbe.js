"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1752],{19646:(o,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var r=t(85893),n=t(11151);const s={title:"How to Get Error Logs",slug:"/troubleshooting/how-to-get-error-logs",description:"How to get error logs.",keywords:["Jan AI","Jan","ChatGPT alternative","local AI","private AI","conversational AI","no-subscription fee","large language model","troubleshooting","error logs","app logs","server logs"]},i=void 0,a={id:"guides/troubleshooting/how-to-get-error-logs",title:"How to Get Error Logs",description:"How to get error logs.",source:"@site/docs/guides/08-troubleshooting/04-how-to-get-error-logs.mdx",sourceDirName:"guides/08-troubleshooting",slug:"/troubleshooting/how-to-get-error-logs",permalink:"/troubleshooting/how-to-get-error-logs",draft:!1,unlisted:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/guides/08-troubleshooting/04-how-to-get-error-logs.mdx",tags:[],version:"current",lastUpdatedBy:"Hieu",lastUpdatedAt:1705303261,formattedLastUpdatedAt:"Jan 15, 2024",sidebarPosition:4,frontMatter:{title:"How to Get Error Logs",slug:"/troubleshooting/how-to-get-error-logs",description:"How to get error logs.",keywords:["Jan AI","Jan","ChatGPT alternative","local AI","private AI","conversational AI","no-subscription fee","large language model","troubleshooting","error logs","app logs","server logs"]},sidebar:"guidesSidebar",previous:{title:"Jan is Not Using GPU",permalink:"/troubleshooting/gpu-not-used"}},l={},c=[];function g(o){const e={a:"a",admonition:"admonition",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...o.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.p,{children:["To get the error logs of Jan, you can navigate to the ",(0,r.jsx)(e.code,{children:"~/jan/logs"})," directory through ",(0,r.jsx)(e.code,{children:"Settings"})," > ",(0,r.jsx)(e.code,{children:"Advanced"})," > ",(0,r.jsx)(e.code,{children:"Open App Directory"}),"."]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Open the ",(0,r.jsx)(e.code,{children:"app.log"})," file if you are using UI."]}),"\n",(0,r.jsxs)(e.li,{children:["Open the ",(0,r.jsx)(e.code,{children:"error.log"})," file for error logs if you are using the local API server."]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# Using UI\ntail -n 50 ~/jan/logs/app.log\n\n# Using local api server\ntail -n 50 ~/jan/logs/server.log\n"})}),"\n",(0,r.jsx)(e.admonition,{type:"note",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"When sharing logs or error information, make sure to redact any private or sensitive information."}),"\n"]})}),"\n",(0,r.jsxs)(e.p,{children:["If you have any questions or are looking for support, please don't hesitate to contact us via our ",(0,r.jsx)(e.a,{href:"https://discord.gg/Dt7MxDyNNZ",children:"Discord community"})," or create a ",(0,r.jsx)(e.a,{href:"https://github.com/janhq/jan/issues/new/choose",children:"new issue in our GitHub repository"}),"."]})]})}function d(o={}){const{wrapper:e}={...(0,n.a)(),...o.components};return e?(0,r.jsx)(e,{...o,children:(0,r.jsx)(g,{...o})}):g(o)}},11151:(o,e,t)=>{t.d(e,{Z:()=>a,a:()=>i});var r=t(67294);const n={},s=r.createContext(n);function i(o){const e=r.useContext(s);return r.useMemo((function(){return"function"==typeof o?o(e):{...e,...o}}),[e,o])}function a(o){let e;return e=o.disableParentContext?"function"==typeof o.components?o.components(n):o.components||n:i(o.components),r.createElement(s.Provider,{value:e},o.children)}}}]);