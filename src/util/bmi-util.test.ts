import { calculateBmiInImperial, calculateBmiInMetric } from './bmi-util';

describe('calculate BMI', () => {
    it('my BMI should be 21 (metric)', () => {
        expect(calculateBmiInMetric(63, 168)).toBe(21);
    });

    it('my BMI should be 21 (imperial)', () => {
        expect(Math.round(calculateBmiInImperial(132, 66.2))).toBe(21);
    });
});
