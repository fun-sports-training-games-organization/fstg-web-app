export const calculateBmiInMetric = (weightInKg: number, heightInCm: number): number => {
    return weightInKg / ((heightInCm / 100) ^ 2);
};

export const calculateBmiInImperial = (weightInPounds: number, heightInInches: number): number => {
    return (weightInPounds * 703) / (heightInInches * heightInInches);
};
