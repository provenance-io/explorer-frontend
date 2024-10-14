const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Cdw1Pm6b.js","./index-DY4jrsxT.js","./index-DUBt2OAj.css"])))=>i.map(i=>d[i]);
import{i as C,h as k,M as n,C as h,O as v,aN as S,A as p,E,k as A,R as c,aO as f,U as x,j as _,S as O,aP as b,aQ as L,b as w,aR as N,c as I}from"./index-DY4jrsxT.js";const R=C`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var d=function(u,e,t,i){var s=arguments.length,o=s<3?e:i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(u,e,t,i);else for(var r=u.length-1;r>=0;r--)(a=u[r])&&(o=(s<3?a(o):s>3?a(e,t,o):a(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o};const g="scroll-lock";let l=class extends k{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=n.state.open,this.caipAddress=h.state.activeCaipAddress,this.caipNetwork=h.state.activeCaipNetwork,this.isSiweEnabled=v.state.isSiweEnabled,this.shake=n.state.shake,this.initializeTheming(),S.prefetch(),this.unsubscribe.push(n.subscribeKey("open",e=>e?this.onOpen():this.onClose()),n.subscribeKey("shake",e=>this.shake=e),p.subscribeKey("siweStatus",e=>this.onSiweStatusChange(e),"eip155"),h.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),h.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),v.subscribeKey("isSiweEnabled",e=>this.isSiweEnabled=e)),E.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?A`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
              <w3m-alertbar></w3m-alertbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e=c.state.view==="ConnectingSiwe",t=c.state.view==="ApproveTransaction";if(this.isSiweEnabled){const{SIWEController:i}=await f(async()=>{const{SIWEController:o}=await import("./index-Cdw1Pm6b.js");return{SIWEController:o}},__vite__mapDeps([0,1,2]),import.meta.url);i.state.status!=="success"&&(e||t)?n.shake():n.close()}else n.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=N.state,i=x.getColorTheme(t);_(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),O.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=g,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${g}"]`);e&&e.remove()}onAddKeyboardListener(){var t;this.abortController=new AbortController;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("wui-card");e==null||e.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:s}=i.target;s&&!s.includes("W3M-")&&!s.includes("WUI-")&&(e==null||e.focus())}},this.abortController)}onRemoveKeyboardListener(){var e;(e=this.abortController)==null||e.abort(),this.abortController=void 0}onSiweStatusChange(e){e==="success"&&n.close()}async onNewAddress(e){var o;const t=this.caipAddress?b.getPlainAddress(this.caipAddress):void 0,i=e?b.getPlainAddress(e):void 0;if(i&&!(t===i)&&this.isSiweEnabled){const{SIWEController:a}=await f(async()=>{const{SIWEController:m}=await import("./index-Cdw1Pm6b.js");return{SIWEController:m}},__vite__mapDeps([0,1,2]),import.meta.url),r=p.state.siweStatus==="success";!t&&i?this.onSiweNavigation():r&&t&&i&&t!==i&&(o=a.state._client)!=null&&o.options.signOutOnAccountChange&&(await a.signOut(),this.onSiweNavigation())}i||n.close(),this.caipAddress=e}async onNewNetwork(e){var s,o,a,r;if(!this.caipAddress){this.caipNetwork=e,c.goBack();return}const t=(o=(s=this.caipNetwork)==null?void 0:s.id)==null?void 0:o.toString(),i=(a=e==null?void 0:e.id)==null?void 0:a.toString();if(t&&i&&t!==i)if(this.isSiweEnabled){const{SIWEController:m}=await f(async()=>{const{SIWEController:y}=await import("./index-Cdw1Pm6b.js");return{SIWEController:y}},__vite__mapDeps([0,1,2]),import.meta.url);(r=m.state._client)!=null&&r.options.signOutOnNetworkChange?(await m.signOut(),this.onSiweNavigation()):c.goBack()}else c.goBack();this.caipNetwork=e}onSiweNavigation(){const e=h.state.activeChain===L.CHAIN.EVM;!(p.state.siweStatus==="success")&&e?this.open?c.replace("ConnectingSiwe"):n.open({view:"ConnectingSiwe"}):c.goBack()}};l.styles=R;d([w()],l.prototype,"open",void 0);d([w()],l.prototype,"caipAddress",void 0);d([w()],l.prototype,"caipNetwork",void 0);d([w()],l.prototype,"isSiweEnabled",void 0);d([w()],l.prototype,"shake",void 0);l=d([I("w3m-modal")],l);export{l as W3mModal};
