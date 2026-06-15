/** Scoped, self-injected styles. All colours come from CSS variables set by the
 *  component from `colors`, so the banner looks identical in any host project. */
export const CSS = `
.tc-root,.tc-fab{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box}
.tc-root *,.tc-fab *{box-sizing:border-box}
.tc-root{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;padding:0}
.tc-backdrop{position:absolute;inset:0;background:var(--tc-backdrop);backdrop-filter:blur(4px)}
.tc-card{position:relative;display:flex;flex-direction:column;width:100%;height:100dvh;overflow:hidden;background:var(--tc-surface);box-shadow:0 30px 80px -20px rgba(0,0,0,.7);opacity:0;transform:translateY(18px);transition:opacity .26s ease,transform .26s cubic-bezier(.22,1,.36,1)}
.tc-card:focus{outline:none}
.tc-card.tc-shown{opacity:1;transform:none}
.tc-head{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;padding:1.25rem 1.5rem 0}
.tc-tabs{display:flex;gap:1rem}
.tc-tab{position:relative;padding:0 0 1rem;font-size:13px;font-weight:600;color:var(--tc-text-muted);background:none;border:0;cursor:pointer;transition:color .15s}
.tc-tab:hover{color:var(--tc-text)}
.tc-tab.tc-active{color:var(--tc-text)}
.tc-tab.tc-active::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;border-radius:2px;background:var(--tc-brand)}
.tc-logo{flex-shrink:0;color:var(--tc-text);font-weight:700;font-size:15px}
.tc-hr{border:0;border-top:1px solid rgba(255,255,255,.07);margin:0}
.tc-body{flex:1;min-height:0;overflow-y:auto}
.tc-panel{padding:1.75rem 1.5rem}
.tc-h2{margin:0;font-size:1rem;font-weight:600;color:var(--tc-text)}
.tc-lead{margin:.5rem 0 0;font-size:13.5px;line-height:1.6;color:var(--tc-text-muted)}
.tc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem;margin-top:1.75rem}
.tc-cat{display:flex;flex-direction:column;align-items:center;text-align:center;border-radius:1rem;background:var(--tc-surface-alt);padding:1.25rem .75rem}
.tc-cat-name{margin:0;font-size:.875rem;font-weight:600;color:var(--tc-text)}
.tc-cat-desc{margin:.375rem 0 0;flex:1;font-size:11.5px;line-height:1.35;color:var(--tc-text-muted)}
.tc-switch{position:relative;display:inline-flex;align-items:center;margin-top:1rem;cursor:pointer}
.tc-switch input{position:absolute;width:1px;height:1px;opacity:0;margin:0}
.tc-track{width:2.75rem;height:1.5rem;border-radius:999px;background:rgba(255,255,255,.15);transition:background .2s}
.tc-thumb{position:absolute;left:2px;top:2px;width:1.25rem;height:1.25rem;border-radius:999px;background:var(--tc-text);transition:transform .2s}
.tc-switch input:checked~.tc-track{background:var(--tc-brand)}
.tc-switch input:checked~.tc-thumb{transform:translateX(1.25rem);background:var(--tc-on-brand)}
.tc-switch input:disabled{cursor:default}
.tc-switch input:focus-visible~.tc-track{outline:2px solid var(--tc-brand);outline-offset:2px}
.tc-acc{padding:1.25rem 0;border-top:1px solid rgba(255,255,255,.07)}
.tc-acc:first-child{border-top:0}
.tc-acc-head{display:flex;align-items:center;gap:.75rem}
.tc-acc-btn{display:flex;flex:1;align-items:center;gap:.625rem;text-align:left;background:none;border:0;color:var(--tc-text);cursor:pointer;font:inherit}
.tc-acc-name{font-size:.875rem;font-weight:600}
.tc-badge{display:grid;place-items:center;min-width:1.25rem;height:1.25rem;padding:0 .375rem;border-radius:999px;background:rgba(255,255,255,.1);font-size:10px;color:var(--tc-text-muted);font-family:ui-monospace,monospace}
.tc-chev{flex-shrink:0;color:var(--tc-text-muted);transition:transform .2s}
.tc-acc.tc-open .tc-chev{transform:rotate(180deg)}
.tc-acc-about{margin:.75rem 0 0;padding-left:1.625rem;font-size:13px;line-height:1.6;color:var(--tc-text-muted)}
.tc-acc-panel{padding-left:1.625rem;display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
.tc-acc.tc-open .tc-acc-panel{grid-template-rows:1fr}
.tc-acc-inner{overflow:hidden;min-height:0;display:flex;flex-direction:column;gap:.5rem}
.tc-acc.tc-open .tc-acc-inner{padding-top:.75rem}
.tc-cookie{border-radius:.75rem;background:rgba(255,255,255,.03);padding:.75rem}
.tc-cookie-name{margin:0;font-family:ui-monospace,monospace;font-size:12px;color:var(--tc-text)}
.tc-cookie-purpose{margin:.25rem 0 0;font-size:12px;color:var(--tc-text-muted)}
.tc-cookie-meta{margin:.25rem 0 0;font-family:ui-monospace,monospace;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--tc-text-muted)}
.tc-cookie-empty{font-size:12px;font-style:italic;color:var(--tc-text-muted)}
.tc-about p{margin:0 0 .75rem;font-size:13.5px;line-height:1.6;color:var(--tc-text-muted)}
.tc-link{color:var(--tc-brand);text-decoration:underline;text-underline-offset:2px}
.tc-actions{display:flex;flex-direction:column;gap:.625rem;padding:1.25rem 1.5rem}
.tc-btn{flex:1;padding:.8rem 1.25rem;border-radius:999px;font-size:.875rem;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,.14);background:transparent;color:var(--tc-text);transition:background .15s,border-color .15s}
.tc-btn:hover{background:rgba(255,255,255,.05)}
.tc-btn-primary{border-color:transparent;background:var(--tc-brand);color:var(--tc-on-brand)}
.tc-btn-primary:hover{background:var(--tc-brand-deep)}
.tc-fab{position:fixed;bottom:1.25rem;left:1.25rem;z-index:2147483600;display:grid;place-items:center;width:2.75rem;height:2.75rem;border-radius:999px;border:0;cursor:pointer;background:var(--tc-brand);color:var(--tc-text);box-shadow:0 12px 30px -8px rgba(0,0,0,.6);transition:background .15s}
.tc-fab:hover{background:var(--tc-brand-deep)}
@media (min-width:640px){
  .tc-root{padding:1rem}
  .tc-card{height:auto;max-height:92dvh;min-height:460px;max-width:48rem;box-shadow:0 30px 80px -20px rgba(0,0,0,.7);transform:translateY(10px) scale(.985)}
  .tc-card.tc-shown{transform:none}
  .tc-head{padding:1.5rem 2.75rem 0}
  .tc-tabs{gap:1.75rem}
  .tc-tab{font-size:14px}
  .tc-panel{padding:2.75rem}
  .tc-grid{grid-template-columns:repeat(4,1fr)}
  .tc-actions{flex-direction:row;padding:1.25rem 2.75rem}
}
@media (prefers-reduced-motion:reduce){
  .tc-card,.tc-acc-panel,.tc-chev,.tc-track,.tc-thumb{transition:none}
}
`;
