import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import XenBarDemo from './XenBarDemo';
import './web.css';
import './xenbar-preview.css';

const config = window.XENBAR_CONFIG || {};
const version = config.version || '0.11.4';
const size = `${((config.sizeBytes || 116451536) / 1e6).toFixed(2)} MB`;
const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
function https(value) { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; } }
const downloadUrl = https(config.downloadUrl);
const features = [
  ['dock', 'Your everyday, docked.', 'Pin your favourite apps, see running windows and keep the tools you reach for together.'],
  ['music', 'Stay in your rhythm.', 'Album art, Windows media controls and a visualizer. Your soundtrack, without the window switching.'],
  ['focus', 'A little space to focus.', 'Bring your focus timer, tasks, quick notes and calendar into one personal workspace.'],
  ['shelf', 'Keep files close.', 'Give the files you are working with a temporary home in the notch’s file shelf.'],
  ['glass', 'Glass with your character.', 'Tune the blur, tint, corners and scale. Let your wallpaper set the mood.'],
  ['widgets', 'Only what you need.', 'Choose from 14 optional widgets, including system stats, photos and everyday essentials.'],
];
export function Icon({name, size=22}) {
  const paths = {download:'M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5',dock:'M3 8h18v12H3zM7 4v8m5-8v8m5-8v8',music:'M9 18V5l11-2v13M9 8l11-2M9 18c0 2-5 3-5 0s5-3 5 0m11-2c0 2-5 3-5 0s5-3 5 0',focus:'M12 8v5l3 2M9 2h6M12 2v3M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0',shelf:'M3 6h7l2 3h9v12H3zM8 15h8',glass:'m12 3 9 9-9 9-9-9zM3 12h18M12 3v18',widgets:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',arrow:'M5 12h14m-6-6 6 6-6 6',check:'m5 12 4 4L19 6'};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.glass}/></svg>;
}
export default function App() {
  const [shot, setShot] = useState(0);
  const tabs = useRef([]);
  useEffect(() => {
    const siteUrl = https(config.siteUrl);
    if (!siteUrl) return;
    const canonical = document.createElement('link'); canonical.rel='canonical'; canonical.href=siteUrl; document.head.append(canonical);
    const tags = [['og:title','XenBar — Your desktop, a little more alive.'],['og:url',siteUrl],['og:image',new URL('assets/xenbar-logo.png',siteUrl.endsWith('/')?siteUrl:`${siteUrl}/`).href]].map(([property,content])=>{const meta=document.createElement('meta');meta.setAttribute('property',property);meta.content=content;document.head.append(meta);return meta;});
    return () => {canonical.remove();tags.forEach(tag=>tag.remove());};
  }, []);
  const gallery = [
    {name:'Pink desktop',file:'desktop-pink.png'}, {name:'Blue desktop',file:'desktop-blue.png'},
    {name:'Wave desktop',file:'desktop-wave.png'}, {name:'Closed notch',file:'notch-closed.png'},
    {name:'Music',file:'notch-music.png'}, {name:'Focus',file:'notch-focus.png'},
    {name:'Water',file:'notch-water.png'}, {name:'File shelf',file:'notch-shelf.png'},
    {name:'To-do',file:'notch-todo.png'}, {name:'Calendar',file:'notch-calendar.png'},
    {name:'Quick actions',file:'notch-actions.png'}, {name:'Workspace',file:'workspace.png',caption:'Earlier workspace reference'}
  ];
  return <View style={{minHeight:'100vh',backgroundColor:'#050609'}}>
    <a className="skip" href="#main">Skip to content</a>
    <header className="site-header"><a className="brand" href="#main"><img src={asset('xenbar-logo.png')} alt=""/><span>XenBar</span></a><div className="header-notch" aria-hidden="true"><i/><i/></div><nav aria-label="Main navigation"><a href="#showcase">Preview</a><a href="#features">Features</a><a className="nav-download" href="#download">Get XenBar <span>↗</span></a></nav></header>
    <main id="main">
      <section className="hero wrap">
        <a className="availability" href="#download"><span/> A personal space for Windows</a>
        <h1>Your desktop,<br/>a little more alive.</h1>
        <p className="hero-copy">Your apps, music and little everyday things. XenBar brings them together in a personal dock and notch that feel right at home.</p>
        <div className="hero-actions"><a className="button primary" href="#download"><Icon name="download" size={19}/>Get XenBar for Windows</a><a className="button glow-button" href="#showcase">Explore the live preview <Icon name="arrow" size={18}/></a></div>
        <p className="release-line">Version {version} <span>·</span> Portable .exe <span>·</span> {size}</p>
        <XenBarDemo/>
      </section>
      <section className="section wrap" id="features"><div className="section-intro"><span className="eyebrow">SMALL DETAILS. EVERYDAY DIFFERENCE.</span><h2>Everything you reach for.<br/>One place to come back to.</h2><p>A dock at the bottom. A little personality at the top.<br className="desktop-break"/> Your desktop, working in your rhythm.</p></div><div className="feature-grid">{features.map(([icon,title,copy])=><article className="feature" key={icon}><div className="feature-icon"><Icon name={icon}/></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="quiet-section"><div className="wrap quiet-layout"><div className="quiet-illustration" aria-hidden="true"><div className="quiet-halo"/><div className="resting-notch"><i/><i/></div><span>A LITTLE COMPANY. A LITTLE CALM.</span></div><div><span className="eyebrow">THERE WHEN YOU NEED IT</span><h2>A little presence.<br/>More room for you.</h2><p>Keep your next move close, without filling your desktop. Smart hiding and optional widgets let you decide how much XenBar shows.</p><div className="quiet-facts"><div><Icon name="check" size={17}/><span>Your settings, saved locally</span></div><div><Icon name="check" size={17}/><span>Portable. No installer needed.</span></div><div><Icon name="check" size={17}/><span>Made for your Windows desktop</span></div></div></div></div></section>
      <section className="section gallery-section wrap" id="gallery"><div className="section-intro"><span className="eyebrow">FROM THE REAL APP</span><h2>A closer look at your next setup.</h2><p>The animated preview is a little introduction.<br/>Here is XenBar in an actual desktop setup.</p></div><div className="preview-tabs" role="tablist" aria-label="Product screenshots">{gallery.map((item,i)=><button key={item.name} ref={el=>tabs.current[i]=el} id={`shot-${i}`} role="tab" aria-selected={shot===i} aria-controls="gallery-panel" tabIndex={shot===i?0:-1} onClick={()=>setShot(i)} onKeyDown={event=>{let next;if(event.key==='ArrowRight')next=(i+1)%gallery.length;if(event.key==='ArrowLeft')next=(i+gallery.length-1)%gallery.length;if(event.key==='Home')next=0;if(event.key==='End')next=gallery.length-1;if(next!==undefined){event.preventDefault();setShot(next);tabs.current[next]?.focus();}}}>{item.name}</button>)}</div><div className="gallery-panel" role="tabpanel" id="gallery-panel" aria-labelledby={`shot-${shot}`}><img src={asset(gallery[shot].file)} alt={`XenBar ${gallery[shot].name} screenshot`}/></div><p className="small-note center">{gallery[shot].caption || `${gallery[shot].name} · Supplied XenBar capture, 23 October 2026`} · Captured values are illustrative.</p></section>
      <section className="download-section wrap" id="download"><div className="download-glow"/><img className="download-logo" src={asset('xenbar-logo.png')} alt="XenBar wolf logo"/><span className="eyebrow">MAKE A LITTLE MORE SPACE</span><h2>Bring your desktop to life.</h2><p>XenBar {version} for Windows.<br/>One portable executable. A setup that feels like yours.</p><a className="button primary" href={downloadUrl||'#download-status'}><Icon name="download" size={19}/>{downloadUrl?'Download XenBar':'View download status'}</a><p className="release-line">{size} <span>·</span> Portable .exe <span>·</span> Manual updates</p><p className="download-status" id="download-status" role="status">{downloadUrl?config.fileName||`XenBar-${version}-portable.exe`:'Public download coming soon. The release destination is being prepared.'}</p></section>
      <section className="section guide-section wrap" id="guide"><div className="section-intro"><h2>A few clicks from your own setup.</h2></div><div className="steps">{[['01','Keep it somewhere.','Once the public release is available, download the portable executable into a stable folder.'],['02','Open XenBar.','Close any older XenBar instance, then launch the executable. Node.js is not required.'],['03','Make it your own.','Open the workspace from the XenBar icon. Add apps and widgets, then explore Settings.']].map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="small-note install-note">The current portable build is unsigned and may show a Windows reputation prompt. Verify the source before running.</p></section>
      <section className="section faq-section wrap" id="faq"><div className="section-intro"><span className="eyebrow">A FEW THINGS TO KNOW</span><h2>The little questions.</h2></div>{[['Does it replace the Windows taskbar?','Taskbar replacement is optional. A recovery guard restores the taskbar when XenBar exits or crashes. There is also a Restore Windows Taskbar shortcut.'],['Which music players work?','Media controls depend on the player exposing its playback through the Windows media interface. Availability can vary by player and setup.'],['Does my data stay on my device?','Settings, tasks and notes are saved locally. Optional lyrics sends track metadata to LRCLIB when enabled. Codex usage reads account limits through your installed, signed-in Codex CLI.'],['How do updates work?','Updates are manual. Close the older XenBar instance before downloading and launching the next portable release.'],['What does the preview show?','The animated dock and notch are interactive illustrations, not a running copy of the Windows app. The gallery shows actual reference captures supplied for this website.'],['What is the current release?',`The verified local package is XenBar ${version}, a ${size} portable Electron executable. Public download hosting is being prepared.`]].map(([question,answer])=><details key={question} id={question==='What is the current release?'?'release':undefined}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    </main>
    <footer className="wrap"><a className="brand" href="#main"><img src={asset('xenbar-logo.png')} alt=""/>XenBar</a><span>© 2026 XenBar. A little more space.</span><div><a href="#faq">FAQ</a><a href={https(config.supportUrl)||'#faq'}>Help</a><a href="#download">Download</a></div><small>{https(config.siteUrl)?`XenBar · v${version}`:'Local preview · not yet published'}</small></footer>
  </View>;
}
