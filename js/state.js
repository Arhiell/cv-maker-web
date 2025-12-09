(function(){
  const {$,splitLines}=window.CVUtils
  const STORAGE_KEY='cv-maker-state'
  let timer
  let state={
    template:'template-1',
    personal:{name:'',role:'',email:'',phone:'',location:'',website:'',photo:''},
    summary:'',
    experience:[],
    education:[],
    skills:{frontend:[],backend:[],tools:[],soft:[]},
    languages:[],
    certifications:[],
    projects:[],
    achievements:[],
    volunteer:[],
    courses:[]
  }
  function save(){clearTimeout(timer);timer=setTimeout(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch(e){}},200)}
  function load(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){state=JSON.parse(raw);return true}}catch(e){}return false}
  function readInitialFromForm(){
    state.personal.name=$('#name')?.value||'Nombre Apellido'
    state.personal.role=$('#role')?.value||'Título profesional'
    state.personal.email=$('#email')?.value||'email@ejemplo.com'
    state.personal.phone=$('#phone')?.value||'(+34) 600 000 000'
    state.personal.location=$('#location')?.value||'Ciudad, País'
    state.personal.website=$('#website')?.value||'linkedin.com/in/usuario'
    state.summary=$('#summary')?.value||''
    state.experience=[]
    state.education=[]
    state.skills={frontend:[],backend:[],tools:[],soft:[]}
    state.languages=[]
    state.certifications=splitLines($('#certifications')?.value)
    state.projects=splitLines($('#projects')?.value)
    state.achievements=splitLines($('#achievements')?.value)
    state.volunteer=splitLines($('#volunteer')?.value)
    state.courses=splitLines($('#courses')?.value)
  }
  function normalize(){
    if(Array.isArray(state.experience)&&state.experience.length&&typeof state.experience[0]==='string'){
      state.experience=state.experience.map(s=>({role:'',company:'',desc:s,start:'',end:''}))
    }
    if(Array.isArray(state.education)&&state.education.length&&typeof state.education[0]==='string'){
      state.education=state.education.map(s=>({title:'',institution:'',desc:s,start:'',end:''}))
    }
  }
  window.CVState={get state(){return state},set state(v){state=v},save,load,readInitialFromForm,normalize}
})();
