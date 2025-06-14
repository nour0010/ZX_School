let bgImg2=document.getElementsByClassName('bgImg2')[0];
let bgImg3=document.getElementsByClassName('bgImg3')[0];
let bgImg4=document.getElementsByClassName('bgImg4')[0];
let bgImg5=document.getElementsByClassName('bgImg5')[0];
let r1=document.getElementsByClassName('r1')[0];
let s1=document.getElementsByClassName('s1')[0];
let r2=document.getElementsByClassName('r2')[0];
let s2=document.getElementsByClassName('s2')[0];
let r3=document.getElementsByClassName('r3')[0];
let s3=document.getElementsByClassName('s3')[0];
let box_of_contant=document.getElementsByClassName('box_of_contant')[0];
console.log(bgImg2);
console.log(bgImg3);
console.log(bgImg4);
onscroll=function(){
    let valueSC= scrollY;
    console.log(valueSC);
    bgImg2.style.transform=`translateY(-${valueSC}px)`
    bgImg3.style.transform=`translateY(-${valueSC/2}px)`
    bgImg4.style.transform=`translateY(-${valueSC/5}px)`
    bgImg5.style.transform=`translateY(-${valueSC/7}px)`
   box_of_contant.style.transform=`translateY(-${valueSC}px)`

   function Effect_bar(start,r,heightr,s){
   if(valueSC>start){
    r.style.height=`${heightr}vw`;
    s.style.height='10px'
    s.style.animation= 'ms1 0.5s ease-in-out 1.5s 1 forwards';
   }
}
Effect_bar(240,r1,29,s1);
Effect_bar(368,r2,24,s2);
Effect_bar(589,r3,34,s3);
}
