(function(){
  const { sanitizeFileName } = window.CVUtils
  function exportPDF(){
    const el=document.getElementById('cv');const name=sanitizeFileName(window.CVState.state.personal.name)
    el.classList.add('exporting')
    html2canvas(el,{scale:2,useCORS:true,backgroundColor:'#ffffff'}).then(canvas=>{
      el.classList.remove('exporting')
      const imgData=canvas.toDataURL('image/png')
      const {jsPDF}=window.jspdf
      const pdf=new jsPDF({unit:'mm',format:'a4',orientation:'portrait'})
      const pageW=pdf.internal.pageSize.getWidth();const pageH=pdf.internal.pageSize.getHeight()
      const ratio=canvas.width/canvas.height;const margin=10;const w=pageW-2*margin;const h=w/ratio;const y=(pageH-h)/2
      pdf.addImage(imgData,'PNG',margin,Math.max(margin,y),w,h)
      pdf.save(name+'.pdf')
    })
  }
  function exportWord(){
    const name=sanitizeFileName(window.CVState.state.personal.name)
    const content=document.getElementById('cv').outerHTML
    const html='<!DOCTYPE html><html><head><meta charset="utf-8"><title>CV</title></head><body>'+content+'</body></html>'
    const blob=new Blob([html],{type:'application/msword'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a');a.href=url;a.download=name+'.doc';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},0)
  }
  window.CVExporter={exportPDF,exportWord}
})();
