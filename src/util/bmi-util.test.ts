import { calculateBmiInMetric } from './bmi-util';

describe('calculate BMI', () => {
    it(' should be false', () => {
        expect(calculateBmiInMetric(63, 168)).toBe(21);
    });
});
