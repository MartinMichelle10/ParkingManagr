import { Car } from './car.entity';

describe('CarEntity', () => {
  it('should be defined', () => {
    expect(new Car()).toBeDefined();
  });
});
