'use strict';

describe('Service: messageService', function () {

  // load the service's module
  beforeEach(module('instantFeedApp'));

  // instantiate service
  var messageService;
  beforeEach(inject(function (_messageService_) {
    messageService = _messageService_;
  }));

  it('should do something', function () {
    expect(!!messageService).toBe(true);
  });

});
