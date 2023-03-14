const historyBox = document.getElementById("cal-history");
const outputBox = document.getElementById("cal-output");
const calButtons = document.querySelectorAll(".cal-btn");
const clrBtn = document.getElementById("clr-btn");
const themeBtn = document.getElementById("theme-btn");

let isDecimal = true
let theme="dark";

const themeChange= ()=>{
    if(theme==="light"){
        document.documentElement.style.setProperty('--primary-clr', '#f3f3f3');
        document.documentElement.style.setProperty('--secondary-clr', '#1979ff');
        document.documentElement.style.setProperty('--btn-clr', '#474747');
        document.documentElement.style.setProperty('--btn-clr-click', '#000');
        document.documentElement.style.setProperty('--box-shadow-dark', '#c5c5c5');
        document.documentElement.style.setProperty('--box-shadow-light', '#fff');
        document.documentElement.style.setProperty('--btn-shadow-dark', '#0245a2');
        document.documentElement.style.setProperty('--btn-shadow-light', '#8abbff');
        theme="dark";
        themeBtn.style.color="#000";
        themeBtn.title="Dark Mode";
    }
    else{
        document.documentElement.style.setProperty('--primary-clr', '#191919');
        document.documentElement.style.setProperty('--secondary-clr', '#f73737');
        document.documentElement.style.setProperty('--btn-clr', '#cccccc');
        document.documentElement.style.setProperty('--btn-clr-click', '#ffffff');
        document.documentElement.style.setProperty('--box-shadow-dark', '#000000');
        document.documentElement.style.setProperty('--box-shadow-light', '#212121');
        document.documentElement.style.setProperty('--btn-shadow-dark', '#540707');
        document.documentElement.style.setProperty('--btn-shadow-light', '#fa6868');
        theme="light";
        themeBtn.style.color="#fff";
        themeBtn.title="Light Mode";
    }
}

const BoxChange= ()=>{
    if(outputBox.value=="" || outputBox.value==" "){
        clrBtn.innerHTML="AC"
    }
    else{
        clrBtn.innerHTML="C"
    }
}
const decimalFunction = ()=>{
    let val = outputBox.value;
    let newVal=val[outputBox.value.length-1];
    let op=0;
    let p=val.lastIndexOf("+");
    let d=val.lastIndexOf("/");
    let s=val.lastIndexOf("-");
    let m=val.lastIndexOf("*");
    let per=val.lastIndexOf("%");
    let dec=val.lastIndexOf(".");
    if(p>s && p>d && p>m && p>per){
        op=p;
    }
    else if(s>p && s>d && s>m && s>per){
        op=s;
    }
    else if(d>s && d>p && d>m && d>per){
        op=d;
    }
    else if(m>s && m>d && m>p && m>per){
        op=m;
    }
    else if(per>s && per>d && per>m && per>p){
        op=per;
    }
    if(op>dec){
        isDecimal=true;
    }
    else{
        isDecimal=false;
    }
    // Print Decimal According to output
    if(isDecimal && (outputBox.value==="" || newVal==="/" || newVal==="*" || newVal==="+" || newVal==="-" || newVal==="%")){
        outputBox.value+="0."
    }
    else if(isDecimal){
        outputBox.value+="."
    }
}

const backFunction = ()=>{
    let newVal = outputBox.value
    let val=newVal[outputBox.value.length-1];
    newVal=newVal.slice(0,outputBox.value.length-1)
    outputBox.value=newVal;
}

calButtons.forEach(button => {
    button.addEventListener("click",()=>{
        let val = outputBox.value;
        let val2 = val[outputBox.value.length-2]
        val=val[outputBox.value.length-1];
        if(button.dataset['access']==="val" && button.innerHTML==="."){
            decimalFunction();
        }
        else if(button.dataset['access']==="val"){
            outputBox.value+=button.innerHTML;
        }
        else if(button.dataset['access']==="clear" && button.innerHTML==="C"){
            outputBox.value="";
            // isDecimal = true
        }
        else if(button.dataset['access']==="clear" && button.innerHTML==="AC"){
            outputBox.value="";
            historyBox.value="";
            // isDecimal = true
        }
        else if(button.dataset['access']==="divide-multiply" && outputBox.value!=""){
            // isDecimal=true;
            if((val2==="%" || val2==="*" || val2==="+" || val2==="-" || val2==="/") && (val==="%" || val==="*" || val==="+" || val==="-" || val==="/")){
                let newVal = outputBox.value
                newVal=newVal.slice(0,outputBox.value.length-2)
                newVal+=button.innerHTML;
                outputBox.value=newVal;
            }
            else if(val==="%" || val==="*" || val==="+" || val==="-" || val==="/"){
                let newVal = outputBox.value
                newVal=newVal.slice(0,outputBox.value.length-1)
                newVal+=button.innerHTML;
                outputBox.value=newVal;
            }else{
                outputBox.value+=button.innerHTML;
            }
        }
        else if(button.dataset['access']==="plus-minus" && outputBox.value!=""){
            // isDecimal=true;
            if(val==="+" || val==="-"){
                let newVal = outputBox.value
                newVal=newVal.slice(0,outputBox.value.length-1)
                newVal+=button.innerHTML;
                outputBox.value=newVal;
            }else{
                outputBox.value+=button.innerHTML;
            }
        }
        else if(button.dataset['access']==="back" && outputBox.value!=""){
            backFunction();
        }
        else if(button.dataset['access']==="eval"){
            try {
                if(eval(outputBox.value)===undefined){
                    historyBox.value=outputBox.value
                    outputBox.value="";
                }
                else{
                    historyBox.value=outputBox.value;
                    outputBox.value=eval(outputBox.value);
                }
            } catch (error) {
                historyBox.value=outputBox.value
                outputBox.value="ERROR";
            }
            
        }
        BoxChange();
    })
});
themeBtn.addEventListener("click", themeChange);
themeChange();