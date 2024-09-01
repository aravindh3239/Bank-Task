let task = document.getElementById("task");
let username = document.getElementById("userName");
let password = document.getElementById("password");
let button= document.querySelector(".login__btn");
let welcome=document.querySelector(".welcome");
let balance=document.querySelector(".balance__value")

let loanbtn=document.querySelector(".form__btn--loan")
let loanamt=document.querySelector(".form__input--loan-amount")
let reqAmount=document.querySelector(".form__label--loan")

let transfer=document.querySelector('.form__input--to')
let transferamnt=document.querySelector('.form__input--amount')
let transferbutton=document.querySelector('.form__btn--transfer')
let transferLabelamnt=document.querySelector('.fmamt')
let transferLabelaccount=document.querySelector('.form__label')
let movement=document.querySelector('.movements')

let account = {
  message: "logged succefully",
  user: "Aravi",
  pin: 111,
  movements:[]
};
let account2 = {
  message: "logged succefully",
  user: "Sami",
  pin: 222,
  movements:[]
};

let source = [account, account2];

button.addEventListener("click",function () {
  let i=0
  while (i<source.length) {
    if (source[i].user==username.value&&source[i].pin==password.value) {
      task.style.opacity=1;
      if (username.value=="Aravi") {
        welcome.innerHTML=`Welcome back, ${source[i].user}`
        balance.innerHTML=4000+"$"
      }
      else{
        welcome.innerHTML=`Welcome back, ${source[i].user}`
        balance.innerHTML=5000+"$"
      }
  
      return
    }
    i++;
  }
  console.log("error")
})


loanbtn.addEventListener('click',function(){

let i=0
while (i<source.length) {
  if (source[i].user==username.value) {
    let money=parseFloat(loanamt.value)
    let balAmnt=parseFloat(balance.textContent)
    if (money<1000) {
        let totalAmt=money+balAmnt
        balance.innerHTML=totalAmt+"$"
        let divbar=document.createElement("div")
        let typediv=document.createElement("div")
        let datediv=document.createElement("div")
        let amntdiv=document.createElement("div")

        typediv.innerHTML="deposit"
        datediv.innerHTML=new Date().toLocaleDateString()
        amntdiv.innerHTML=money+"€"
        
        divbar.classList.add("movements__row")
        typediv.classList.add("movements__type")
        typediv.classList.add("movements__type--deposit")
        datediv.classList.add("movements__date")
        amntdiv.classList.add("movements__value")
      divbar.appendChild(typediv)
      divbar.appendChild(datediv)
      divbar.appendChild(amntdiv)
      movement.appendChild(divbar)
    }
    else{
      reqAmount.innerHTML="Amount Request is only less than 1000"
    }
  }

  i++;
}
})

transferbutton.addEventListener('click',function(){

let i=0;
while (i<source.length) {
  if (source[i].user==transfer.value) {
    let trfamt=parseFloat(transferamnt.value)
    let balAmnt=parseFloat(balance.textContent)
    let totalAmt=balAmnt-trfamt
    if (totalAmt>=0) {
      balance.innerHTML=totalAmt+"$"


      let transferam=source[i].movements
      var storage=transferam.push(trfamt)
  
      let data =localStorage.setItem("storage",transferam,)
      let getData=localStorage.getItem(data)


      
   
      let divbar=document.createElement("div")
      let typediv=document.createElement("div")
      let datediv=document.createElement("div")
      let amntdiv=document.createElement("div")

      typediv.innerHTML="Withdrawl"
      datediv.innerHTML=new Date().toLocaleDateString()
      amntdiv.innerHTML=trfamt+"€"
     
        divbar.classList.add("movements__row")
        typediv.classList.add("movements__type")
        typediv.classList.add("movements__type--withdrawal")
        datediv.classList.add("movements__date")
        amntdiv.classList.add("movements__value")
      divbar.appendChild(typediv)
      divbar.appendChild(datediv)
      divbar.appendChild(amntdiv)
      movement.appendChild(divbar)
    
    }
    else{
      transferLabelamnt.innerHTML="insufficient balance"
    }
    return
  }
  i++;
}
// console.log("user not found");
})



function closefun() {
  let closeuser = document.querySelector(".form__input--user").value;
  let closepin = document.querySelector(".form__input--pin").value;

  let accountIndex = source.findIndex(acc => acc.user === closeuser && acc.pin === parseInt(closepin));

  if (accountIndex !== -1) {
    // Clear the login details section
    username.value = "";
    password.value = "";
    balance.innerHTML = "";
    window.location.reload();
    
    // Hide or reset the main task area if needed
    task.style.opacity = 0;
    
    console.log("Logged out successfully");
  } else {
    console.log("Error: User or PIN not found");
  }
}