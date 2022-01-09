export const calculateBmiInMetric = (weightInKg: number, heightInCm: number): number => {
    return weightInKg / ((heightInCm / 100) ^ 2);
};
