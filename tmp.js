let i=0;

function ex(num1, num2, sign) {
    switch (sign) {
        case '*': return Number(num1) * Number(num2); break;
        case '/': return Number(num1) / Number(num2);break;
        case '+': return Number(num1) + Number(num2);break;
        case '-': return Number(num1) - Number(num2);break;
    }
}

function substr(str) {
    sub=str.split(/\+|\-|\*|\/|\(|\)/g);
    sub=sub.filter(item=>item!='');
    if (str[1]=='-') {
        sub[0]='-'+sub[0]; 
    }
    
    if (sub.length==1) return sub[0];
    sign=str.split(/\d{1,}/g);
    sign=sign.filter(item=>{
        return (item=='+'||item=='-'||item=='*'||item=='/')
    })
    console.log(str);
    console.log(sub);
    console.log(sign);
    prev=sign.findIndex(i=>i=='*'||i=='/');
    if (prev>=0) {
        repl=ex(sub[prev], sub[prev+1], sign[prev]);
        tmp=`${sub[prev]}${sign[prev]}${sub[prev+1]}`;  
        replSub=str.replace(tmp,repl);
        substr(replSub);
    }   else 
        {
            prev=sign.findIndex(i=>i=='+'||i=='-');
            repl=ex(sub[prev], sub[prev+1], sign[prev]);
            tmp=`${sub[prev]}${sign[prev]}${sub[prev+1]}`;  
            replSub=str.replace(tmp,repl);
            substr(replSub);
        }
    return sub[0];
}

let res=[];

function preSubstr(expr) {
    let arr=expr.split('');
    let left=[];
    let right=[];
    

    arr.forEach((item,index)=>{
        if (item=='(') left.push(index);
        if (item==')') right.push(index);
    })
    left.reverse();
    let sub;
    let sign;
    let subEl=[];
    if (left.length>0) {
        sub=expr.slice(left[0],right[0]+1);
        expr=expr.replace(sub,substr(sub));
        if (expr.includes('(')) preSubstr(expr)
        else {
            res[0]=expr;
            return res[0];
        }
    }
    return res[0];
}

function expressionCalculator(expr) {
    expr=expr.replace(/\s/g, '');
    let a = preSubstr(expr);
    let b = substr(res[0]);
    console.log(b);
    return b;
    
        
    
}

expressionCalculator(' 49 * 31* ( 20 - (83 + 63 / 46 * 29)  ) / 68  ');
