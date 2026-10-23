import React, {useEffect, useRef, useState} from 'react';

const modes = ['Resting','Closed','Music','Focus timer','Water','Shelf','To-do','Calendar','Quick actions'];
const captions = [
  'The familiar cross-eyed face, resting at the top of your desktop.',
  'The time, charging status and a little activity, in one compact notch.',
  'Album art, a seek bar and playback controls, just like your XenBar setup.',
  'A Pomodoro session, a short break, and a little room to focus.',
  'A little reminder to stay hydrated. Try adding a drink.',
  'A place for your current files. Add a sample to try the shelf.',
  'Make room for one small thing. Add a sample task and check it off.',
  'A quiet look at what is coming up next.',
  'Shortcuts for the little things you reach for. Try the focus timer or file shelf.',
];
const wallpapers = [['Pink','desktop-pink.png'],['Blue','desktop-blue.png'],['Wave','desktop-wave.png']];
const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
function Glyph({name,size=20}) {
  const paths={play:'m9 5 11 7-11 7z',pause:'M8 5v14M16 5v14',prev:'M5 5v14m14-14L7 12l12 7z',next:'M19 5v14M5 5l12 7-12 7z',left:'m15 6-6 6 6 6',right:'m9 6 6 6-6 6',reset:'M3 10a9 9 0 1 1 1 8M3 4v6h6',timer:'M10 2h4M12 6a8 8 0 1 1-8 8 8 8 0 0 1 8-8m0 3v5l-3 3',upload:'M12 3v13M7 8l5-5 5 5M4 16v5h16v-5',note:'M5 3h10l4 4v14H5zM14 3v5h5',camera:'M3 7h5l2-3h4l2 3h5v14H3zM15 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0',mute:'M3 9h4l5-5v16l-5-5H3zm13 0 5 6m0-6-5 6',audio:'M4 15v-3a8 8 0 0 1 16 0v3M4 13h4v8H4zm12 0h4v8h-4z',bubble:'M20 11a8 8 0 0 1-11 7l-6 3 2-6a8 8 0 1 1 15-4',bolt:'M13 3 7 13h5l-1 8 6-11h-5z'};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.note}/></svg>;
}
function Eyes(){return <span className="cross-eyes" aria-hidden="true"><i/><i/><b/></span>;}
export default function XenBarDemo({glass=true,rounded=true,compact=false}) {
  const [mode,setMode]=useState(0);
  const [wallpaper,setWallpaper]=useState(0);
  const [auto,setAuto]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [position,setPosition]=useState(52);
  const [seconds,setSeconds]=useState(1500);
  const [running,setRunning]=useState(false);
  const [breakTime,setBreakTime]=useState(false);
  const [water,setWater]=useState(0);
  const [bottle,setBottle]=useState(250);
  const [waterSettings,setWaterSettings]=useState(false);
  const [tasks,setTasks]=useState([]);
  const [shelf,setShelf]=useState(false);
  const [muted,setMuted]=useState(false);
  const [actionNotice,setActionNotice]=useState('');
  const [calendarOpen,setCalendarOpen]=useState(false);
  const [reduced,setReduced]=useState(false);
  const refs=useRef([]);
  useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setReduced(query.matches);if(query.matches)setAuto(false);};update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
  useEffect(()=>{if(!auto||reduced)return;const timer=setInterval(()=>setMode(value=>(value+1)%modes.length),6000);return()=>clearInterval(timer);},[auto,reduced]);
  useEffect(()=>{if(!running)return;const timer=setInterval(()=>setSeconds(value=>Math.max(value-1,0)),1000);return()=>clearInterval(timer);},[running]);
  useEffect(()=>{if(seconds===0)setRunning(false);},[seconds]);
  useEffect(()=>{if(!playing)return;const timer=setInterval(()=>setPosition(value=>value>=187?0:value+1),1000);return()=>clearInterval(timer);},[playing]);
  const choose=value=>{setMode(value);setAuto(false);setActionNotice('');};
  const time=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  const format=value=>`${Math.floor(value/60)}:${String(value%60).padStart(2,'0')}`;
  const expanded=mode>=2;
  const addTask=()=>{setAuto(false);setTasks(values=>values.length<3?[...values,{text:['Make room for one small thing','Take a little break','Make your desktop yours'][values.length],done:false}]:values);};
  const pages=[2,3,4,5,6,7,8];
  const action=(name)=>{setAuto(false);if(name==='Focus timer')choose(3);else if(name==='File shelf')choose(5);else if(name==='Mute / unmute'){setMuted(!muted);setActionNotice(muted?'Demo audio unmuted.':'Demo audio muted.');}else setActionNotice(`${name} is available in the Windows app. This is a website preview.`);};
  return <div id="showcase" className={`playground authentic-preview ${!auto?'motion-paused':''} ${reduced?'reduced-motion':''}`}>
    <div className={`preview-stage mode-${mode} ${glass?'glass-on':''} ${compact?'compact-on':''} ${rounded?'rounded-on':''}`} style={{'--desktop-image':`url("${asset(wallpapers[wallpaper][1])}")`}}>
      <div className="screen-brand"><span>XENBAR</span><small>YOUR SETUP, IN MOTION.</small></div>
      <div className={`actual-notch ${expanded?'expanded':''} ${mode===1?'clock-notch':''}`}>
        {mode===0&&<button className="actual-rest" aria-label="Open the compact notch" onClick={()=>choose(1)}><Eyes/></button>}
        {mode===1&&<button className="compact-notch-content" aria-label="Expand the music notch" onClick={()=>choose(2)}><span className="charging-mark"><Glyph name="bolt" size={13}/></span><strong>14:48</strong><span className="activity-dots">·····</span></button>}
        {expanded&&<>
          <div className="actual-status"><span className="charging-mark"><Glyph name="bolt" size={11}/></span><span>Fri 23 Oct 2026</span><strong>14:48</strong><span className={`activity-dots ${playing?'pulsing':''}`}>·····</span></div>
          <button className="notch-page-arrow previous" aria-label="Previous notch page" onClick={()=>choose(pages[(pages.indexOf(mode)+pages.length-1)%pages.length])}><Glyph name="left" size={13}/></button>
          <button className="notch-page-arrow next" aria-label="Next notch page" onClick={()=>choose(pages[(pages.indexOf(mode)+1)%pages.length])}><Glyph name="right" size={13}/></button>
          <div className="actual-notch-content" key={mode}>
            {mode===2&&<div className="actual-music"><div className="actual-album" role="img" aria-label="Album artwork from the supplied music screenshot" style={{backgroundImage:`url("${asset('notch-music.png')}")`}}/><div className="actual-track"><strong>circus</strong><small>Altare.alt</small></div><div className="actual-seek"><span>{format(position)}</span><input type="range" min="0" max="187" value={position} aria-label="Demo track position" onChange={event=>{setPosition(Number(event.target.value));setAuto(false);}}/><span>-{format(187-position)}</span></div><div className="actual-music-controls"><span className="lyrics-symbol" aria-hidden="true"><Glyph name="bubble" size={17}/></span><button aria-label="Restart demo track" onClick={()=>{setPosition(0);setAuto(false);}}><Glyph name="prev" size={22}/></button><button aria-label={playing?'Pause demo playback':'Play demo playback'} aria-pressed={playing} onClick={()=>{setPlaying(!playing);setAuto(false);}}><Glyph name={playing?'pause':'play'} size={22}/></button><button aria-label="Skip demo track to end" onClick={()=>{setPosition(187);setPlaying(false);setAuto(false);}}><Glyph name="next" size={22}/></button></div></div>}
            {mode===3&&<div className="actual-focus"><h4>Pomodoro</h4><div className="timer-ring"><Glyph name="timer" size={34}/></div><div className="actual-timer"><div><strong>{time}</strong><button aria-label="Reset focus timer" onClick={()=>{setSeconds(breakTime?300:1500);setRunning(false);setAuto(false);}}><Glyph name="reset" size={15}/></button></div><p>{running?'A little time, just for this.':seconds===0?'Session complete.':'Ready when you are.'}</p><div className="actual-timer-actions"><button onClick={()=>{setBreakTime(true);setSeconds(300);setRunning(false);setAuto(false);}}>Short Break</button><button className="start-focus" aria-label={running?'Pause focus session':'Start focus session'} onClick={()=>{if(seconds===0)setSeconds(breakTime?300:1500);setRunning(!running);setAuto(false);}}><Glyph name={running?'pause':'play'} size={15}/></button><button onClick={()=>{setBreakTime(false);setSeconds(1500);setRunning(false);setAuto(false);}}>Focus Time</button></div></div></div>}
            {mode===4&&<div className="actual-water"><h4>Water <em>Reminder</em></h4><div className="water-left"><strong>{(water/1000).toFixed(1)}<small>/1.5 L</small></strong><p>Today · {Math.round(water/1500*100)}% of goal</p><div className="water-actions"><button className="drink-button" onClick={()=>{setWater(value=>Math.min(value+bottle,1500));setAuto(false);}}>Drink</button><button onClick={()=>{setWaterSettings(!waterSettings);setAuto(false);}}>Settings</button><button aria-label="Reset water intake" onClick={()=>{setWater(0);setAuto(false);}}><Glyph name="reset" size={13}/></button></div></div><div className="water-chart">{waterSettings?<label>Drink size<select aria-label="Demo drink size" value={bottle} onChange={event=>setBottle(Number(event.target.value))}><option value="150">150 ml</option><option value="250">250 ml</option><option value="500">500 ml</option></select></label>:<div className="water-bars">{['S','S','M','T','W','T','F'].map((day,i)=><span key={i}><i style={{height:i===6?`${Math.max(2,water/1500*65)}px`:'2px'}}/><small>{day}</small></span>)}</div>}</div></div>}
            {mode===5&&<div className="actual-shelf"><h4>File <em>Shelf</em></h4><button className={`drop-sample ${shelf?'has-sample':''}`} onClick={()=>{setShelf(!shelf);setAuto(false);}}>{shelf?<><Glyph name="note" size={25}/><strong>Desktop ideas.txt</strong><small>Demo file added · click to clear</small></>:<><Glyph name="upload" size={27}/><strong>Drop or add files</strong><small>Try a sample. Originals stay where they are.</small></>}</button></div>}
            {mode===6&&<div className="actual-todo"><h4>Todo <em>List</em></h4><div className="todo-count"><strong>{tasks.filter(task=>task.done).length}<small>/{tasks.length}</small></strong><p>Tasks completed</p><div><button className="add-task" disabled={tasks.length>=3} onClick={addTask}>Add Task</button><button disabled={!tasks.length} onClick={()=>{setTasks([]);setAuto(false);}}>{tasks.length?'Clear Tasks':'Edit Task'}</button></div></div><div className="actual-task-list">{tasks.length?tasks.map((task,i)=><button role="checkbox" aria-checked={task.done} className={task.done?'checked':''} key={i} onClick={()=>{setTasks(values=>values.map((item,n)=>n===i?{...item,done:!item.done}:item));setAuto(false);}}><span>{task.done?'✓':''}</span>{task.text}</button>):<><p>No tasks yet.</p><p>Make room for one small thing.</p></>}</div></div>}
            {mode===7&&<div className="actual-calendar"><strong>{calendarOpen?'Your next little thing':'Coming up'}</strong><p>{calendarOpen?'No upcoming events in this demo.':'Your next task or local event will appear here.'}</p><button onClick={()=>{setCalendarOpen(!calendarOpen);setAuto(false);}}>{calendarOpen?'Back to overview':'Open calendar'}</button><div className="calendar-line"/></div>}
            {mode===8&&<div className="actual-actions">{[['Screenshot','camera'],['Mute / unmute',muted?'audio':'mute'],['Quick notes','note'],['Focus timer','timer'],['Audio output','audio'],['File shelf','note']].map(([label,icon])=><button key={label} onClick={()=>action(label)}><Glyph name={icon} size={17}/><span>{label}</span></button>)}</div>}
          </div>
          <div className="notch-pagination" aria-label="Notch pages">{pages.map(page=><button className={mode===page?'current':''} aria-label={`Show ${modes[page]} notch`} aria-pressed={mode===page} onClick={()=>choose(page)} key={page}/>)}</div>
        </>}
      </div>
      <div className="desktop-preview-copy"><span>XenBar<span>.</span></span><p>Your desktop. A little more you.</p></div>
      <div className="reference-dock" role="group" aria-label="Explore the XenBar glass dock" style={{backgroundImage:`url("${asset(wallpapers[wallpaper][1])}")`}}>
        {[[0,9,'Workspace'],[9,18,'Music'],[18,61,'Pinned apps'],[61,74,'System widgets'],[74,85,'Clock'],[85,100,'Quick actions']].map(([left,right,label])=><button className="dock-hotspot" style={{left:`${left}%`,width:`${right-left}%`}} aria-label={`Preview ${label}`} key={label} onClick={()=>choose({'Workspace':6,'Music':2,'Pinned apps':5,'System widgets':4,'Clock':1,'Quick actions':8}[label])}><span>{label}</span></button>)}
      </div>
      <span className="capture-label">ANIMATED WEBSITE PREVIEW · SAMPLE VALUES</span>
    </div>
    <div className="wallpaper-options" role="group" aria-label="Preview wallpaper"><span>YOUR BACKDROP</span>{wallpapers.map(([name],i)=><button aria-label={`${name} wallpaper`} aria-pressed={wallpaper===i} className={`wallpaper-dot wallpaper-${i}`} onClick={()=>{setWallpaper(i);setAuto(false);}} key={name}/>)}</div>
    <div className="preview-tabs" role="tablist" aria-label="Preview XenBar states">{modes.map((label,i)=><button role="tab" id={`preview-tab-${i}`} aria-selected={mode===i} aria-controls="preview-caption" tabIndex={mode===i?0:-1} ref={el=>refs.current[i]=el} key={label} onClick={()=>choose(i)} onKeyDown={event=>{let next;if(event.key==='ArrowRight')next=(i+1)%modes.length;if(event.key==='ArrowLeft')next=(i+modes.length-1)%modes.length;if(event.key==='Home')next=0;if(event.key==='End')next=modes.length-1;if(next!==undefined){event.preventDefault();choose(next);refs.current[next]?.focus();}}}>{label}</button>)}</div>
    <p className="preview-caption" id="preview-caption" role="tabpanel" aria-labelledby={`preview-tab-${mode}`}>{captions[mode]}</p>
    {actionNotice&&<p className="preview-notice" role="status">{actionNotice}</p>}
    <button className="autoplay-control" aria-pressed={auto} onClick={()=>setAuto(!auto)}>{auto?'Ⅱ Pause auto preview':'▷ Auto preview'}</button>
  </div>;
}
