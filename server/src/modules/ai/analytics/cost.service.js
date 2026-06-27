class CostService {
  calculate(
    promptTokens,
    completionTokens
  ) {
    return (
      promptTokens *
        0.0000015 +
      completionTokens *
        0.000002
    );
  }
}

export default new CostService();