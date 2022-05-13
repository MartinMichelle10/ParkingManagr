import { Employees } from './employees.entity';

describe('EmployeesEntity', () => {
  it('should be defined', () => {
    expect(new Employees()).toBeDefined();
  });
});
