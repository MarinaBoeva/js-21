'use strict';
var questions=['Вопрос 1','Вопрос 2','Вопрос 3'];
var answers=[['Вариант ответа 1','Вариант ответа 2','Правильный вариант ответа'],['Вариант ответа 1','Правильный вариант ответа','Вариант ответа 3'],['Правильный вариант ответа','Вариант ответа 2','Вариант ответа 3']];
var correctAnswers=[2,1,0];

var questions=JSON.stringify(questions);
var answers=JSON.stringify(answers);
var correctAnswers=JSON.stringify(correctAnswers);
localStorage.setItem('q',questions);
localStorage.setItem('a',answers);
localStorage.setItem('c',correctAnswers);

questions=JSON.parse(localStorage.getItem('q'));
answers=JSON.parse(localStorage.getItem('a'));
correctAnswers=JSON.parse(localStorage.getItem('c'));

var domGenerator={
generateForm: () => {
  const form= document.createElement('form');
  form.setAttribute('action','#');
  document.body.appendChild(form);
},
generateTitle:(html) => {
  const title = document.createElement('h1');
  title.className='title';
  title.innerHTML=html;
  document.body.appendChild(title);
},
generateQuestions: (questions) => {
  for(let i=0;i<questions.length;i++){
    const p= document.createElement('p');
    p.className='question';
    p.innerHTML=questions[i];
    document.querySelector('form').appendChild(p);
    const ul=document.createElement('ul');
    for(let j=0;j<answers[i].length;j++){
      const li=document.createElement('li');
      const input=document.createElement('input');
      const label=document.createElement('label');
      input.setAttribute('type','radio');
      var id;
      var name;
      if(i==0){
        id=j;
        name='question1';
      }else if (i==1) {
        id=j+3;
        name='question2';
      }else if(i==2){
        id=j+6;
        name='question3';
      }
      input.id=id;
      input.setAttribute('name',name);
      label.setAttribute('for',id);
      label.innerHTML=answers[i][j];
      label.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
      document.querySelector('form').appendChild(ul);
    }
  }
},
generateButton: (html) => {
  const button=document.createElement('button');
  button.setAttribute('type','submit');
  button.innerHTML=html;
  document.querySelector('form').appendChild(button);
  button.addEventListener('click', (event) => {
    event.preventDefault();
    for(let i=0;i<questions.length;i++){
      const list=document.querySelectorAll('ul')[i];
      const radio=list.querySelectorAll('input');
      const correct=radio[correctAnswers[i]];
      for(let j=0;j<radio.length;j++){
        radio[j].disabled=true;
        if(radio[j].checked==true){
          if(radio[j]==correct){
            radio[j].parentNode.className='correct';
          }
          else {
            radio[j].parentNode.className='incorrect';
          }
        }
      }
    }
    domGenerator.generateModal();
  });
},
generateModal:() => {
  var score=document.getElementsByClassName('correct').length;
  const div=document.createElement('div');
  div.className='modal';
  var text;
  if(score<questions.length){
   text="Поздравляем!Вы ответили правильно на "+score+ " вопросa.";
  }
  if(score==1){
   text="Вы ответили правильно на 1 вопрос."
  }
  if(score==0){
   text="К сожалению,Вы не ответили правильно ни на 1 вопрос.";
  }
  if(score==questions.length){
   text="Поздравляем!Вы ответили правильно на все вопросы.";
  }
  div.innerHTML='<p>'+text+'</p>';
  document.body.appendChild(div);
  const button2=document.createElement('button');
  button2.innerHTML="Попробовать снова";
  button2.addEventListener('click',() => {
    if(document.querySelector('div')){
      document.body.removeChild(div);
    }
    const labels=document.querySelectorAll('label');
      for(let h=0;h<document.querySelectorAll('label').length;h++){
        document.querySelectorAll('label')[h].removeAttribute('class');
        document.querySelectorAll('input')[h].checked=false;
        document.querySelectorAll('input')[h].disabled=false;
      }
  });
  div.appendChild(button2);
 }
};
domGenerator.generateTitle('Тест по программированию');
domGenerator.generateForm();
domGenerator.generateQuestions(questions);
domGenerator.generateButton('Проверить мои результаты');
