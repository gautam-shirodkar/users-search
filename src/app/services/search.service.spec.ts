import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ResultModel } from "../components/results/result.model";
import { URL_CONFIG } from "../configs/configs";
import { HttpClient } from "@angular/common/http";

const mockUsers = {
  "total_count": 3,
  "incomplete_results": false,
  "items": [
    {
      "login": "Gautam",
      "id": 21823,
      "node_id": "MDQ6VXNlcjIxODIz",
      "avatar_url": "https://avatars.githubusercontent.com/u/21823?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Gautam",
      "html_url": "https://github.com/Gautam",
      "followers_url": "https://api.github.com/users/Gautam/followers",
      "following_url": "https://api.github.com/users/Gautam/following{/other_user}",
      "gists_url": "https://api.github.com/users/Gautam/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Gautam/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Gautam/subscriptions",
      "organizations_url": "https://api.github.com/users/Gautam/orgs",
      "repos_url": "https://api.github.com/users/Gautam/repos",
      "events_url": "https://api.github.com/users/Gautam/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Gautam/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1.0
    },
    {
      "login": "gautamkrishnar",
      "id": 8397274,
      "node_id": "MDQ6VXNlcjgzOTcyNzQ=",
      "avatar_url": "https://avatars.githubusercontent.com/u/8397274?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/gautamkrishnar",
      "html_url": "https://github.com/gautamkrishnar",
      "followers_url": "https://api.github.com/users/gautamkrishnar/followers",
      "following_url": "https://api.github.com/users/gautamkrishnar/following{/other_user}",
      "gists_url": "https://api.github.com/users/gautamkrishnar/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/gautamkrishnar/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/gautamkrishnar/subscriptions",
      "organizations_url": "https://api.github.com/users/gautamkrishnar/orgs",
      "repos_url": "https://api.github.com/users/gautamkrishnar/repos",
      "events_url": "https://api.github.com/users/gautamkrishnar/events{/privacy}",
      "received_events_url": "https://api.github.com/users/gautamkrishnar/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1.0
    },
    {
      "login": "GautamGupta",
      "id": 187822,
      "node_id": "MDQ6VXNlcjE4NzgyMg==",
      "avatar_url": "https://avatars.githubusercontent.com/u/187822?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/GautamGupta",
      "html_url": "https://github.com/GautamGupta",
      "followers_url": "https://api.github.com/users/GautamGupta/followers",
      "following_url": "https://api.github.com/users/GautamGupta/following{/other_user}",
      "gists_url": "https://api.github.com/users/GautamGupta/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/GautamGupta/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/GautamGupta/subscriptions",
      "organizations_url": "https://api.github.com/users/GautamGupta/orgs",
      "repos_url": "https://api.github.com/users/GautamGupta/repos",
      "events_url": "https://api.github.com/users/GautamGupta/events{/privacy}",
      "received_events_url": "https://api.github.com/users/GautamGupta/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1.0
    },
  ]
}

describe('SearchService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: SearchService;
  let expectedUsers: ResultModel[];
  let searchQuery: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SearchService);
    expectedUsers = [
      {avatar_url: 'https://avatars.githubusercontent.com/u/21823?v=4', login: 'Gautam', type: 'User'},
      {avatar_url: 'https://avatars.githubusercontent.com/u/8397274?v=4', login: 'gautamkrishnar', type: 'User'},
      {avatar_url: 'https://avatars.githubusercontent.com/u/187822?v=4', login: 'GautamGupta', type: 'User'},
    ] as ResultModel[];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected users', () => {
    searchQuery = 'gautam'
    service.search('gautam').subscribe({
      next: users => expect(users)
        .withContext('should return expected users')
        .toEqual((expectedUsers)),
      error: fail,
    });
    const req = httpTestingController.expectOne(URL_CONFIG.searchUrl + searchQuery);
    expect(req.request.method).toEqual('GET');

    req.flush(mockUsers);
  });

  it('should return 0 users for invalid search', () => {
    searchQuery = 's##$5dgd'
    service.search(searchQuery).subscribe({
      next: users => expect(users.length)
        .withContext('should have empty users array')
        .toEqual(0),
      error: fail
    });

    const req = httpTestingController.expectOne(URL_CONFIG.searchUrl + searchQuery);
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Not Found';
    searchQuery = 'random'
    service.search(searchQuery).subscribe({
      next: users => fail('expected to fail'),
      error: error => {
        console.log(error.message);
        console.log(msg);
        expect(error.message).toContain(msg)
      }
    });

    const req = httpTestingController.expectOne(URL_CONFIG.searchUrl + searchQuery);
    req.flush(msg, {status: 404, statusText: 'Not Found 404'});
  });
});
