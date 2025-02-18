import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../user/user-model/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    // Inject the service and the HTTP testing controller
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should retrieve users via GET', () => {
    const dummyUsers: User[] = [
      { userID: 1, firstName: 'John', lastName: 'Doe', username: 'JohnDoe', active: true, password: 'test', userTypeID: 1, email: 'johndoe@test.com' },
      { userID: 2, firstName: 'Jane', lastName: 'Doe', username: 'JaneDoe', active: true, password: 'test', userTypeID: 1, email: 'janedoe@test.com' },
    ];

    // Call the method and expect a response
    service.getUsers(true).subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    // Expect a single request to the API URL
    const req = httpMock.expectOne('https://localhost:7283/api/User/all');

    console.log(req);

    // Check that the request method is GET
    expect(req.request.method).toBe('GET');

    // Respond with the mock data
    req.flush(dummyUsers);
  });
});
