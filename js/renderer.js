(function(){
  const { $, text } = window.CVUtils
  function setText(sel,val){const n=$(sel);if(n)n.textContent=text(val)}
  function setList(sel,items){const list=$(sel);if(!list)return;list.innerHTML='';items.forEach(i=>{const li=document.createElement('li');li.textContent=i;list.appendChild(li)})}
  function setChips(sel,items){const box=$(sel);if(!box)return;box.innerHTML='';items.forEach(i=>{const c=document.createElement('span');c.className='chip';c.textContent=i;box.appendChild(c)})}
  function renderExperienceList(state){
    const ul=$('#pv-experience-list');if(!ul)return;ul.innerHTML=''
    state.experience.forEach(e=>{const li=document.createElement('li');const title=[e.role,e.company].filter(Boolean).join(' — ');const dates=(e.start||e.end)?` (${[e.start,e.end].filter(Boolean).join(' – ')})`:'';const t=document.createElement('div');t.className='item-title';t.textContent=title+dates;li.appendChild(t);if(e.desc){const p=document.createElement('div');p.textContent=e.desc;li.appendChild(p)};ul.appendChild(li)})
  }
  function renderEducationList(state){
    const ul=$('#pv-education-list');if(!ul)return;ul.innerHTML=''
    state.education.forEach(ed=>{const li=document.createElement('li');const title=[ed.title,ed.institution].filter(Boolean).join(' — ');const dates=(ed.start||ed.end)?` (${[ed.start,ed.end].filter(Boolean).join(' – ')})`:'';const t=document.createElement('div');t.className='item-title';t.textContent=title+dates;li.appendChild(t);if(ed.desc){const p=document.createElement('div');p.textContent=ed.desc;li.appendChild(p)};ul.appendChild(li)})
  }
  function render(state){
    setText('#pv-name',state.personal.name)
    setText('#pv-role',state.personal.role)
    setText('#pv-email',state.personal.email)
    setText('#pv-phone',state.personal.phone)
    setText('#pv-location',state.personal.location)
    setText('#pv-website',state.personal.website)
    setText('#pv-summary',state.summary)
    renderExperienceList(state)
    renderEducationList(state)
    setChips('#pv-languages',state.languages)
    setChips('#pv-skills-frontend',state.skills.frontend)
    setChips('#pv-skills-backend',state.skills.backend)
    setChips('#pv-skills-tools',state.skills.tools)
    setChips('#pv-skills-soft',state.skills.soft)
    setList('#pv-cert-list',state.certifications)
    setList('#pv-projects-list',state.projects)
    setList('#pv-achievements-list',state.achievements)
    setList('#pv-volunteer-list',state.volunteer)
    setList('#pv-courses-list',state.courses)
    const img=$('#pv-photo');if(img)img.src=state.personal.photo||''
    const cv=$('#cv');if(cv){cv.classList.toggle('template-2',state.template==='template-2');cv.classList.toggle('template-1',state.template!=='template-2')}
  }
  window.CVRenderer={render,setText,setList,setChips,renderExperienceList,renderEducationList}
})();
