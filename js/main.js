// Main JS: accessibility, menu, years and input masks (CPF, phone, CEP)
document.addEventListener('DOMContentLoaded', function(){
  // year
  var y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);
  document.getElementById('year2') && (document.getElementById('year2').textContent = y);
  document.getElementById('year3') && (document.getElementById('year3').textContent = y);

  // nav toggle
  var t = document.querySelector('.nav-toggle');
  var m = document.getElementById('menu');
  if(t && m){
    t.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      m.classList.toggle('show');
      m.setAttribute('aria-hidden', String(expanded));
    });
  }

  // form masks (simple, client-side)
  function setMask(input, maskFunc){ input.addEventListener('input', function(e){ var v = input.value; input.value = maskFunc(v); }); }

  function cpfMask(v){
    v = v.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    return v;
  }
  function phoneMask(v){
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length>10) v = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
    return v;
  }
  function cepMask(v){
    v = v.replace(/\D/g,'').slice(0,8);
    v = v.replace(/(\d{5})(\d{1,3})/,'$1-$2');
    return v;
  }

  var cpf = document.getElementById('cpf'), tel = document.getElementById('telefone'), cep = document.getElementById('cep');
  if(cpf) setMask(cpf, cpfMask);
  if(tel) setMask(tel, phoneMask);
  if(cep) setMask(cep, cepMask);

  // form validation UX enhancement
  var form = document.getElementById('form-cadastro');
  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
        return false;
      }
      e.preventDefault();
      alert('Cadastro enviado com sucesso — (simulação). Obrigado!');
      form.reset();
    });
  }
});
