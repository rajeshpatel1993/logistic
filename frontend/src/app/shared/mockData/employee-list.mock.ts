import { IEmployeeList } from '../interfaces/employee-list.interface';

function getEmployees() {
    let list = [];
    for (let i = 0; i < 100; i++) {
        list.push({
            employeeId: String(i),
            givenName: `givenName${i}`,
            surName: `surName${i}`,
            designation: `designation${i}`,
            workLocation: `WorkLocation${i}`,
            projectName: `projectName${i}`,
            dob: `22/3/1111`,
            phoneNumber: `111111111{i}`,
            photoUrl: `url`,
            mailId: `abc@mail.com`
        });
    }
    return list;
}

export const employeesList: IEmployeeList[] = getEmployees();;