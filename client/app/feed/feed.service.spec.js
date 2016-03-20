'use strict';

describe('Service: feed', function () {

  // load the service's module
  beforeEach(module('instantFeedApp'));

  // instantiate service
  var feed;
  beforeEach(inject(function (_Feed_) {
    feed = _Feed_;
  }));

  describe('sameTopicSideBySide', function() {

    it('all topics different', function () {
      var messages = [
        {belongsTo: 1},
        {belongsTo: 2},
        {belongsTo: 3}
      ];

      var result = feed.sameTopicSideBySide(messages);

      expect(result[0].lastSameTopic).not.toBe(true);
      expect(result[0].nextSameTopic).not.toBe(true);
      expect(result[1].lastSameTopic).not.toBe(true);
      expect(result[1].nextSameTopic).not.toBe(true);
      expect(result[2].lastSameTopic).not.toBe(true);
      expect(result[2].nextSameTopic).not.toBe(true);
    });

    it('start same topics', function () {
      var messages = [
        {belongsTo: 1},
        {belongsTo: 1},
        {belongsTo: 3}
      ];

      var result = feed.sameTopicSideBySide(messages);
      expect(result[0].lastSameTopic).not.toBe(true);
      expect(result[0].nextSameTopic).toBe(true);
      expect(result[1].lastSameTopic).toBe(true);
      expect(result[1].nextSameTopic).not.toBe(true);
      expect(result[2].lastSameTopic).not.toBe(true);
      expect(result[2].nextSameTopic).not.toBe(true);
    });

    it('end same topics', function () {
      var messages = [
        {belongsTo: 1},
        {belongsTo: 2},
        {belongsTo: 2}
      ];

      var result = feed.sameTopicSideBySide(messages);
      expect(result[0].lastSameTopic).not.toBe(true);
      expect(result[0].nextSameTopic).not.toBe(true);
      expect(result[1].lastSameTopic).not.toBe(true);
      expect(result[1].nextSameTopic).toBe(true);
      expect(result[2].lastSameTopic).toBe(true);
      expect(result[2].nextSameTopic).not.toBe(true);
    });

    it('all topics same', function () {
      var messages = [
        {belongsTo: 1},
        {belongsTo: 1},
        {belongsTo: 1}
      ];

      var result = feed.sameTopicSideBySide(messages);
      expect(result[0].lastSameTopic).not.toBe(true);
      expect(result[0].nextSameTopic).toBe(true);
      expect(result[1].lastSameTopic).toBe(true);
      expect(result[1].nextSameTopic).toBe(true);
      expect(result[2].lastSameTopic).toBe(true);
      expect(result[2].nextSameTopic).not.toBe(true);
    });

  });

});
