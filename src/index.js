function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let str = expr;
    let ind = str.indexOf(" ");
    while (ind > -1) {
        str = str.replace(" ", "");
        ind = str.indexOf(" ");
    }

    function find(str) {

        let regexp = /\((.*?)\)/;
        let matchstr = str.match(regexp);
        let l1 = matchstr[0].match(/\(/g);
        let l2 = matchstr[0].match(/\)/g);
        let rez;
        if (l1.length != l2.length) {

            rez = matchstr[0];
            for (let i = 0; i < l1.length - l2.length; i++) {
                rez = rez.replace("(", "");
            }
            rez = rez.match(regexp);

        } else {
            rez = matchstr;
        }
        rez[0] = rez[0].replace("(", "").replace(")", "");

        return rez[0];
    }

    function getresult(str) {
        let result;
        let arr = str.split("+");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(/\/-/g, "repl");
            arr[i] = arr[i].replace("*-", "umn");
            arr[i] = arr[i].split("-");

            for (let q = 0; q < arr[i].length; q++) {
                arr[i][q] = arr[i][q].replace(/repl/g, "/-");
                arr[i][q] = arr[i][q].replace("umn", "*-");
                arr[i][q] = arr[i][q].split("*");
                for (let r = 0; r < arr[i][q].length; r++) {
                    arr[i][q][r] = arr[i][q][r].split("/");
                    if (arr[i][q][r].length > 1) {
                        for (let w = 1; w < arr[i][q][r].length; w++) {

                            if (arr[i][q][r][w] == 0) {
                                throw new SyntaxError("TypeError: Division by zero.");
                            }
                        }
                        const reducer = (accumulator, currentValue) => accumulator / currentValue;

                        arr[i][q][r] = arr[i][q][r].reduce(reducer);
                        result = arr[i][q][r];
                    }
                };
                if (arr[i][q].length > 1) {
                    const reducer = (accumulator, currentValue) => accumulator * currentValue;
                    arr[i][q] = arr[i][q].reduce(reducer);
                    result = arr[i][q];
                }
            };
            if (arr[i].length > 1) {
                const reducer = (accumulator, currentValue) => accumulator - currentValue;
                arr[i] = arr[i].reduce(reducer);
                result = arr[i];
            }
        }
        if (arr.length > 1) {
            const reducer = (accumulator, currentValue) => +accumulator + +currentValue;
            arr = arr.reduce(reducer);
            result = arr;
        } else {}
        return result
    };

    if (str.match(/\(/g) || str.match(/\)/g)) {

        let l1 = str.match(/\(/g) || 0;
        let l2 = str.match(/\)/g) || 0;

        if (l1.length != l2.length) {
            throw new SyntaxError("ExpressionError: Brackets must be paired");
        } else {
            for (let z = 0; z < l2.length; z++) {
                let numINbrackets = find(str);
                let resultNumINbrackets = getresult(numINbrackets);
                str = str.replace("(" + numINbrackets + ")", resultNumINbrackets);
                str = str.replace("--", "+");
            }
        }
        let rez = getresult(str);
        return +rez.toFixed(4);
    } else {
        let rez = getresult(str);
        return +rez.toFixed(4);
    }
}

module.exports = {
	expressionCalculator
};

