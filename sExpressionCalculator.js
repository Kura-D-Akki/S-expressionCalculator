const input = process.argv.pop();
const isExpression = (exp) => {
    return exp.includes("add") || exp.includes("multiply");
}
const identifyOperator = (exp) => {
    // For Extensibility, the following code can be converted to a switch-case/if-else ladder,
    // where in more operators can be added and identified.  
    return exp.includes("add") ? 'add' : exp.includes("multiply") ? 'multiply' : '';
}
const isExpressionClosing = (exp) => {
    return exp.includes(")");
}
const operatorStack = [];
const operandStack = [];
const calc = (input) => {
    const expression = input.split(" ");
    for (let ip of expression) {
        if (isExpression(ip)) {
            if (identifyOperator(ip) === 'add') {
                operatorStack.push('+');
            } else {
                operatorStack.push('*');
            }
            continue;
        }
        if (isExpressionClosing(ip)) {
            // The following statement is to extract number. Ex: '3))' in (add 1 add (2 3))
            const number = ip.match(/(\d+)/) ? ip.match(/(\d+)/)[0] : number;
            // The following statement is to extract number. Ex: '))' in (add 1 add (2 3))
            const closingBraces = ip.match(/(\)+)/) ? ip.match(/(\)+)/)[0] : closingBraces;

            if (Number.parseInt(number)) operandStack.push(parseInt(number));

            //Each time a closing bracket appears in the statement, the top most operators should be popped out and top most operation in operator stack should be executed.
            for (let i =0; i< closingBraces.length; i++) {
                let tempOperator = operatorStack.pop();
                let tempOperand = operandStack.pop();
                // For Extensibility, the following code can be changed to switch case and more operations can be added
                if (tempOperator==='+') {
                    operandStack.push(parseInt(tempOperand) + parseInt(operandStack.pop()));
                }
                if (tempOperator==='*') {
                    operandStack.push(parseInt(tempOperand) * parseInt(operandStack.pop()));
                }
                // extensibility code goes here as follows
                // if (tempOperator==='^') {
                //   call Math.exponent function 
                // }
            }
            continue;
        }
        if (!isExpression(ip)) {
            operandStack.push(parseInt(ip));
            continue;
        }
    }
    // Empty the stack as there are no more operations left.
    // At the end of the iteration, the stack will be containing only 1 item, which is final result
    console.log(operandStack.pop());
}
calc(input);