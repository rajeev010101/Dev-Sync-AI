class CalculatorTool {
  execute(expression) {
    return eval(expression);
  }
}

export default new CalculatorTool();