import { Request, Router } from "express";
import { CalculatorRequestBody } from "../types";
import { validateCalculatorRequest } from "../middlewares";


export const router = Router();


router.get('/', (req:Request, res) =>   {
    res.send({
        message: 'Get all calculation', 
        timestamp: req.timestamp,
        data:[
            { id: 1, result: 1},
            { id: 2, result: 2},
        ],
    });
});



router.get('/:id',(req:Request, res) => {
    res.send({
        message: 'Get calculation by ID',
        timestamp: req.timestamp,
        id: req.params.id,
        result: 1,
    });
});

router.post('/', 
 validateCalculatorRequest,
 (req: Request<{},any,CalculatorRequestBody>, res) => {
  const {operator, operand1, operand2} = req.body;
  let result : number|string;
  switch (operator){
    case '+':
        result = operand1 + operand2;
        break;
    case '-':
        result = operand1 - operand2;
        break;
    case '*':
        result = operand1 * operand2;
        break;
    case '/':
        result = operand1 / operand2;
        break;
    default:
        result = 'Invalid operator';
        break;
  }
  res.send({
    message:'Create new calculation',
    timestamp: req.timestamp,
    result,
  });
})
